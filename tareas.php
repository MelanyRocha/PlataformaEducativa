<?php
try {
    $pdo = new PDO('mysql:host=database-plataformaedu.cclomwjbpd4h.sa-east-1.rds.amazonaws.com;port=3306;dbname=Plataformaedu', 'admin', 'admin12345');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}

$query = "SELECT * FROM TareasPendientes";
$result = $pdo->query($query);
$tareas = $result->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($tareas);



