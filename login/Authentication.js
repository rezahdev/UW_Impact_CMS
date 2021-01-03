/**
 *Class for handling all login related functionalities
 */
class Authentication 
{
	constructor() 
	{
		//Add eventListeners
		username.addEventListener("input", function() { this.removeElementHighlight(username); }.bind(this));
		password.addEventListener("input", function() { this.removeElementHighlight(password); }.bind(this));
		submit_btn.addEventListener("click", this.authenticateUser.bind(this));
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

		//Send request to server to verify the login credentials
		let xhr = new XMLHttpRequest();
		let formData = new FormData();

		formData.append("username", username.value);
		formData.append("password", password.value);
		formData.append("accessKey", "1234");

		//xhr.responseType = "json";
		xhr.open("POST", "http://localhost/uwimpact_cms_api/authenticateUser.php", true);
		xhr.send(formData);

		this.xhrRequestHandler(xhr);
	}

	xhrRequestHandler(xhr) 
	{
		xhr.onload = function()
		{
			if(xhr.status >= 200 && xhr.status < 300) 
			{
				if(xhr.response != "ERROR")
				{
					//User verified as authentic,
					//Set local storage variables for future reference,
					//Redirect user to the CMS homepage.
					let responseObj = JSON.parse(xhr.response);
					localStorage.setItem("accessKey", responseObj.sessionKey);
					localStorage.setItem("userId", responseObj.userId);
					localStorage.setItem("websiteURL", responseObj.websiteURL);
				    window.location = "../index.html";
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

	showError()
	{
		//Login credentials are wrong,
		//Show error message and highlight username and pasword fields
		message.textContent = "Invalid username or password. If you think you forgot your password, contact UW Impact team.";
		this.highlightElement(username);
		this.highlightElement(password);
	}

	/////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR MANIPULATING STYLE
	//
	/////////////////////////////////////////////////////////////////////////////

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

}