<?php
// Conexión a la base de datos Mysql
try {
    $pdo = new PDO('mysql:host=database-plataformaedu.cclomwjbpd4h.sa-east-1.rds.amazonaws.com;port=3306;dbname=Base',
        'admin',
        'admin12345');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Sí ocurre algún error, enviar un mensaje de error al cliente
    header('Content-Type: application/json');
    echo json_encode(['error' => $e->getMessage()]);
    exit();
}
