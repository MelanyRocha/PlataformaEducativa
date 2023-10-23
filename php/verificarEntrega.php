<?php
// Realiza la consulta para verificar si la tarea puede editarse
global $pdo;
include 'conexion.php';

// Obtén los valores de idEstudiante e idTarea desde la solicitud AJAX
$idEstudiante = $_GET['idEstudiante'];
$idTarea = $_GET['idTarea'];

$consulta_entrega = "SELECT COUNT(nEditEntrega) AS entrega_realizada, nEditEntrega
FROM Plataformaedu.entrega
WHERE estudiante_idEstudiante = :idEstudiante AND tarea_idTarea = :idTarea;";

$stmt = $pdo->prepare($consulta_entrega);
$stmt->bindParam(':idEstudiante', $idEstudiante);
$stmt->bindParam(':idTarea', $idTarea);

if ($stmt->execute()) {
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $entrega_realizada = $result['entrega_realizada'];
    $nEditEntrega = $result['nEditEntrega'];

    $response = array();

    if ($nEditEntrega >= 3) {
        $response['status'] = 'no_editable';
        $response['message'] = 'No puedes editar la tarea más de 3 veces.';
    } elseif ($entrega_realizada == 1 && $nEditEntrega < 4) {
        $response['status'] = 'entregada';
        $response['message'] = 'La tarea ya ha sido entregada.';
    } else {
        $response['status'] = 'no_entregada';
        $response['message'] = 'La tarea puede editarse.';
    }

    echo json_encode($response);
} else {
    $response['status'] = 'error';
    $response['message'] = 'Error al verificar la entrega.';
    echo json_encode($response);
}
