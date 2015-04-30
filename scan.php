<?php

	$dir = 'uploads';
	$response = scan($dir);

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
					'path' => $dir . '/' . $f,
					'items' => scan($dir . '/' . $f)
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

	header('Content-type: application/json');

	echo json_encode($response);

?>
