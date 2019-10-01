<?php
    require_once 'config.php';

    //  header('Content-Type: application/json');
    
    echo json_encode(array('text' => 'omrele'));

    $db = dbConnect();
    $query = $db->query('SELECT id, content, status FROM todo_list');
    echo json_encode($query->fetch());
