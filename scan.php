<?php

	$dir = $_GET['path'];
	$response = scan($dir);
	header('Content-type: application/json');
	echo json_encode($response);

	function scan($dir) {

		$contents = array();

		foreach(scandir($dir) as $f) {

			if ($f[0] == '.') {
				continue;
			}

			if (is_dir($dir . '/' . $f)) {
				$contents[] = array(
					'name' => $f,
					'type' => 'folder',
					'path' => $dir . '/' . $f
				);
			} else {
				$contents[] = array(
					'name' => $f,
					'type' => 'file',
					'path' => $dir . '/' . $f,
					'ext' => pathinfo($f, PATHINFO_EXTENSION)
				);
			}
		}

		return $contents;
	}

?>
