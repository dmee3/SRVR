<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
	<title>SRVR - Get yo file on</title>

	<link rel="stylesheet" href="style.css" />
	<link rel="icon" href="favicon.ico" type="image/x-icon" />
	<script src="js/jquery-1.11.2.min.js"></script>
	<script type="text/javascript" src="js/plupload.full.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script> 
</head>
<body onLoad="showFiles('uploads')">
	<div id="top">
		<div id="title"></div>
		<div class="button" id="upload" onClick="showForm();">Upload</div>
	</div>
	<div id="main">

		<div id="file_list">
		</div>

		<div id="dim">
			<div class="popup" id="form">
				<ul id="add_list"></ul>
				<br />
				<div class="button" id="add_file">Add File</div>
				<div class="button" id="go">Go!</div>
				<div class="button cancel" onClick="hideForm();">Cancel</div>
			</div>

			<div class="popup" id="video">
				<video id="player" controls>
				</video>
				<a id="vid_dl" href="" download><div class="button">Download</div></a>
				<div class="button cancel" onClick="hideVideo();">Cancel</div>
			</div>
		</div>
	
	</div>
<script type="text/javascript">
var uploader = new plupload.Uploader({
	runtimes : 'html5,html4',
	browse_button : 'add_file',
	container: document.getElementById('form'),
	url : 'upload.php',
	chunk_size : '2mb',
	max_retries : 5,

	init: {
		PostInit: function() {
			document.getElementById('add_list').innerHTML = '';

			document.getElementById('go').onclick = function() {
				uploader.start();
				return false;
			};
		},

		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('add_list').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
			});
		},

		UploadProgress: function(up, file) {
			document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
		},

		UploadComplete: function(up, file) {
			window.location.reload();
		}

	}
});

uploader.init();

</script>
</body>
</html>
