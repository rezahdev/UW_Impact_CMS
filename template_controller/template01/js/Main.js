/**
 *Class to handle all functionalities of UW Impact Template
 */
class Main 
{
	/**
	 *Constructor
	 *@param { string } site The name initial of the site to be loaded (Ex. uwimpact)
	 */
	constructor(site)
	{
		//Initialize this variables
		this.api_path = "../../api/";
		this.site = site;
		this.key = "6FpPlLAt22WScXb7u33cCrobfTldv1A6";

		//set the height of the header as the top-margin of the next div 'mobile-view-menu',
		//so that, the div begins right after the header without any overlapping.
		mobile_view_menu.style.marginTop = (header.clientHeight + 10) + "px";
		mobile_view_menu.style.display = "none";

		//Add EventListeners
		window.addEventListener("resize", function() { this.changeTopMarginOfBanner(); }.bind(this));
		window.addEventListener("scroll", function() { this.changeHeaderOnScroll(); }.bind(this));
		mobile_view_menu_button.addEventListener("click", function() { this.openMobileMenu(); }.bind(this));
		submit_message_button.addEventListener("click", function() { this.handleContactFormSubmission(); }.bind(this));
		
		//Add eventLisetners to the mobile_view_menu buttons
		let mobileMenuBtns = mobile_view_menu.getElementsByTagName("a");

		for(let btn of mobileMenuBtns)
		{
			btn.addEventListener("click", function() { mobile_view_menu_button.click(); }.bind(this));
		}

		//Retrieve information from the DB
		this.loadBasicInfo();
		this.loadTeamInfo();
		this.loadEventsInfo();
	}


	/////////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR STYLE MANIPULATION
	//
	////////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to change top margin of banner on page resizing
	 */
	changeTopMarginOfBanner()
	{
		banner.style.marginTop = ( header.clientHeight + "px" );
	}


	/**
	 *Function to change header style on page scrolling
	 */
	changeHeaderOnScroll()
	{
		let menuButtons = header.getElementsByTagName("button");

		if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
		{
			if(!header.classList.contains("blue_background"))
			{
				header.classList.add("blue_background");

				for(let btn of menuButtons)
				{
					btn.style.backgroundColor = "#34495E";
					btn.getElementsByTagName("a")[0].style.color = "#ffffff";	
				}
			}
		}
		else
		{
			if(header.classList.contains("blue_background"))
			{
				header.classList.remove("blue_background");

				for(let btn of menuButtons)
				{
					btn.style.backgroundColor = "#ffffff";
					btn.getElementsByTagName("a")[0].style.color = "#000000";	
				}
			}
		}
	}


	/**
	 *Function to open the mobile menu
	 */
	openMobileMenu()
	{
		//Prevent default page load due to link click
		event.preventDefault();

		if(mobile_view_menu.style.display == "none")
		{
			window.scrollTo(0, 0);

			mobile_view_menu.style.display = "block";
		}
		else
		{
			mobile_view_menu.style.display = "none";
		}
	}



	//////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR RETRIEVING DATA FROM DATABASE
	//
	//////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to retrieve the basic info from the DB
	 */
	loadBasicInfo()
	{
		let path = this.api_path + "getTemplateBasicInfo.php";

		this.makeXMLHttpRequest("POST", path, this.plotBasicInfo);
	}


	/**
	 *Function to display the basic info after retrieving from the DB
	 *@param { JSON Object } responseObj The object containing the basic info
	 */
	plotBasicInfo(responseObj)
	{
		site_title.textContent = responseObj.initial;

		if(responseObj.logoSrc.length > 0)
		{
			//Add the logo
			let img = document.createElement("img");
			img.src = responseObj.logoSrc;
			banner.insertBefore(img, banner.firstChild);
		}

		//Add other info
		group_initial.textContent = responseObj.initial;
		group_name.textContent = responseObj.name;
		description.textContent = responseObj.description;
		mission_statement.getElementsByTagName("p")[0].textContent = responseObj.missionStatement;
		vision_statement.getElementsByTagName("p")[0].textContent = responseObj.visionStatement;
		why_join_us.getElementsByTagName("p")[0].textContent = responseObj.whyJoinUs;
		who_can_join.getElementsByTagName("p")[0].textContent = responseObj.whoCanJoin;
		how_to_join.getElementsByTagName("p")[0].textContent = responseObj.howToJoin;
		meeting_info.textContent = responseObj.meetingInfo;

		if(responseObj.facebook.length > 0)
		{
			let socialImg = document.createElement("img");
			socialImg.src = "images/icons/facebook.png";
			facebook.appendChild(socialImg);
			facebook.href = responseObj.facebook;
		}
		if(responseObj.instagram.length > 0)
		{
			let socialImg = document.createElement("img");
			socialImg.src = "images/icons/instagram.png";
			instagram.appendChild(socialImg);
			instagram.href = responseObj.instagram;
		}
	    if(responseObj.twitter.length > 0)
		{
			let socialImg = document.createElement("img");
			socialImg.src = "images/icons/twitter.png";
			twitter.appendChild(socialImg);
			twitter.href = twitter.facebook;
		}
		if(responseObj.linkedin.length > 0)
		{
			let socialImg = document.createElement("img");
			socialImg.src = "images/icons/linkedin.png";
			linkedin.appendChild(socialImg);
			linkedin.href = responseObj.linkedin;
		}
		if(responseObj.email.length > 0)
		{
			let socialImg = document.createElement("img");
			socialImg.src = "images/icons/gmail.png";
			email.appendChild(socialImg);
			email.href = "mailto: " + responseObj.email;
		}
	}


	/**
	 *Function to retrieve the team info from the DB
	 */
	loadTeamInfo()
	{
		let path = this.api_path + "getTemplateTeamInfo.php";

		this.makeXMLHttpRequest("POST", path, this.plotTeamInfo);
	}


	/**
	 *Function to display the team info after retrieving from the DB
	 *@param { JSON Object } responseObjArr The object containing the team info
	 */
	plotTeamInfo(responseObjArr)
	{
		if(Object.keys(responseObjArr).length > 0)
		{
			//If there's at least one team member info
			//Show the title of the team section
			team_section_title.textContent = "Meet Our Team";
		}

		for(let key in Object.keys(responseObjArr))
		{
			let responseObj = responseObjArr[key];

			//Create anew div
			let memberDiv = document.createElement("div");
			memberDiv.classList.add("member");

			//Add member picture
			let img = document.createElement("img");
			img.src = responseObj.picture;
			memberDiv.appendChild(img);

			//Add other info
			let infoDiv = document.createElement("div");
			let nameP = document.createElement("p");
			let desP = document.createElement("p");
			nameP.textContent = responseObj.name;
			desP.textContent = responseObj.designation;
			infoDiv.appendChild(nameP);
			infoDiv.appendChild(desP);
			memberDiv.appendChild(infoDiv);

			//Add member to the team_info div
			team_info.appendChild(memberDiv);
		}
	}


	/**
	 *Function to retrieve the event info from the DB
	 */
	loadEventsInfo()
	{
		let path = this.api_path + "getTemplateEventsInfo.php";

		this.makeXMLHttpRequest("POST", path, this.plotEventsInfo);
	}


	/**
	 *Function to display the event info after retrieving from the DB
	 *@param { JSON Object } responseObjArr The object containing the event info
	 */
	plotEventsInfo(responseObjArr)
	{
		if(Object.keys(responseObjArr).length > 0)
		{
			//If there's at least one event info
			//Show the title of the event section
			event_section_title.textContent = "Recent And Upcoming Events";
		}

		for(let key in Object.keys(responseObjArr))
		{
			let responseObj = responseObjArr[key];

			//Create anew div
			let eventDiv = document.createElement("div");
			eventDiv.classList.add("box");

			//Add the info to the new div
			let titleP = document.createElement("h3");		
			let desP = document.createElement("p");
			let dateP = document.createElement("p");
			titleP.textContent = responseObj.title;
			desP.textContent = responseObj.description;
			dateP.textContent = responseObj.date + " " + responseObj.time;
			eventDiv.appendChild(titleP);
			eventDiv.appendChild(desP);
			eventDiv.appendChild(dateP);
			
			//Add register buttons
			let regBtn = document.createElement("button");

			if(responseObj.registrationLink.length > 0)
			{
				let regLink = document.createElement("a");
				regLink.href = responseObj.regLink;
				regLink.textContent = "Register Now";
				regBtn.appendChild(regLink);
			}
			else
			{
				regBtn.textContent = "Registration Closed";
				regBtn.classList.add("disabled_button");
			}
			eventDiv.appendChild(regBtn);

			//Add event to the recent_event_container div
			recent_event_container.appendChild(eventDiv);
		}
	}


	/////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR HANDLING FORM SUBMISSIONS
	//
	////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to handle the submission of the contact form
	 */
	handleContactFormSubmission()
	{
		//Prevent default form submission
		event.preventDefault();

		if(sender_name.value.length < 1)
		{
			sender_name.style.borderColor = "red";
		}
		else if(sender_email.value.length < 1)
		{
			sender_email.style.borderColor = "red";
		}
		else if(!this.isValidEmail(sender_email.value))
		{
			alert("The email you entered is not valid.");

			sender_email.style.borderColor = "red";
		}
		else if(message.value.length < 1)
		{
			message.style.borderColor = "red";
		}
		else
		{
			let path = this.api_path + "saveMessage.php";

			let data = {
				"name": sender_name.value,
				"email": sender_email.value,
				"message": message.value
			};

			this.makeXMLHttpRequest("POST", path, this.onMessageSendSuccess, data);
		}
	}


	/**
	 *Function to reset the contact form after successfully sending the message
	 */
	onMessageSendSuccess()
	{
		//Clear field values and border color
		sender_name.value = "";
		sender_email.value = "";
		message.value = "";
		sender_name.style.borderColor = "#000000";
		sender_email.style.borderColor = "#000000";
		message.style.borderColor = "#000000";

		alert("Thanks for contacting us. We will get back to you shortly.");
	}


	///////////////////////////////////////////////////////////////////////////////////////////////
	//
	//FUNCTIONS FOR MAKING API REQUESTS
	//
	//////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 *Function to make XMLHttpRequest 
	 *@param { string } method Type of the request (Ex. POST/GET)
	 *@param { string } path API Path
	 *@param { function } successHandler The callback method for handling API response
	 *@param { object } parameters The object containing the form data
	 */
	makeXMLHttpRequest(method, path, successHandler = false, parameters = { })
	{
		let xhr = new XMLHttpRequest();
		let formData = new FormData();

		//Append aditional form feilds for API to verify the request
		formData.append("site", this.site);
		formData.append("key", this.key);

		for(let key of Object.keys(parameters))
		{
			formData.append(key, parameters[key]);
		}

		xhr.open(method, path, true);
		xhr.send(formData);

		this.xhrRequestHandler(xhr, successHandler);
	}


	/**
	 *Function to handle XMLHttpRequest response
	 *@param { XMLHttpsRequest Object } xhr The XMLHttpRequest object that made the request
	 *@param { function } successHadler The callback function to handle the API response
	 */
	xhrRequestHandler(xhr, successHandler)
	{
		xhr.onload = function()
		{
			if(xhr.status >= 200 && xhr.status < 300) 
			{
				if(xhr.response != "ERROR")
				{
					if(successHandler)
					{
						try 
						{
							let responseObj = JSON.parse(xhr.response);
							successHandler(responseObj);
						}	
						catch(err)
						{
							this.showError(JSON.parse(xhr.response));
						}
					}	
					else
					{
						this.showError();
					}		    
				}
				else
				{
					this.showError();
				}
			}
			else 
			{
				this.showError();
			}
		}.bind(this);
	}


	///////////////////////////////////////////////////////////////////////////////////////////
	//
	//UTILITY FUNCTIONS
	//
	///////////////////////////////////////////////////////////////////////////////////////////


	/**
	 *Function to show error message in an alert box
	 */
	showError(msg = null)
	{
		if(msg == null)
		{
			alert("Sorry! Something went wrong.");
		}
		else
		{
			alert(msg);
		}
	}


	/**
	 *Function to check if an email is valid
	 *@param { string } email The email address to be verified
	 *@return { boolean } true / false
	 */
	isValidEmail(email) 
	{
	    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
	    {
	    	return true;
	    }

	    return false;
	}
}

