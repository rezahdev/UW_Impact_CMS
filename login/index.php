<!--Login page for UW Impact CMS-->
<!DOCTYPE html>
<html>
<head>
	<title>UW Impact CMS Sign In</title>

	<link rel="stylesheet" type="text/css" href="loginStyle.css">
	<script type="text/javascript" src="Authentication.js"></script>

	<script>
		if(localStorage.getItem("userId") != null && localStorage.getItem("accessKey") != null) {
			//If the user is already logged in, redirect the user to the homepage
			window.location = "../";
		}
		else {
			localStorage.clear();
			
			document.addEventListener("DOMContentLoaded", function() {

				let authObj = new Authentication();
			});
		}
	</script>
</head>
<body>
	<header>
		<h1>Welcome to UW Impact CMS</h1>
		<p>Please sign in to continue</p>
	</header>

	<div id="container">
		<form id="login_form">
			<input type="text" name="username" id="username" placeholder="Username" required>
			<input type="password" name="password" id="password" placeholder="Password" required>
			<input type="submit" name="submit" id="submit_btn" value="Sign In">
		</form>

		<p id="message"></p>
	</div>
</body>
</html>