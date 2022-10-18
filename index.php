<!--UW Impact CMS Homepage-->

<!DOCTYPE html>
<html>
<head>
	<title>UW IMPACT CMS</title>

	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/Main.js"></script>

	<script>
		if(localStorage.getItem("userId") == null || localStorage.getItem("accessKey") == null) {
			localStorage.clear();
			window.location = "login/";
		}
		else {
			document.addEventListener("DOMContentLoaded", function() {
				let mainObj = new Main();
			});
		}
	</script>
</head>
<body>
	<div id="side_menu">
		<div id="logo">
			<h1>UW Impact CMS</h1>
		</div>

		<div id="menu_buttons">
			<ul>
				<li id="home_btn" class="active">Home</li>
				<li id="basic_info_btn">Basic Info</li>
				<li id="team_info_btn">Team Info</li>
				<li id="events_info_btn">Events Info</li>
				<li id="social_media_info_btn">Social Media Info</li>
				<li id="messages_btn">Messages</li>
				<li id="contact_us_btn">More</li>
				<li id="change_password_btn">Change Password</li>
				<li id="logout_btn">Log Out</li>
			</ul>
		</div>

		<div id="copyright_disclaimer">
			<p>&copy;All Rights Reserved 2020. Designed and Developed by Reza S. Hossain, Distributed by UW Impact.</p>
		</div>
	</div>

	<div id="content_container">

		<div id="content_header">
			<h2><!--Ttitle of the selected menu. Text Content is added dynamically by JavaScript.--></h2>
		</div>

		<div id="content_body" class="blurr_out">
			<div id="home">
				<h2>Welcome to UW Impact CMS!</h2>

				<p>UW Impact CMS is a content management system that allows you to add/edit/delete any content on your student group website. The purpose of this app is to give you more control over your website and make the UW Impact Web Services more convenient for the users.</p>

				<!--Displays the website of the group-->
				<h2>Your Website</h2>
				<iframe id="website_demo"></iframe>
			</div>

			<div id="basic_info">

				<!--Form to change logo-->
				<form id="logo_form">
					<!--Logo of the student group that is currently logged in-->

					<label>Upload New Logo: </label>
					<input type="file" id="group_logo">
					<input type="submit" id="submit_group_logo" value="Upload">
				</form>

				<form id="name_form">
					<label>Name: </label>
					<input type="text" id="group_name">
					<input type="submit" id="submit_group_name" value="Update">
				</form>

				<form id="name_initial_form">
					<label>Initial: </label>
					<input type="text" id="group_initial">
					<input type="submit" id="submit_group_initial" value="Update">
				</form>

				<form id="description_form">
					<label>Description: </label>
					<textarea id="description"></textarea>
					<input type="submit" id="submit_description" value="Update">
				</form>

				<form id="mission_statement_form">
					<label>Mission Statement: </label>
					<textarea id="mission_statement"></textarea>
					<input type="submit" id="submit_mission_statement" value="Update">
				</form>

				<form id="vision_statement_form">
					<label>Vision Statement: </label>
					<textarea id="vision_statement"></textarea>
					<input type="submit" id="submit_vision_statement" value="Update">
				</form>

				<!--A statement describing why to join this student group-->
				<form id="why_join_us_form">
					<label>Description of why students should join this group: </label>
					<textarea id="why_join_us"></textarea>
					<input type="submit" id="submit_why_join_us" value="Update">
				</form>

				<!--A statement describing who can join this student group-->
				<form id="who_can_join_form">
					<label>Description of who can join this group: </label>
					<textarea id="who_can_join"></textarea>
					<input type="submit" id="submit_who_can_join" value="Update">
				</form>

				<!--A statement describing how to join this student group-->
				<form id="how_to_join_form">
					<label>Description of how to join this group: </label>
					<textarea id="how_to_join"></textarea>
					<input type="submit" id="submit_how_to_join" value="Update">
				</form>

				<form id="meeting_info_form">
					<label>Meeting Information: </label>
					<textarea id="meeting_info"></textarea>
					<input type="submit" id="submit_meeting_info" value="Update">
				</form>
			</div>

			<div id="team_info">
				<button id="add_member_btn">Add New Team Member</button>

				<!--More HTML COntent in this part would be dynamically filled by JavaScript-->
			</div>

			<div id="events_info">
				<button id="add_event_btn">Add New Event</button>

				<!--More HTML COntent in this part would be dynamically filled by JavaScript-->
			</div>

			<div id="social_media_info">
				<form id="facebook_link_form">
					<label>Facebook Link: </label>
					<input type="text" id="facebook_link">
					<input type="submit" id="submit_facebook_link" value="Update">
				</form>

				<form id="instagram_link_form">
					<label>Instagram Link: </label>
					<input type="text" id="instagram_link">
					<input type="submit" id="submit_instagram_link" value="Update">
				</form>

				<form id="twitter_link_form">
					<label>Twitter Link: </label>
					<input type="text" id="twitter_link">
					<input type="submit" id="submit_twitter_link" value="Update">
				</form>

				<form id="linkedin_link_form">
					<label>Linkedin Link: </label>
					<input type="text" id="linkedin_link">
					<input type="submit" id="submit_linkedin_link" value="Update">
				</form>

				<form id="email_address_form">
					<label>Email Address: </label>
					<input type="text" id="email_address">
					<input type="submit" id="submit_email_address" value="Update">
				</form>
			</div>

			<div id="message_container">
				<!--HTML Content in this part is dynamically filled by JavaScript on runtime-->
			</div>

			<div id="change_password">
				<form id="change_password_form">
					<label>Current Password: </label>
					<input type="password" id="current_password">
					<label>New Password: </label>
					<input type="password" id="new_password">
					<label>Confirm Password: </label>
					<input type="password" id="confirm_password">
					<input type="submit" id="submit_new_password" value="Change Password">
				</form>
			</div>

			<div id="contact_us">
				<h2>Contact UW Impact</h2>

				<p>If you have any trouble using the application or if you need more customization for your website, please feel free to reach out to us via email info.uwimpact@gmail.com or via Instagram (@uwimpact). We are here to help you strenghen your digital presence to reach more students. We understand that there are still a lot more features that need to be added to this application and we are committed to brining in new features as per your recommendation.</p>
			</div>
		</div>

		<!--Pop up form to add team member name and designation-->
		<form id="member_form" class="popup_form hidden">
			<label>Member Name: </label>
			<input type="text" id="member_name">
			<label>Member Designation: </label>
			<input type="text" id="member_designation">
			<label>Member Picture: </label>
			<input type="file" id="member_picture">
			<input type="hidden" id="member_id" value="">
			<input type="submit" id="submit_member_info" value="">
			<button id="close_member_form_btn" class="cancel_btn">Cancel</button>
		</form>
		
		<!--Popup form to add new event-->
		<form id="event_form" class="popup_form hidden">
			<label>Event Title: </label>
			<input type="text" id="event_title">
			<label>Event Description: </label>
			<textarea id="event_description"></textarea>
			<label>Event Date: </label>
			<input type="text" id="event_date">
			<label>Event Time: </label>
			<input type="text" id="event_time">
			<label>Event Registration Link: </label>
			<input type="text" id="event_registration_link">
			<input type="hidden" id="event_id" value="">
			<input type="submit" id="submit_event_info" value="">
			<button id="close_event_form_btn" class="cancel_btn">Cancel</button>
		</form>

		<!--Popup form to give warning message before deleting a member or event-->
		<form id="delete_form" class="popup_form hidden">
			<label id="delete_warning"></label>
			<input type="hidden" id="delete_type" value="">
			<input type="hidden" id="delete_id" value="">
			<button id="delete_btn" class="delete_btn_major">Delete</button>
			<button id="close_delete_form_btn" class="cancel_btn">Cancel</button>
		</form>

		<!--Popup notification box to display notifications-->
		<div id="notification_box" class="hidden popup_form">
			<p id="notification">This is a notification</p>
			<button id="close_notification_btn">Close</button>
		</div>
	</div>
</body>
</html>