<?php
global $pdo;
require_once 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comment = $_POST['comment'];

    $stmt = $pdo->prepare("INSERT INTO comentarios (texto) VALUES (:comment)");
    $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);

    if ($stmt->execute()) {
        echo "Comentario agregado con éxito.";
    } else {
        echo "Error al agregar el comentario.";
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $comments = [];
    $result = $pdo->query("SELECT texto FROM comentarios ORDER BY id DESC");

    if ($result) {
        while ($row = $result->fetch()) {
            $comments[] = $row['texto'];
        }
    }

    echo '<ul>';
    foreach ($comments as $comment) {
        echo '<li>' . htmlspecialchars($comment) . '</li>';
    }
    echo '</ul>';
}




