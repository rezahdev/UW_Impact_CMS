/**
 *JS Class to handle all functionalities of the CMS
 */
class Main {
	constructor() {
		this.api_path = "api/";
		this.isPopupFormOpen = false;
		this.openedPopupForm = null;

		this.displaySection("home", "Home");

		//Add EventListeners to the menu buttons
		home_btn.addEventListener("click", function() { this.displaySection("home", "Home"); }.bind(this));
		basic_info_btn.addEventListener("click", function() { this.displaySection("basic_info", "Basic Information"); }.bind(this));
		team_info_btn.addEventListener("click", function() { this.displaySection("team_info", "Team Information"); }.bind(this));
		events_info_btn.addEventListener("click", function() { this.displaySection("events_info", "Events Information"); }.bind(this));
		social_media_info_btn.addEventListener("click", function() { this.displaySection("social_media_info", "Social Media Links"); }.bind(this));
		messages_btn.addEventListener("click", function() { this.displaySection("message_container", "Messages"); }.bind(this));
		contact_us_btn.addEventListener("click", function() { this.displaySection("contact_us", "Contact Us"); }.bind(this));
		change_password_btn.addEventListener("click", function() { this.displaySection("change_password", "Change Password"); }.bind(this));
		logout_btn.addEventListener("click", this.logOut);

		//Add EventListeners to other buttons
		add_member_btn.addEventListener("click", function() { this.displayPopupForm(member_form); }.bind(this));
		add_event_btn.addEventListener("click", function() { this.displayPopupForm(event_form); }.bind(this));

		//Add EventListeners for form submissiona
		submit_group_logo.addEventListener("click", this.handleGroupLogoSubmission.bind(this));
		submit_group_name.addEventListener("click", this.handleGroupNameSubmission.bind(this));
		submit_group_initial.addEventListener("click", this.handleGroupInitialSubmission.bind(this));
		submit_description.addEventListener("click", this.handleDescriptionSubmission.bind(this));
		submit_mission_statement.addEventListener("click", this.handleMissionStatementSubmission.bind(this));
		submit_vision_statement.addEventListener("click", this.handleVisionStatementSubmission.bind(this));
		submit_why_join_us.addEventListener("click", this.handleWhyJoinUsSubmission.bind(this));
		submit_who_can_join.addEventListener("click", this.handleWhoCanJoinSubmission.bind(this));
		submit_how_to_join.addEventListener("click", this.handleHowToJoinSubmission.bind(this));
		submit_meeting_info.addEventListener("click", this.handleMeetingInfoSubmission.bind(this));
		submit_facebook_link.addEventListener("click", this.handleFacebookLinkSubmission.bind(this));
		submit_instagram_link.addEventListener("click", this.handleInstagramLinkSubmission.bind(this));
		submit_twitter_link.addEventListener("click", this.handleTwitterLinkSubmission.bind(this));
		submit_linkedin_link.addEventListener("click", this.handleLinkedinLinkSubmission.bind(this));
		submit_email_address.addEventListener("click", this.handleEmailAddressSubmission.bind(this));
		submit_new_password.addEventListener("click", this.handleNewPasswordSubmission.bind(this));

		//Add EventListeners to the popup form properties
		submit_member_info.addEventListener("click", this.handleMemberFormSubmission.bind(this));
		submit_event_info.addEventListener("click", this.handleEventFormSubmission.bind(this));
		delete_btn.addEventListener("click", this.handleDeleteFormSubmission.bind(this));
		close_member_form_btn.addEventListener("click", function() { this.closePopupForm(member_form); }.bind(this));
		close_event_form_btn.addEventListener("click", function() { this.closePopupForm(event_form); }.bind(this));
		close_delete_form_btn.addEventListener("click", function() { this.closePopupForm(delete_form); }.bind(this));
		close_notification_btn.addEventListener("click", function() { this.closePopupForm(notification_box); }.bind(this));

		this.loadBasicInfo();
		this.loadTeamInfo();
		this.loadEventsInfo();
		this.loadSocialMediaInfo();
		this.loadMessages();

		website_demo.src = localStorage.getItem("websiteURL");
	}

	/**
	 *Function to hide/display a particular section of the content
	 *@param { string } id - The id of the section to be displayed
	 *@param { string } title - Title of the section to be show
	 */
	displaySection(id, title) {
		if(this.isPopupFormOpen) {
			this.openedPopupForm.getElementsByTagName("button")[0].click();
			this.isPopupFormOpen = false;
			this.openedPopupForm = null;
		}

		//Show the selected section and hide other sections of the content_body
		let contentSections = content_body.getElementsByTagName("div");
		
		for (let div of contentSections) {			
			if(div.id == id)  {
				div.classList.remove("hidden");
				div.classList.add("visible");
			}
			else if(!div.classList.contains("member_info") && !div.classList.contains("event_box") && !div.classList.contains("message")) {
				div.classList.add("hidden");
			}
		}
		content_header.getElementsByTagName("h2")[0].textContent = title;

		let menuButtons = menu_buttons.getElementsByTagName("li");
		let currentButtonId = id + "_btn";

		for(let li of menuButtons) {
			if(li.id == currentButtonId) {
				li.classList.add("active");
			}
			else if(li.classList.contains("active")) {
				li.classList.remove("active");
			}
		} 
		window.scrollTo(0, 0);
	}

	/**
	 *Function to log out user
	 */
	logOut() {
		localStorage.clear();
		window.location = "login/";
	}



	//////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR RETRIVING GROUP DATA FROM DATABASE
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to retrieve basic infor from the DB
	 */
	loadBasicInfo() {
		let formData = new FormData();
		let path = this.api_path + "retrieveBasicInfo.php";

		this.makeXMLHttpRequest("POST", path, formData, this.plotBasicInfo);
	}

	/**
	 *Function to display the retrieved basic info 
	 *@param { JSON object } responseObj - The object containing the info
	 */
	plotBasicInfo(responseObj) {
		//Logo
		let logo = document.createElement("img");
		logo.src = responseObj.logoSrc;
		logo.id = "logo";
		logo_form.insertBefore(logo, logo_form.firstChild);

		//Other information
		group_name.value = responseObj.name;
		group_initial.value = responseObj.initial;
		description.value = responseObj.description;
		mission_statement.value = responseObj.missionStatement;
		vision_statement.value = responseObj.visionStatement;
		why_join_us.value = responseObj.whyJoinUs;
		who_can_join.value = responseObj.whoCanJoin;
		how_to_join.value = responseObj.howToJoin;
		meeting_info.value = responseObj.meetingInfo;
	}

	/**
	 *Function to retrieve team information from the DB
	 */
	loadTeamInfo() {
		let formData = new FormData();
		let path = this.api_path + "retrieveTeamInfo.php";

		this.makeXMLHttpRequest("POST", path, formData, this.plotTeamInfo.bind(this));
	}

	/**
	 *Function to fetch the retrieved team information
	 *@param { JSON object } responseObj - The object containing the info
	 */
	plotTeamInfo(responseObjArr)
	{
		for(let key of Object.keys(responseObjArr)) {
			this.addMemberToTeamInfo(responseObjArr[key]);
		}
	}

	/**
	 *Function to add a single member information to the interface
	 *@param { object } responseObj - The object containing the member info
	 */
	addMemberToTeamInfo(responseObj) {
		//New member_info div
		let memberDiv = document.createElement("div");
		memberDiv.id = "member_" + responseObj.id;
		memberDiv.classList.add("member_info");
		team_info.appendChild(memberDiv);

		//Team member image
		let img = document.createElement("img");
		img.src = responseObj.picture;
		img.classList.add("picture");
		memberDiv.appendChild(img);

		//Member name
		let nameP = document.createElement("p");
		let nameSpan = document.createElement("span");
		nameP.textContent = "Name: ";
		nameP.classList.add("font_bold");
		nameSpan.classList.add("name");
		nameSpan.classList.add("font_normal");
		nameSpan.textContent = responseObj.name;
		nameP.appendChild(nameSpan);
		memberDiv.appendChild(nameP);

		//Member designation 
		let desgP = document.createElement("p");
		let desgSpan = document.createElement("span");
		desgP.textContent = "Designation: ";
		desgP.classList.add("font_bold");
		desgSpan.classList.add("designation");
		desgSpan.classList.add("font_normal");
		desgSpan.textContent = responseObj.designation;
		desgP.appendChild(desgSpan);
		memberDiv.appendChild(desgP);

		//Edit button
		let editBtn = document.createElement("button");
		editBtn.classList.add("edit_member_btn");
		editBtn.textContent = "Edit";
		editBtn.addEventListener("click", function() { this.displayPopupForm(member_form, responseObj.id); }.bind(this));
		memberDiv.appendChild(editBtn);

		//Delete button
		let deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete_member_btn");
		deleteBtn.classList.add("delete_btn");
		deleteBtn.textContent = "Delete";
		deleteBtn.addEventListener("click", function() { this.displayPopupDeleteForm("member", responseObj.id); }.bind(this));
		memberDiv.appendChild(deleteBtn);
	}

	/**
	 *Function to retrieve events information from DB
	 */
	loadEventsInfo() {
		let formData = new FormData();
		let path = this.api_path + "retrieveEventsInfo.php";

		this.makeXMLHttpRequest("POST", path, formData, this.plotEventsInfo.bind(this));
	}

	/**
	 *Function to fetch the retrieved events information
	 *@param { JSON object } responseObj - The object containing the info
	 */
	plotEventsInfo(responseObjArr) {
		for(let key of Object.keys(responseObjArr)) {
			this.addEventToEventsInfo(responseObjArr[key]);
		}
	}

	/**
	 *Function to adda single event information to the interface
	 *@param { object } responseObj - The object containing the event info
	 */
	addEventToEventsInfo(responseObj) {
		//New member_info div 
		let eventDiv = document.createElement("div");
		eventDiv.id = "event_" + responseObj.id;
		eventDiv.classList.add("event_box");
		events_info.appendChild(eventDiv);

		//Event title
		let titleP = document.createElement("p");
		let titleSpan = document.createElement("span");
		titleP.textContent = "Title: ";
		titleP.classList.add("font_bold");
		titleSpan.classList.add("title");
		titleSpan.classList.add("font_normal");
		titleSpan.textContent = responseObj.title;
		titleP.appendChild(titleSpan);
		eventDiv.appendChild(titleP);

		//Event description
		let desP = document.createElement("p");
		let desSpan = document.createElement("span");
		desP.textContent = "Description: ";
		desP.classList.add("font_bold");
		desSpan.classList.add("description");
		desSpan.classList.add("font_normal");
		desSpan.textContent = responseObj.description;
		desP.appendChild(desSpan);
		eventDiv.appendChild(desP);

		//Event date
		let dateP = document.createElement("p");
		let dateSpan = document.createElement("span");
		dateP.textContent = "Date: ";
		dateP.classList.add("font_bold");
		dateSpan.classList.add("date");
		dateSpan.classList.add("font_normal");
		dateSpan.textContent = responseObj.date;
		dateP.appendChild(dateSpan);
		eventDiv.appendChild(dateP);

		//Event date
		let timeP = document.createElement("p");
		let timeSpan = document.createElement("span");
		timeP.textContent = "Time: ";
		timeP.classList.add("font_bold");
		timeSpan.classList.add("time");
		timeSpan.classList.add("font_normal");
		timeSpan.textContent = responseObj.time;
		timeP.appendChild(timeSpan);
		eventDiv.appendChild(timeP);

		//Registration Link
		let regLinkP = document.createElement("p");
		let regLink = document.createElement("a");
		regLinkP.textContent = "Registration Link: ";
		regLinkP.classList.add("font_bold");
		regLink.classList.add("reg_link");
		regLink.classList.add("font_normal");
		regLink.href = responseObj.registrationLink;
		regLink.target = "_blank";
		regLink.textContent = responseObj.registrationLink;
		regLinkP.appendChild(regLink);
		eventDiv.appendChild(regLinkP);

		//Edit button
		let editBtn = document.createElement("button");
		editBtn.classList.add("edit_event_btn");
		editBtn.textContent = "Edit";
		editBtn.addEventListener("click", function() { this.displayPopupForm(event_form, responseObj.id); }.bind(this));
		eventDiv.appendChild(editBtn);

		//Delete button
		let deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete_event_btn");
		deleteBtn.classList.add("delete_btn");
		deleteBtn.textContent = "Delete";
		deleteBtn.addEventListener("click", function() { this.displayPopupDeleteForm("event", responseObj.id); }.bind(this));
		eventDiv.appendChild(deleteBtn);
	}

	/**
	 *Function to retrieve social media information from DB
	 */
	loadSocialMediaInfo() {
		let formData = new FormData();
		let path = this.api_path + "retrieveSocialMediaInfo.php";

		this.makeXMLHttpRequest("POST", path, formData, this.plotSocialMediaInfo);
	}

	/**
	 *Function to display the retrieved social media information information
	 *@param { object } responseObj - The object containing the info
	 */
	plotSocialMediaInfo(responseObj) {
		facebook_link.value = responseObj.facebook;
		instagram_link.value = responseObj.instagram;
		twitter_link.value = responseObj.twitter;
		linkedin_link.value = responseObj.linkedin;
		email_address.value = responseObj.email;
	}

	/**
	 *Function to retrieve messages from the DB
	 */
	loadMessages() {
		let formData = new FormData();
		let path = this.api_path + "retrieveMessages.php";

		this.makeXMLHttpRequest("POST", path, formData, this.plotMessages.bind(this));
	}

	/**
	 *Function to display the retrieved messages
	 *@param { JSON object } responseObj - The object containing the messages
	 */
	plotMessages(responseObjArr) {
		for(let key of Object.keys(responseObjArr)) {
			let responseObj = responseObjArr[key];

			//Add a new div to message_container
			let messageDiv = document.createElement("div");
			messageDiv.id = "message_" + responseObj.id;
			messageDiv.classList.add("message");
			message_container.appendChild(messageDiv);

			//Add date-time, sender info and message to the new div
			let dateP = document.createElement("p");
			let nameP = document.createElement("p");
			let emailP = document.createElement("p");
			let messageP = document.createElement("p");
			dateP.textContent = "Date: " + responseObj.dateTime;
			nameP.textContent = "Sender Name: " + responseObj.name;
			emailP.textContent = "Sender Email: " + responseObj.email;
			messageP.textContent = "Message: " + responseObj.message;
			messageDiv.appendChild(dateP);
			messageDiv.appendChild(nameP);
			messageDiv.appendChild(emailP);
			messageDiv.appendChild(messageP);

			//Add a delete button
			let deleteBtn = document.createElement("button");
			deleteBtn.classList.add("delete_message_btn");
			deleteBtn.classList.add("delete_btn");
			deleteBtn.textContent = "Delete";
			deleteBtn.addEventListener("click", function() { this.displayPopupDeleteForm("message", responseObj.id); }.bind(this));
			messageDiv.appendChild(deleteBtn);
		}
	}


	//////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR HANDLING POPUP FORMS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to display a popup form
	 *@param { form object } form The form to be displayed 
	 *@param { int } content_id The Id of the member/event whose information will be loaded in the form 
	 */
	displayPopupForm(form, content_id = 0) {
		if(!this.isPopupFormOpen) {
			form.classList.remove("hidden");
			form.classList.add("visible");
			this.isPopupFormOpen = true;
			this.openedPopupForm = form;

			content_body.classList.add("blurry");

			//If the content_id is non-zero that means the form is opened in edit mode.
			//So, we have to pre-fill the input fields with the current information.
			if(content_id != 0 && form == member_form) {
				let member_info = document.getElementById("member_" + content_id);
				member_name.value = member_info.getElementsByClassName("name")[0].textContent;
				member_designation.value = member_info.getElementsByClassName("designation")[0].textContent;
				member_id.value = content_id;
				submit_member_info.value = "Update";
			}
			else if(content_id != 0 && form == event_form) {
				let event_info = document.getElementById("event_" + content_id);
				event_title.value = event_info.getElementsByClassName("title")[0].textContent;
				event_description.value = event_info.getElementsByClassName("description")[0].textContent;
				event_date.value = event_info.getElementsByClassName("date")[0].textContent;
				event_time.value = event_info.getElementsByClassName("time")[0].textContent;
				event_registration_link.value = event_info.getElementsByClassName("reg_link")[0].textContent;
				event_id.value = content_id;
				submit_event_info.value = "Update";
			}
			else if(form == member_form) {
				member_name.value = null;
				member_designation.value = null;
				member_id.value = 0;
				submit_member_info.value = "Save Member Information";
			}
			else if(form == event_form) {
				event_title.value = null;
				event_description.value = null;
				event_date.value = null;
				event_time.value = null;
				event_registration_link.value = null;
				event_id.value = 0;
				submit_event_info.value = "Save Event Information";
			}
		}
	}

	/**
	 *Function to display the popup form for showing warning before deleting an event or member
	 *@param { string } type The type of the content. Ex. member or event
	 *@param { int } id The id of the member or the event that is to be deleted
	 */
	displayPopupDeleteForm(type, id) {
		if(!this.isPopupFormOpen) {
			delete_form.classList.remove("hidden");
			delete_form.classList.add("visible");
			this.isPopupFormOpen = true;
			this.openedPopupForm = delete_form;

			delete_warning.textContent = `The selected ${ type } will be permanently deleted from our database. Are you sure you want to delete?`;
			delete_type.value = type;
			delete_id.value = id;

			content_body.classList.add("blurry");
		}
	}

	/**
	 *Function to display the popup notification box
	 *@param { string } message The notification to be shown
	 */
	showNotification(message) {
		if(notification_box.classList.contains("hidden")) {
			notification_box.classList.remove("hidden");
			notification_box.classList.add("visible");
			notification.textContent = message;
			
			this.isPopupFormOpen = true;
			this.openedPopupForm = notification_box;

			content_body.classList.add("blurry");
		}
	}

	/**
	 *Function to hide a popup form
	 *@param { event object } event The click event object
	 *@param { form object } form Id of the form to be hidden
	 */
	closePopupForm(form) {
		event.preventDefault();

		form.classList.remove("visible");
		form.classList.add("hidden");
		this.isPopupFormOpen = false;
		this.openedPopupForm = null;
		content_body.classList.remove("blurry");
	}


	//////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR HANDLING NORMAL FORMS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to handle the submission of the logo_form
	 */
	handleGroupLogoSubmission() {
		event.preventDefault();

		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";
		let files = group_logo.files;

		if(files.length > 0) {
			formData.append("field", "logo");
			formData.append("logo", files[0]);

			this.makeXMLHttpRequest("POST", path, formData, this.onLogoUploadSuccess.bind(this));
		}
		else {
			this.showNotification("Please choose an image!");
		}
	}

	/**
	 *Function to add the updated logo to the interface
	 *@param { JSON object } responseObj The object containing the img src for logo
	 */
	onLogoUploadSuccess(responseObj) {
		if(responseObj.logoSrc != null) {
			logo_form.getElementsByTagName("img")[0].remove();

			let logo = document.createElement("img");
			logo.src = responseObj.logoSrc;
			logo.id = "logo";
			logo_form.insertBefore(logo, logo_form.firstChild);

			this.showNotification("Successfully uploaded the new logo!");
		}
		else {
			this.showNotification(responseObj);
		}
	}

	/**
	 *Function to handle the submission of the group_name_form
	 */
	handleGroupNameSubmission() { 
		event.preventDefault();

		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "name");
		formData.append("value", group_name.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the group_initial_form
	 */
	handleGroupInitialSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "initial");
		formData.append("value", group_initial.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the description_form
	 */
	handleDescriptionSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "description");
		formData.append("value", description.value);

		this.makeXMLHttpRequest("POST", path, formData); 
	}

	/**
	 *Function to handle the submission of the mission_statement_form
	 */
	handleMissionStatementSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "missionStatement");
		formData.append("value", mission_statement.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the vision_statement_form
	 */
	handleVisionStatementSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "visionStatement");
		formData.append("value", vision_statement.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the why_join_us form
	 */
	handleWhyJoinUsSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "whyJoinUs");
		formData.append("value", why_join_us.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the who_can_join form
	 */
	handleWhoCanJoinSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "whoCanJoin");
		formData.append("value", who_can_join.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the how_to_join form
	 */
	handleHowToJoinSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "howToJoin");
		formData.append("value", how_to_join.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the meeting_info_form
	 */
	handleMeetingInfoSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateBasicInfo.php";

		formData.append("field", "meetingInfo");
		formData.append("value", meeting_info.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the facebook_link form
	 */
	handleFacebookLinkSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateSocialMediaInfo.php";

		formData.append("field", "facebook");
		formData.append("value", facebook_link.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the instagram_link form
	 */
	handleInstagramLinkSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateSocialMediaInfo.php";

		formData.append("field", "instagram");
		formData.append("value", instagram_link.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the twitter_link_form
	 */
	handleTwitterLinkSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateSocialMediaInfo.php";

		formData.append("field", "twitter");
		formData.append("value", twitter_link.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the linkedin_link form
	 */
	handleLinkedinLinkSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateSocialMediaInfo.php";

		formData.append("field", "linkedin");
		formData.append("value", linkedin_link.value);

		this.makeXMLHttpRequest("POST", path, formData);
	}

	/**
	 *Function to handle the submission of the email_address form
	 */
	handleEmailAddressSubmission() {
		event.preventDefault();
		
		if(this.isValidEmail(email_address.value)) {
			let formData = new FormData();
			let path = this.api_path + "updateSocialMediaInfo.php";

			formData.append("field", "email");
			formData.append("value", email_address.value);

			this.makeXMLHttpRequest("POST", path, formData);
		}
		else {
			this.showNotification("The email you entered is not valid.");
		}
	}

	/**
	 *Function to handle the submission of the change password form
	 */
	handleNewPasswordSubmission() {
		event.preventDefault();
		
		if(current_password.value.length < 0) {
			this.showNotification("Current password field cannot be empty!");
		}
		else if(new_password.value.length < 0) {
			this.showNotification("New password field cannot be empty!");
		}
		else if(confirm_password.value.length < 0) {
			this.showNotification("Confirm password field must be the same as new password!");
		}
		else if(new_password.value != confirm_password.value) {
			this.showNotification("Confirm password field must be the same as new password!");
		}
		else {
			let formData = new FormData();
			let path = this.api_path + "updatePassword.php";

			formData.append("currentPassword", current_password.value);
			formData.append("newPassword", new_password.value);

			this.makeXMLHttpRequest("POST", path, formData, this.onUpdatePasswordSuccess.bind(this));
		}
	}

	/**
	 *Function to logout the user 
	 *@param { JSON object } responseObj The object with the update password status info
	 */
	onUpdatePasswordSuccess(responseObj) {
		alert(responseObj.message);

		if(responseObj.isUpdateSuccessful == "1") {
			this.logOut();
		}
	}

	/**
	 *Function to handle the submission of the member_form
	 */
	handleMemberFormSubmission() {
		event.preventDefault();
		
		let files = member_picture.files;
		let formData = new FormData();
		let path = this.api_path + "updateTeamInfo.php";

		formData.append("name", member_name.value);
		formData.append("designation", member_designation.value);
		formData.append("memberId", member_id.value);

		if(files.length > 0) {
			formData.append("picture", files[0]);
		}

		if(member_id.value == 0) {
			formData.append("mode", "add");
			this.makeXMLHttpRequest("POST", path, formData, this.displayNewMember.bind(this));
		}
		else {
			formData.append("mode", "edit");
			this.makeXMLHttpRequest("POST", path, formData, this.displayUpdatedMemberInfo.bind(this));
		}
	}

	/**
	 *Function to display the new member info
	 *@param { JSON object } responseObj The object containing the member info
	 */
	displayNewMember(responseObj) {
		this.addMemberToTeamInfo(responseObj);
		this.closePopupForm(member_form);
		this.showNotification("Successfully added the new member!");
	}

	/**
	 *Function to display the updated member info
	 *@param { JSON object } responseObj The object containing the member info
	 */
	displayUpdatedMemberInfo(responseObj) {
		//The updated member_info div has a id that looks like "member_{ actual member id }".
		//We can select the updated member_info div in team_info using this member_{member id}.
		let memberInfo = document.getElementById("member_" + responseObj.id);
		memberInfo.getElementsByClassName("name")[0].textContent = responseObj.name;
		memberInfo.getElementsByClassName("designation")[0].textContent = responseObj.designation;

		//Remove previous picture
		memberInfo.getElementsByTagName("img")[0].remove();

		//Add the new picture
		let img = document.createElement("img");
		img.src = responseObj.picture;
		img.classList.add("picture");
		memberInfo.insertBefore(img, memberInfo.firstChild);	

		this.closePopupForm(member_form);
		this.showNotification("Successfully updated the member information!");
	}

	/**
	 *Function to handle event_form
	 */
	handleEventFormSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "updateEventInfo.php";

		formData.append("title", event_title.value);
		formData.append("description", event_description.value);
		formData.append("date", event_date.value);
		formData.append("time", event_time.value);
		formData.append("regLink", event_registration_link.value);
		formData.append("eventId", event_id.value);

		if(event_id.value == 0) {
			formData.append("mode", "add");
			this.makeXMLHttpRequest("POST", path, formData, this.displayNewEvent.bind(this));
		}
		else {
			formData.append("mode", "edit");
			this.makeXMLHttpRequest("POST", path, formData, this.displayUpdatedEventInfo.bind(this));
		}
	}

	/**
	 *Function to display the new event info
	 *@param { JSON object } responseObj The object containing the event info
	 */
	displayNewEvent(responseObj) {
		this.addEventToEventsInfo(responseObj);
		this.closePopupForm(event_form);
		this.showNotification("Successfully added the new event!");
	}

	/**
	 *Function to display the updated event info
	 *@param { JSON object } responseObj The object containing the event info
	 */
	displayUpdatedEventInfo(responseObj) {
		//The updated event_box div has a id that looks like "event_{ actual event id }".
		//We can select the updated event_box div in events_info using this event_{ event id }.
		let eventInfo = document.getElementById("event_" + responseObj.id);
		eventInfo.getElementsByClassName("title")[0].textContent = responseObj.title;
		eventInfo.getElementsByClassName("description")[0].textContent = responseObj.description;
		eventInfo.getElementsByClassName("date")[0].textContent = responseObj.date;
		eventInfo.getElementsByClassName("time")[0].textContent = responseObj.time;
		eventInfo.getElementsByClassName("reg_link")[0].textContent = responseObj.regLink;

		this.closePopupForm(event_form);
		this.showNotification("Successfully updated the event information!");
	}

	/**
	 *Function to handle the submission of the delete_form
	 */
	handleDeleteFormSubmission() {
		event.preventDefault();
		
		let formData = new FormData();
		let path = this.api_path + "delete.php";

		formData.append("type", delete_type.value);
		formData.append("id", delete_id.value);

		this.makeXMLHttpRequest("POST", path, formData, this.removeInfo.bind(this));
	}

	/**
	 *Function to remove member/event/message info after delete
	 *@param { JSON object } responseObj The object containing the info about the deleted info
	 */
	removeInfo(responseObj) {
		//We can find the deleted member or event by the id of the div that
		//looks like member_{ member id } or event_{ event id }
		if(responseObj.type == "member") {
			document.getElementById("member_" + responseObj.id).remove();
		}
		else if(responseObj.type == "event") {
			document.getElementById("event_" + responseObj.id).remove();
		}
		else {
			document.getElementById("message_" + responseObj.id).remove();
		}

		this.closePopupForm(delete_form);
		this.showNotification("Successfully deleted from the database!");
	}


	//////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR MAKING SERVER REQUESTS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to make XMLHttpRequest 
	 *@param { string } method Type of the request (Ex. POST/GET)
	 *@param { string } path API Path
	 *@param { FormData object } formData The object containing the form data
	 *@param { function } successHandler The callback method for handling API response
	 */
	makeXMLHttpRequest(method, path, formData, successHandler = false) {
		let xhr = new XMLHttpRequest();

		formData.append("userId", localStorage.getItem("userId"));
		formData.append("accessKey", localStorage.getItem("accessKey"));

		xhr.open(method, path, true);
		xhr.send(formData);

		this.xhrRequestHandler(xhr, successHandler);
	}

	/**
	 *Function to handle XMLHttpRequest response
	 *@param { XMLHttpsRequest Object } xhr The XMLHttpRequest object that made the request
	 *@param { function } successHadler The callback function to handle the API response
	 */
	xhrRequestHandler(xhr, successHandler) {
		xhr.onload = function() {
			if(xhr.status >= 200 && xhr.status < 300)  {
				if(xhr.response != "ERROR" && xhr.response != "INAVLID_REQUEST") {
					if(successHandler) {
						try  {
							let responseObj = JSON.parse(xhr.response);
							successHandler(responseObj);
						}	
						catch(err) {
							this.showError();
						}
					}	
					else {
						this.showNotification(xhr.response);
					}		    
				}
				else if(xhr.response == "INAVLID_REQUEST") {
					this.logOut();
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

	//////////////////////////////////////////////////////////////////////////////
	//
	//UTILITY FUNCTIONS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to show error message in an alert box
	 */
	showError() {
		alert("Sorry! Something went wrong. Please try again.");
	}


	/**
	 *Function to check if an email is valid
	 *@param { string } email The email address to be verified
	 *@return { boolean } true / false
	 */
	isValidEmail(email)  {
	    return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
	}

}