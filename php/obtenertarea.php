<?php
// Incluye el archivo de conexión
global $pdo;
include 'conexion.php';

// Consulta SQL
$query = "SELECT t.tituloTarea, m.nombreMateria, t.descripcionTarea, d.nombreDocente, d.apellidoDocente, t.fechaInicioTarea, t.fechaFinTarea
    FROM Plataformaedu.tarea AS t, Plataformaedu.materia AS m, Plataformaedu.docente AS d
    WHERE t.materia_idMateria = m.idMateria
    AND m.docente_idDocente = d.idDocente
    AND t.idTarea = 1;
 ";

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
                'nombre_docente' => $fila['nombreDocente'] . ' ' . $fila['apellidoDocente'] . ' - ' . $fila['nombreMateria'],
                'fecha' => $fila['fechaInicioTarea'] . ' - ' . $fila['fechaFinTarea'],
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