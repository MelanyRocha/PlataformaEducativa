<?php
global $pdo;
include 'conexion.php';

// Verificar si se recibieron los datos de la creación de la clase por POST
if (isset($_POST['materia']) && isset($_POST['fechainicio']) && isset($_POST['fechafin'])) {
    // Obtener los datos de la materia y limpiarlos de caracteres especiales
    $materia = filter_var($_POST['materia'], FILTER_SANITIZE_STRING);
    $fechainicio = filter_var($_POST['fechainicio'], FILTER_SANITIZE_STRING);
    $fechafin = filter_var($_POST['fechafin'], FILTER_SANITIZE_STRING);
    // Preparar la consulta SQL para insertar la materia en la tabla
    $sql = 'INSERT INTO Plataformaedu.materia (nombreMateria, fechaInicio, fechaFin) VALUES (:materia, :fechainicio, :fechafin)';
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':materia', $materia);
    $stmt->bindParam(':fechainicio', $fechainicio);
    $stmt->bindParam(':fechafin', $fechafin);
    // Ejecutar la consulta y verificar si se insertó la materia
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        // Sí se insertó la materia, crear un arreglo asociativo con un mensaje de éxito
        $response = ['mensaje' => 'La materia ' . $materia . ' se creó correctamente.'];
    } else {
        // Si no se insertó la materia, crear un arreglo asociativo con un mensaje de error
        $response = ['mensaje' => 'Ocurrió un error al intentar crear la materia ' . $materia . '. Vuelva a intentarlo.'];
    }
    // Cerrar la conexión a la base de datos
    $stmt->closeCursor();
    // Enviar la respuesta al cliente como JSON
    // Enviar la respuesta al cliente como JSON
header('Content-Type: application/json');
echo json_encode($response);
}
