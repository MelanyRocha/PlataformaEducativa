<?php
// Incluir el archivo de conexión a la base de datos
global $pdo;
include 'conexion.php';

// Obtener los datos enviados desde el formulario
$archivos = $_POST['archivo'];

// Convertir el array de archivos en una cadena separada por comas
$archivos_str = implode(",", $archivos);

// Crear una consulta SQL para insertar los datos en la tabla entrega
$sql = "INSERT INTO Plataformaedu.entrega (estadoEntrega, archivosEntrega, fechaEntrega, nombreEstudiante) VALUES ('yes', :nombre, CURDATE(), 'nombreEstudiante')";

// Preparar la consulta con el objeto PDO
$stmt = $pdo->prepare($sql);

// Asignar la cadena de archivos al parámetro :nombre
$stmt->bindParam(':nombre', $archivos_str);

// Ejecutar la consulta
$stmt->execute();

// Cerrar la conexión
$pdo = null;

// Crear un array con el mensaje de éxito y los archivos enviados
$response = array(
    "message" => "Los archivos y los datos se han insertado correctamente en la base de datos.",
    "files" => $archivos
);

// Enviar una respuesta al cliente en formato JSON
echo json_encode($response);
