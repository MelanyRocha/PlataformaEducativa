<?php
global $pdo;
include 'conexion.php';

$query = "SELECT nombre, entrega_dia, entrega_hora FROM Plataformaedu.TareasPendientes";
$result = $pdo->query($query);

$tareasPendientes = [];
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    $tareasPendientes[] = $row;
}

header('Content-Type: application/json');
echo json_encode($tareasPendientes);




