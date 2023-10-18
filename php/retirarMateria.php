<?php
global $pdo;
include 'conexion.php';

if (isset($_POST['materia'])) {
    // Obtener los datos de la materia y limpiarlos de caracteres especiales
    $materia = filter_var($_POST['materia'], FILTER_SANITIZE_STRING);

    // Preparar la consulta SQL para insertar la materia en la tabla
    $sql = 'DELETE FROM Plataformaedu.inscripciones WHERE nombreMateria = :materia';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':materia', $materia);

    // Ejecutar la consulta y verificar si se insertó la materia
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        // Sí se insertó la materia, mensaje de éxito
        $response = ['mensaje' => 'La materia ' . $materia . ' ha sido retirada correctamente.'];
    } else {
        // Si no se insertó la materia, mensaje de error
        $response = ['mensaje' => 'Ocurrió un error al retirar la materia ' . $materia];
    }
    // Cerrar la conexión a la base de datos
    $stmt->closeCursor();
    header('Content-Type: application/json');
    echo json_encode($response);
}