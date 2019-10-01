<?php
    require_once 'config.php';

    //  header('Content-Type: application/json');

    $db = dbConnect();
    $query = $db->query('SELECT id, content, status FROM todo_list');
    echo $query->fetch();
