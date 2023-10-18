<?php
// Incluye el archivo de conexión
global $pdo;
include 'conexion.php';

// Consulta SQL
$query = "SELECT tituloTarea, descripcionTarea, nombreDocente, fechaIniTarea, fechaFinTarea FROM Plataformaedu.tarea WHERE idTarea = 1";

try {
    // Ejecuta la consulta usando PDO
    $stmt = $pdo->query($query);

    if ($stmt) {
        // Obtiene los resultados como un arreglo asociativo
        $fila = $stmt->fetch(PDO::FETCH_ASSOC);

        // Comprueba si se encontraron datos
        if ($fila) {
            $datos = array(
                'titulo' => $fila['tituloTarea'],
                'nombre_docente' => $fila['nombreDocente'],
                'fecha' => $fila['fechaIniTarea'] . ' - ' . $fila['fechaFinTarea'],
                'descripcion' => $fila['descripcionTarea']
            );

            echo json_encode($datos);
        } else {
            echo "No se encontraron datos.";
        }
    } else {
        echo "Error en la consulta.";
    }
} catch (PDOException $e) {
    // En caso de error, mostrar el mensaje de error
    echo "Error: " . $e->getMessage();
}
?>
