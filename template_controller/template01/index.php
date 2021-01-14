<!--Template for UW Impact Websites-->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- Social Media Sharing Meta Tags -->
    <meta property="og:url" content="https://uwimpact.net/">
    <meta property="og:type" content="website">
    <meta property="og:title" content="UW Impact">
    <meta property="og:description" content="The University of Winnipeg Impact is a student led club, consisting of students who are passionate about using their skills to make positive impact in the society.">
    <meta property="og:image" content="http://cms.uwimpact.net/template_controller/template01/images/uwimpact_logo.png">

	<title id="site_title"></title>

	<link rel="stylesheet" type="text/css" href="https://cms.uwimpact.net/template_controller/template01/css/main.css">

	<script type="text/javascript" src="https://cms.uwimpact.net/template_controller/template01/js/Main.js"></script>
</head>
<body>
	<header id="header">
		<!--Group name-->
		<div>
			<h1 id="group_initial">UW IMPACT</h1>
		</div>

		<div id="menu_bar">
			<!--This button is only visible in mobile view and is used to open the full menu-->
			<button id="mobile_view_menu_button"><a href="">MENU</a></button>

			<!--Following buttons are visible only in desktop view-->
			<button class="desktop_view_menu_button"><a href="#">HOME</a></button>
			<button class="desktop_view_menu_button"><a href="#group_description">ABOUT US</a></button>
			<button class="desktop_view_menu_button"><a href="#statements_container">OUR MISSION AND VISION</a></button>
			<button class="desktop_view_menu_button"><a href="#join_us_container">JOIN US</a></button>
			<button class="desktop_view_menu_button"><a href="#recent_event_container">EVENTS</a></button>
			<button class="desktop_view_menu_button"><a href="#team_container">OUR TEAM</a></button>
			<button class="desktop_view_menu_button"><a href="#contact_container">CONTACT US</a></button>
		</div>
	</header>

	<!--This menu is shown only in mobile view upon the click of menu button-->
	<div id="mobile_view_menu">
		<ul>
			<li><a href="#">HOME</a></li>
			<li><a href="#group_description">ABOUT US</a></li>
			<li><a href="#statements_container">OUR MISSION AND VISION</a></li>
			<li><a href="#join_us_container">JOIN US</a></li>
			<li><a href="#recent_event_container">EVENTS</a></li>
			<li><a href="#team_container">OUR TEAM</a></li>
			<li><a href="#contact_container">CONTACT US</a></li>
		</ul>
	</div>

	<!--A banner with a background image that displays the logo and the group name in the center of the banner-->
	<div id="banner">
		<h1 id="group_name"></h1>
		<button><a href="#group_desciption">Learn More</a></button>
	</div>

	<!--A brief description of the student group-->
	<div id="group_description">
		<h3>About UW Impact</h3>
		<p id="description"></p>
	</div>

	<!--Mission and vision statement-->
	<div id="statements_container">
		<div id="mission_statement">
			<img src="images/icons/mission.png" width="100" height="100">
			<h3>Our Mission</h3>
			<p></p>
		</div>
		<div id="vision_statement">
			<img src="images/icons/vision.png" width="100" height="100">
			<h3>our Vision</h3>
			<p></p>
		</div>
	</div>

	<!-- Three rectangular boxes showing why, who and how to join the group-->
	<h2 style="text-align: center; margin-bottom: 20px;">Join Our Group</h2>
	<div id="join_us_container">
		<div id="why_join_us" class="box">
			<h3>Why Join Us</h3>
			<img src="images/icons/bulb.png">
			<p></p>
		</div>

		<div id="who_can_join" class="box">
			<h3>Who Can Join</h3>
			<img src="images/icons/bulb.png">
			<p></p>
		</div>

		<div id="how_to_join" class="box">
			<h3>How to Join</h3>
			<img src="images/icons/bulb.png">
			<p></p>
		</div>
	</div>

	<!--The following section displays the recent events organized by the group-->
	<h2 id="event_section_title" style="text-align: center; margin-top: 50px;"></h2>
	<div id="recent_event_container"></div>

	<!--The following section displays the team members of the group-->
	<div id="team_container">
		<h2 id="team_section_title"></h2>
 		<div id="team_info"></div>
	</div>

	<!--Meeting information-->
	<div id="meeting_info_container">
		<h2>Meeting Information</h2>
		<p id="meeting_info"></p>
	</div>

	<!--Contact Form-->
	<div id="contact_container">
		<h2>Contact Us</h2>
		<div id="contact_parts">
			<div id="contact_form">
				<p>Please fill up the form below and we will get back to you as soon as possible</p>
				<input type="text" id="sender_name" placeholder="Your Name">
				<input type="email" id="sender_email" placeholder="Your Email">
				<textarea id="message" placeholder="Please type your message here" style="height: 200px"></textarea>
				<button type="submit" id="submit_message_button">Send Message</button>
			</div>

			<!--Social media links-->
			<p class="social_media_label">You can also contact us via our social media accounts</p>
			<div id="social_media_links">
				<a id="facebook" href="">
					<img src="images/icons/facebook.png">
				</a>
				<a id="instagram" href="">
					<img src="images/icons/instagram.png">
				</a>
				<a id="twitter" href="">
					<img src="images/icons/twitter.png">
				</a>
				<a id="linkedin" href="">
					<img src="images/icons/linkedin.png">
				</a>
				<a id="email" href="">
					<img src="images/icons/gmail.png">
				</a>
			</div>
		</div>
	</div>

	<footer>
		<p>&copy; All Rights Reserved</p>
		<p style="font-size: 10px">Powered by <a href="https://www.uwimpact.net">UW IMPACT</a></p>
	</footer>
</body>
</html>

<script>
	document.addEventListener("DOMContentLoaded", function() {

		let mainObj = new Main(window.location.hostname.split(".")[0]);
	});
</script>