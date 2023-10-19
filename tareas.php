<?php


// Preparar la consulta SQL para obtener todas las tareas pendientes
global $pdo;
$sql = 'SELECT nombre, entrega_dia, entrega_hora FROM TareasPendientes';
$stmt = $pdo->prepare($sql);
$stmt->execute();

// Obtener todas las tareas pendientes como un arreglo asociativo
$tareasPendientes = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Enviar las tareas pendientes al cliente como JSON
header('Content-Type: application/json');
echo json_encode($tareasPendientes);

