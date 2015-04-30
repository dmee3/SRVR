$(function() {

$.get('../scan.php', function(data) {

	var resp = [data];
	var path = '';
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
			folders[folders.length] = '<div class="file dir" onClick=""><span>' + f.name + '</span><div class="folder"></div></div>';
		}

	});

	for (var i = 0; i < folders.length; i++)
		html += folders[i];
	for (i = 0; i < files.length; i++)
		html += files[i];

	$('#file_list').html(html);

	$('.vid_file').on('click', function() {
		console.log($(this).data('file'));
		showVideo($(this).data('file'));
	});

	$('#player').on('click', function(e) {
		if(e.offsetY < ($(this).height() - 36)) {
			if(this.paused)
				this.play();
			else
				this.pause();
		}
	});

});
});


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

