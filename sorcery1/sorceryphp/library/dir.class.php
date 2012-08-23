<?php
class dir{
	public function dirlist($path){
		return scandir($path);
	}
	
	public function open($path) {

		return;
	}

	public function write($path,$content) {

		return;
	}

	public function delete($path) {

		return;
	}

	public function move($beforPath,$afterPath) {

		return;
	}
}