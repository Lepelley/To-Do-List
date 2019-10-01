<?php
    require_once 'config.php';

    header('Content-Type: application/json');

    $json_array = array();
    $db = dbConnect();
    $query = $db->query('SELECT id, content, status FROM todo_list');
    while ($data = $query->fetch(PDO::FETCH_ASSOC)) {
        $json_array[] = $data;
    }

    echo json_encode($json_array);
    
