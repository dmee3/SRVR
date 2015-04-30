function showFiles(dir) {
$.get('../scan.php', { path: dir }, function(data) {

	//Set path links along top of page
	var path = '<a class="title_link title_link_lg" href="javascript:showFiles(\'uploads\')">SRVR</a>';
	if (dir != 'uploads') {
		var path_split = dir.split('/');
		var path_arr = [];
		for (var  i = 1; i < path_split.length; i++) {
			path_arr[i] = 'uploads';
			for (var j = 1; j <= i; j++)
				path_arr[i] += '/' + path_split[j];
			path += ' > <a class="title_link" href="javascript:showFiles(\'' + path_arr[i] + '\')">' + path_split[i] + '</a>';
		}
	}
	$('#title').html(path);


	//Generate html for returned files/folders
	var html = "";
	var files = [], folders = [];
	$.each(data, function(key,f) {
		if (f.type == 'file') {
			switch (f.ext) {
				case 'mp4':
					files[files.length] = '<div class="file vid_file" data-file="' + f.path + '"><span>' + f.name + '</span><div class="play_button"></div></div>';
					break;
				case 'mkv':
					files[files.length] = '<div class="file vid_file" data-file="' + f.path + '"><span>' + f.name + '</span><div class="play_button"></div></div>';
					break;
				default:
					files[files.length] = '<a class="file_name" href="' + f.path + '" download><div class="file">' + f.name + '</div></a>';
			}
		} else if (f.type == 'folder') {
			folders[folders.length] = '<div class="file dir" onClick="showFiles(\'' + f.path + '\')"><span>' + f.name + '</span><div class="folder"></div></div>';
		}
	});

	//Sort (folders then files) and populate list
	for (var i = 0; i < folders.length; i++)
		html += folders[i];
	for (i = 0; i < files.length; i++)
		html += files[i];
	$('#file_list').html(html);

	//Show videos on click
	$('.vid_file').on('click', function() {
		console.log($(this).data('file'));
		showVideo($(this).data('file'));
	});

	//Pause video when clicking video player
	$('#player').on('click', function(e) {
		if(e.offsetY < ($(this).height() - 36)) {
			if(this.paused)
				this.play();
			else
				this.pause();
		}
	});

});
}


function showForm() {
	$('#dim').show();
	$('#form').show();
}

function hideForm() {
	$('#dim').hide();
	$('#dim').hide();
}

function showVideo(vid) {
	$('#player')[0].src = vid;

	$('#dim').show();
	$('#video').show();
	$('#player')[0].play();
}

function hideVideo() {
	$('#player')[0].pause();
	$('#dim').hide();
	$('#video').hide();
}

