/**
 *Class for handling all login related functionalities
 */
class Authentication {
	constructor() {
		this.api_path = "../api/";
		this.clientKey = this.randomJSKey(32);
		this.serverKey = "";

		this.getKey();

		username.addEventListener("input", function() { this.removeElementHighlight(username); }.bind(this));
		password.addEventListener("input", function() { this.removeElementHighlight(password); }.bind(this));
		submit_btn.addEventListener("click", this.authenticateUser.bind(this));

		//If the site is opened on a mobile device, show a warning message
		if(screen.width < 800) {
			let message = "We recommend that you use a device with bigger screen such as computer for better usability.";
			alert(message);
		}
	}


	////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR HANDLING KEYS
	//
	////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to retrieve an access key from the server
	 */
	getKey() {
		let formData = new FormData();
		let path = this.api_path + "getKey.php";

		formData.append("JSKey", this.clientKey);

		this.makeXMLHttpRequest("POST", path, formData, this.onKeyReceived.bind(this));
	}

	/**
	 *Callback function to handle the server response from retrieve key request
	 *@param { JSON object } responseObj The object containing the key
	 */
	onKeyReceived(responseObj) {
		this.serverKey = responseObj.key;
	}


	////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR AUTHENTICATING USER
	//
	////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to authenticate a user
	 */
	authenticateUser() {
		event.preventDefault();
		message.textContent = null;

		let formData = new FormData();
		let path = this.api_path + "authenticateUser.php";

		formData.append("username", username.value);
		formData.append("password", password.value);
		formData.append("clientKey", this.clientKey);
		formData.append("serverKey", this.serverKey);

		this.makeXMLHttpRequest("POST", path, formData, this.onUserVerificationSuccess);
	}

	/**
	 *Function to handle process server response when user is verified
	 *@param { JSON object } responseObj The object containing the session and user info
	 */
	onUserVerificationSuccess(responseObj) {
		localStorage.setItem("accessKey", responseObj.sessionKey);
		localStorage.setItem("userId", responseObj.userId);
		localStorage.setItem("websiteURL", responseObj.websiteURL);
		window.location = "../";
	}



	////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR MAKING API CALLS
	//
	////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to make API requests
	 *@param { string } method Type of the request (Ex. POST / GET)
	 *@param { string } path The API path
	 *@param { FormData object } formData The FormData object containing the form data
	 *@param { function } successHandler The callback function to handle the succesful server response
	 */
	makeXMLHttpRequest(method, path, formData, successHandler) {
		let xhr = new XMLHttpRequest();

		xhr.open(method, path, true);
		xhr.send(formData);

		this.xhrRequestHandler(xhr, successHandler);
	}

	/**
	 *Function to handler the server response
	 *@param { XMLHttpRequest object } xhr The XMLHttpRequest object that made the request
	 *@param { function } successHandler The callback function to handle the successful reponse
	 */
	xhrRequestHandler(xhr, successHandler) {
		xhr.onload = function() {
			if(xhr.status >= 200 && xhr.status < 300) {
				if(xhr.response != "ERROR") {
					try {
						let responseObj = JSON.parse(xhr.response);
						successHandler(responseObj);
					}
					catch(err) {
						alert("Sorry! Something went wrong. PLease try again.");
					}
				}
				else {
					this.showError();
				}
			}
			else {
				this.showError();
			}
		}.bind(this);
	}
	

	/////////////////////////////////////////////////////////////////////////////
	//
	//UTILITY FUNCTIONS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to show error message
	 */
	showError() {
		message.textContent = "Invalid username or password. If you think you forgot your password, contact UW Impact team.";
		this.highlightElement(username);
		this.highlightElement(password);
	}

	/**
	 *Function to highlight an element
	 *@param { element object } element The element to be highlighted
	 */
	highlightElement(element) {
		if(!element.classList.contains("highlight")) {
			element.classList.add("highlight");
		}
	}

	/**
	 *Function to clear highligh from an element
	 *@param { element object } element The element that is highlighted
	 */
	removeElementHighlight(element) {
		if(element.classList.contains("highlight")) {
			element.classList.remove("highlight");
		}
		message.textContent = null;
	}

	/**
	 *Function to generate a random string
	 *@param { int } length The length of the string to be generated
	 */	
	randomJSKey(length) {
	    let result = "";
	    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    let charactersLength = characters.length;

	    for (let i = 0; i < length; i++ ) {
	        result += characters.charAt(Math.floor(Math.random() * charactersLength));
	    }
	    return result;
	}

}