/**
 *JS Class to handle all functionalities of the CMS
 */
class Main 
{

	constructor() 
	{
		this.isPopupFormOpen = false;
		this.openedPopupForm = null;

		//Show the home section and hide other sections of the content_body
		this.displaySection("home", "Home");

		//Add EventListeners to the menu buttons
		home_btn.addEventListener("click", function() { this.displaySection("home", "Home"); }.bind(this));
		basic_info_btn.addEventListener("click", function() { this.displaySection("basic_info", "Basic Information"); }.bind(this));
		team_info_btn.addEventListener("click", function() { this.displaySection("team_info", "Team Information"); }.bind(this));
		events_info_btn.addEventListener("click", function() { this.displaySection("events_info", "Events Information"); }.bind(this));
		social_media_info_btn.addEventListener("click", function() { this.displaySection("social_media_info", "Social Media Links"); }.bind(this));
		messages_btn.addEventListener("click", function() { this.displaySection("messages", "Messages"); }.bind(this));
		contact_us_btn.addEventListener("click", function() { this.displaySection("contact_us", "Contact Us"); }.bind(this));
		change_password_btn.addEventListener("click", function() { this.displaySection("change_password", "Change Password"); }.bind(this));

		//Add EventListeners to the add_member_btn and add_event_btn
		add_member_btn.addEventListener("click", function() { this.displayPopupForm(member_form); }.bind(this));
		add_event_btn.addEventListener("click", function() { this.displayPopupForm(event_form); }.bind(this));


		let memberInfoDivs = team_info.getElementsByClassName("member_info");
		let eventInfoDivs = events_info.getElementsByClassName("event_box");

		//Add EventListeners to all edit_member_btn and delete_member_btn
		for(let member_info of memberInfoDivs)
		{
			let editBtn = member_info.getElementsByClassName("edit_member_btn")[0];
			let deleteBtn = member_info.getElementsByClassName("delete_member_btn")[0];
			let member_id = member_info.id.split("_")[1];
			editBtn.addEventListener("click", function() { this.displayPopupForm(member_form, member_id); }.bind(this));
			deleteBtn.addEventListener("click", function() { this.displayPopupDeleteForm("member", member_id); }.bind(this));
		}

		//Add EventListeners to all edit_event_btn and delete_event_btn
		for(let event_info of eventInfoDivs)
		{
			let editBtn = event_info.getElementsByClassName("edit_event_btn")[0];
			let deleteBtn = event_info.getElementsByClassName("delete_event_btn")[0];
			let event_id = event_info.id.split("_")[1];
			editBtn.addEventListener("click", function() { this.displayPopupForm(event_form, event_id); }.bind(this));
			deleteBtn.addEventListener("click", function() { this.displayPopupDeleteForm("event", event_id); }.bind(this));
		}

		//Add EventListener to the delete button in the delete_form
		delete_btn.addEventListener("click", this.handleDeleteFormSubmission);

		//Add EventListener to close buttons in all popup forms
		close_member_form_btn.addEventListener("click", function() { this.closePopupForm(event, member_form); }.bind(this));
		close_event_form_btn.addEventListener("click", function() { this.closePopupForm(event, event_form); }.bind(this));
		close_delete_form_btn.addEventListener("click", function() { this.closePopupForm(event, delete_form); }.bind(this));
	}


	//////////////////////////////////////////////////////////////////////////////
	//
	//EVENT HANDLER FUNCTIONS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to hide/display a particular section of the content
	 *@param { string } id - The id of the section to be displayed
	 *@param { string } title - Title of the section to be show
	 */
	displaySection(id, title)
	{
		//If there's any popup form open, close the popup form before changing section
		if(this.isPopupFormOpen)
		{
			this.openedPopupForm.getElementsByTagName("button")[0].click();
			this.isPopupFormOpen = false;
			this.openedPopupForm = null;
		}

		//Show the selected section and hide other sections of the content_body
		let contentSections = content_body.getElementsByTagName("div");
		
		for (let div of contentSections) 
		{			
			if(div.id == id) 
			{
				div.classList.remove("hidden");
				div.classList.add("visible");
			}
			else if(!div.classList.contains("member_info") && !div.classList.contains("event_box"))
			{

				div.classList.add("hidden");
			}
		}

		//Display the title of selected menu in the content header
		content_header.getElementsByTagName("h2")[0].textContent = title;

		//Mark the currently selected menu in menu bar and remove mark from previous menu button
		let menuButtons = menu_buttons.getElementsByTagName("li");
		let currentButtonId = id + "_btn";

		for(let li of menuButtons)
		{
			if(li.id == currentButtonId)
			{
				li.classList.add("active");
			}
			else if(li.classList.contains("active"))
			{
				li.classList.remove("active");
			}
		} 
	}



	//////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR HANDLING POPUP FORMS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to display a popup form
	 *@param { form object } form - Id of the form to be displayed
	 */
	displayPopupForm(form, content_id = 0)
	{
		//If the content_body is blurry, that means another popup form is already open
		if(!this.isPopupFormOpen)
		{
			form.classList.remove("hidden");
			form.classList.add("visible");
			this.isPopupFormOpen = true;
			this.openedPopupForm = form;

			//Make the content_body blurry
			content_body.classList.add("blurry");

			//If the content_id is non-zero that means the form is opened in edit mode.
			//So, we have to pre-fill the input feilds with the current information.
			if(content_id != 0 && form == member_form)
			{
				let member_info = document.getElementById("member_" + content_id);
				member_name.value = member_info.getElementsByClassName("name")[0].textContent;
				member_designation.value = member_info.getElementsByClassName("designation")[0].textContent;
				member_id.value = content_id;
				submit_member_info.value = "Update";
			}
			else if(content_id != 0 && form == event_form)
			{
				let event_info = document.getElementById("event_" + content_id);
				event_title.value = event_info.getElementsByClassName("title")[0].textContent;
				event_description.value = event_info.getElementsByClassName("description")[0].textContent;
				event_date.value = event_info.getElementsByClassName("date")[0].textContent;
				event_time.value = event_info.getElementsByClassName("time")[0].textContent;
				event_registration_link.value = event_info.getElementsByClassName("reg_link")[0].textContent;
				event_id.value = content_id;
				submit_event_info.value = "Update";
			}
			else if(form == member_form)
			{
				//Clear any previous value
				member_name.value = null;
				member_designation.value = null;
				member_id.value = content_id;
				submit_member_info.value = "Save Member Information";
			}
			else if(form == event_form)
			{
				//clear any previous value
				event_title.value = null;
				event_description.value = null;
				event_date.value = null;
				event_time.value = null;
				event_registration_link.value = null;
				event_id.value = content_id;
				submit_event_info.value = "Save Event Information";
			}
		}
	}

	/**
	 *Function to display the popup form for showing warning message before deleting an event or member
	 *@param { string } type - The type of the content. Ex. member or event
	 *@param { int } id - The id of the member or the event that is to be deleted
	 */
	displayPopupDeleteForm(type, id)
	{
		//If content_body is blurred, that means another popup form is already open
		if(!this.isPopupFormOpen)
		{
			//Display the delete form
			delete_form.classList.remove("hidden");
			delete_form.classList.add("visible");
			this.isPopupFormOpen = true;
			this.openedPopupForm = delete_form;

			//Fill the warning label and hidden filled with proper info
			if(type == "member")
			{
				delete_warning.textContent = "The selected member will be permanently deleted from our database. Are you sure you want to delete?";
				delete_type.value = "member";
				delete_id.value = id;
			}
			else if(type == "event")
			{
				delete_warning.textContent = "The selected event will be permanently deleted from our database. Are you sure you want to delete?";
				delete_type.value = "event";
				delete_id.value = id;
			}

			//Make the content_body blurry
			content_body.classList.add("blurry");
		}
	}

	/**
	 *Function to hide a popup form
	 *@param { event object } event - The click event object
	 *@param { form object } form - Id of the form to be hidden
	 */
	closePopupForm(event, form)
	{
		//Prevent any form submission due to the click of cancel button
		event.preventDefault();

		//Hide the form
		form.classList.remove("visible");
		form.classList.add("hidden");
		this.isPopupFormOpen = false;
		this.openedPopupForm = null;

		//Clear out the background blurryness
		content_body.classList.remove("blurry");
	}



	//////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR HANDLING FORM SUBMISSION
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *EventHandler function to handle the submission of the delete_form
	 *@param { event object } event The button click event object.
	 */
	handleDeleteFormSubmission(event)
	{
		//Function not complete
	}
	
}