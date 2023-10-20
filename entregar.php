<?php
// Incluir el archivo de conexión a la base de datos
global $pdo;
include 'conexion.php';

// Obtener los datos enviados desde el formulario
$archivos = $_POST['archivo'];

// Convertir el array de archivos en una cadena separada por comas
$archivos_str = implode(",", $archivos);

try {
    // Realizar la inserción en la tabla "entrega"
    $sql = "INSERT INTO Plataformaedu.entrega (estadoEntrega, archivosEntrega, fechaEntrega, nombreEstudiante, idTarea) VALUES ('yes', :nombre, CURDATE(), 'nombreEstudiante', 1)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nombre', $archivos_str);
    $stmt->execute();

    // Obtener el ID de la última inserción
    $idEntrega = $pdo->lastInsertId();

    // Cerrar la conexión
    $pdo = null;

    // Crear un array con el mensaje de éxito, los archivos enviados y el ID de la entrega
    $response = array(
        "message" => "Los archivos y los datos se han insertado correctamente en la base de datos.",
        "files" => $archivos,
        "idEntrega" => $idEntrega
    );

    // Enviar una respuesta al cliente en formato JSON
    echo json_encode($response);
} catch (PDOException $e) {
    // Error en la inserción
    $response = array("success" => false, "message" => $e->getMessage());
    echo json_encode($response);
}
