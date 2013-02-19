<?php

class Users_model extends CI_Model {
    var $sql = '';
    public function seletc(){
        return $this->db->get('users');
    }
}