<?php
    require 'config.php';
    $db = dbConnect();

    // Takes raw data from the request
    $json = file_get_contents('php://input');

    // Converts it into a PHP object
    $data = json_decode($json);

    if (isset($data) && $data['content'] != '') {
        if ($data['id'] > 0) { // Update task
            $query = $db->prepare('UPDATE todo_list SET content = :content, status = :status WHERE id = :id');
            $query->bindParam(':content', htmlspecialchars($data['content']));
            $query->bindParam(':status', $data['status'], PDO::PARAM_INT);
            $query->bindParam(':id', $data['id'], PDO::PARAM_INT);
            $query->execute();
        }
        else { // Add task
            $query = $db->prepare('INSERT INTO todo_list (content, status) VALUES (:content, :status)');
            $query->bindParam(':content', htmlspecialchars($data['content']));
            $query->bindParam(':status', 1);
            $query->execute();
        }
    }
    elseif (isset($data) && $data['status'] == 0 && $data['id'] > 0) { // Delete task
        $query = $db->prepare('DELETE FROM todo_list WHERE id = :id');
        $query->bindParam(':id', $data['id'], PDO::PARAM_INT);
        $query->execute();
    }
    else {
        echo '<h1>Il ne faut pas regarder les fichiers des autres, chenapan</h1>';
    }