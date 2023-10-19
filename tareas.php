<?php
try {
    // Conexión a la base de datos
    $pdo = new PDO('mysql:host=database-plataformaedu.cclomwjbpd4h.sa-east-1.rds.amazonaws.com;port=3306;dbname=Plataformaedu', 'admin', 'admin12345');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta SQL para seleccionar tareas pendientes
    $sql = 'SELECT nombre, entrega_dia, entrega_hora FROM TareasPendientes';
    $stmt = $pdo->query($sql);

    // Obtener resultados como arreglo asociativo
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión a la base de datos
    $pdo = null;

    // Devolver resultados como JSON
    header('Content-Type: application/json');
    echo json_encode($resultados);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}







