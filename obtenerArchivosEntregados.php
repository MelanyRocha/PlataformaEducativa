<?php
// Incluye el archivo de conexión a la base de datos
global $pdo;
include 'conexion.php';

// Obtén los parámetros de la solicitud (ID de estudiante y ID de tarea)
$idEstudiante = $_GET['idEstudiante']; // Asegúrate de que estos nombres coincidan con los utilizados en tu solicitud AJAX
$idTarea = $_GET['idTarea'];

try {
    // Realiza una consulta SQL para obtener los nombres de los archivos entregados
    $consulta = "SELECT archivosEntrega FROM Plataformaedu.entrega WHERE estudiante_idEstudiante = :idEstudiante AND tarea_idTarea = :idTarea";
    $stmt = $pdo->prepare($consulta);
    $stmt->bindParam(':idEstudiante', $idEstudiante, PDO::PARAM_INT);
    $stmt->bindParam(':idTarea', $idTarea, PDO::PARAM_INT);

    if ($stmt->execute()) {
        // Obtiene el resultado de la consulta
        $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultado) {
            // Los nombres de archivos están en la columna 'archivosEntrega'
            $archivosEntregados = $resultado['archivosEntrega'];
            echo json_encode($archivosEntregados);
        } else {
            // No se encontraron archivos entregados
            echo json_encode([]);
        }
    } else {
        // Error en la consulta
        echo json_encode(['error' => 'Error en la consulta.']);
    }
} catch (PDOException $e) {
    // Error en la base de datos
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
}
