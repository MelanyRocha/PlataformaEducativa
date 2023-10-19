<?php
$host = "database-plataformaedu.cclomwjbpd4h.sa-east-1.rds.amazonaws.com";
$port = 3306;
$username = "admin";
$password = "admin12345";
$database = "Plataformaedu";

try {
    $pdo = new PDO('mysql:host=database-plataformaedu.cclomwjbpd4h.sa-east-1.rds.amazonaws.com;port=3306;dbname=Base',
        'admin',
        'admin12345');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT nombre, entrega_dia, entrega_hora FROM TareasPendientes";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $taskList = $stmt->fetchAll(PDO::FETCH_ASSOC);

    header('Content-Type: application/json');
    echo json_encode($taskList);
} catch (PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
}
?>
