<?php
    $dns = 'mysql';
    $host = 'localhost';
    $db = 'portfolio';
    $user = 'root';
    $password = '';

    function dbConnect()
    {
        $db = new \PDO($this->dns . ':host=' . $this->host . ';dbname=' . $this->db . ';charset=utf8', $this->user, $this->password);
        $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);
        return $db;
    }