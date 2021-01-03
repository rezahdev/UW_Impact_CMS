/**
 *Class for handling all login related functionalities
 */
class Authentication 
{
	constructor(api_path) 
	{
		this.api_path = "../api/";
		this.clientKey = this.randomJSKey(32);
		this.serverKey = "";
		this.getKey();

		//Add eventListeners
		username.addEventListener("input", function() { this.removeElementHighlight(username); }.bind(this));
		password.addEventListener("input", function() { this.removeElementHighlight(password); }.bind(this));
		submit_btn.addEventListener("click", this.authenticateUser.bind(this));
	}

	////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR HANDLING KEYS
	//
	////////////////////////////////////////////////////////////////////////////

	getKey()
	{
		let formData = new FormData();
		let path = this.api_path + "getKey.php";

		formData.append("JSKey", this.clientKey);

		this.makeXMLHttpRequest("POST", path, formData, this.onKeyReceived.bind(this));
	}

	onKeyReceived(responseObj)
	{
		this.serverKey = responseObj.key;
	}

	////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR AUTHENTICATING USER
	//
	////////////////////////////////////////////////////////////////////////////

	authenticateUser(event) 
	{
		//Prevent default form submission
		event.preventDefault();
		
		//Remove any previous status
		message.textContent = null;

		let formData = new FormData();
		let path = this.api_path + "authenticateUser.php";

		formData.append("username", username.value);
		formData.append("password", password.value);
		formData.append("clientKey", this.clientKey);
		formData.append("serverKey", this.serverKey);

		//API request to verify login credentials
		this.makeXMLHttpRequest("POST", path, formData, this.onUserVerificationSuccess);
	}

	onUserVerificationSuccess(responseObj)
	{
		//User verified as authentic,
		//Set local storage variables for future reference,
		//Redirect user to the CMS homepage.
		localStorage.setItem("accessKey", responseObj.sessionKey);
		localStorage.setItem("userId", responseObj.userId);
		localStorage.setItem("websiteURL", responseObj.websiteURL);
		window.location = "../index.html";
	}

	////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR MAKING API CALLS
	//
	////////////////////////////////////////////////////////////////////////////

	makeXMLHttpRequest(method, path, formData, successHandler, callType = true)
	{
		let xhr = new XMLHttpRequest();

		xhr.open(method, path, callType);
		xhr.send(formData);

		this.xhrRequestHandler(xhr, successHandler);
	}

	xhrRequestHandler(xhr, successHandler) 
	{
		xhr.onload = function()
		{
			if(xhr.status >= 200 && xhr.status < 300) 
			{
				if(xhr.response != "ERROR")
				{
					let responseObj = JSON.parse(xhr.response);
					successHandler(responseObj);
				}
				else
				{
					this.showError();
				}
			}
			else //if the remote server sent an error
			{
				this.showError();
			}
		}.bind(this);
	}

	/////////////////////////////////////////////////////////////////////////////
	//
	//UTILITY FUNCTIONS
	//
	/////////////////////////////////////////////////////////////////////////////

	showError()
	{
		//Login credentials are wrong,
		//Show error message and highlight username and pasword fields
		message.textContent = "Invalid username or password. If you think you forgot your password, contact UW Impact team.";
		this.highlightElement(username);
		this.highlightElement(password);
	}

	highlightElement(element)
	{
		if(!element.classList.contains("highlight"))
		{
			element.classList.add("highlight");
		}
	}

	removeElementHighlight(element)
	{
		if(element.classList.contains("highlight"))
		{
			element.classList.remove("highlight");
		}

		//Remove any previous status
		message.textContent = null;
	}

	randomJSKey(length) 
	{
	    let result = "";
	    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    let charactersLength = characters.length;

	    for (let i = 0; i < length; i++ ) 
	    {
	        result += characters.charAt(Math.floor(Math.random() * charactersLength));
	    }

	    return result;
	}

}