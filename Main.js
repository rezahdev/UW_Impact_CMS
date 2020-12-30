/**
 *JS Class to handle all functionalities of the CMS
 */
class Main 
{

	constructor() 
	{
		//Show the home section and hide other sections of the content_body
		this.displaySection("home", "Home");

		//Home button
		home_btn.addEventListener("click", function() { 

			this.displaySection("home", "Home"); 

		}.bind(this));


		//Basic info button
		basic_info_btn.addEventListener("click", function() { 

			this.displaySection("basic_info", "Basic Information"); 

		}.bind(this));


		//Team info button
		team_info_btn.addEventListener("click", function() { 

			this.displaySection("team_info", "Team Information"); 

		}.bind(this));


		//Events info button
		events_info_btn.addEventListener("click", function() { 

			this.displaySection("events_info", "Events Information"); 

		}.bind(this));

		//Social media info button
		social_media_info_btn.addEventListener("click", function() { 

			this.displaySection("social_media_info", "Social Media Links"); 

		}.bind(this));

		//Messages button
		messages_btn.addEventListener("click", function() { 

			this.displaySection("messages", "Messages"); 

		}.bind(this));

		//Contact us button
		contact_us_btn.addEventListener("click", function() { 

			this.displaySection("contact_us", "Contact Us"); 

		}.bind(this));

		//Change password button
		change_password_btn.addEventListener("click", function() { 

			this.displaySection("change_password", "Change Password"); 

		}.bind(this));

		//Update picture buttons
		let updatePicBtns = team_info.getElementsByClassName("update_picture_btn");

		for(let btn of updatePicBtns)
		{
			btn.addEventListener("click", function() { 

				this.displayPopupForm(change_picture_form); 

			}.bind(this));
		}


		//Close change picture button
		close_change_picture_form.addEventListener("click", function() { 

			this.closePopupForm(event, change_picture_form); 

		}.bind(this));


		//Edit member info button
		let memberInfoBtns = team_info.getElementsByClassName("edit_member_info_btn");

		for(let btn of memberInfoBtns)
		{
			btn.addEventListener("click", function() { 

				this.displayPopupForm(edit_member_info_form); 

			}.bind(this));
		}


		//Close edit member form button
		close_edit_member_info_form.addEventListener("click", function() { 

			this.closePopupForm(event, edit_member_info_form); 

		}.bind(this));
	}


	//////////////////////////////////////////////////////////////////////////////
	//
	//EVENT HANDLER FUNCTIONS
	//
	/////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to hide/display a particular section of the content
	 *@param { string } id - The id of the section to be displayed
	 @param { string } title - Title of the section to be show
	 */
	displaySection(id, title)
	{
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
	displayPopupForm(form)
	{
		//Display the form
		if(form.classList.contains("hidden"))
		{
			form.classList.remove("hidden");
			form.classList.add("visible");
		}

		//Blurr out the background
		if(!content_body.classList.contains("blurry"))
		{
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
		if(form.classList.contains("visible"))
		{
			form.classList.remove("visible");
			form.classList.add("hidden");
		}

		//Clear the background blurryness
		if(content_body.classList.contains("blurry"))
		{
			content_body.classList.remove("blurry");
		}
	}
	
}