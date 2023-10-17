<?php
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

// Obtener los datos del formulario
$idMateria = $_POST["idMateria"];
$nombreMateria = $_POST["nombreMateria"];

// Preparar la consulta
$consulta = "INSERT INTO inscripciones (idMateria, nombreMateria) VALUES (:idMateria, :nombreMateria)";
$stmt = $pdo->prepare($consulta);

// Vincular los parámetros
$stmt->bindParam(":idMateria", $idMateria);
$stmt->bindParam(":nombreMateria", $nombreMateria);

// Ejecutar la consulta
$stmt->execute();

// Cerrar la conexión
$pdo = null;

// Redireccionar a la página principal
header("Location: retirarMaterias.html");

?>