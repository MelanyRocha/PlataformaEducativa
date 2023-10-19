<?php
$host = "database-plataformaedu.cclomwjbpd4h.sa-east-1.rds.amazonaws.com";
$usuario = "admin";
$password = "admin12345";
$nombre_db = "tu_base_de_datos";
$puerto = 3306;

// Realiza la conexión a la base de datos
$mysqli = new mysqli($host, $usuario, $password, $nombre_db, $puerto);

if ($mysqli->connect_error) {
    die("Error de conexión a la base de datos: " . $mysqli->connect_error);
}

// Establece la conexión a la base de datos
$host = 'database-plataformaedu.cclomwjbpd4h.sa-east-1.rds.amazonaws.com';
$port = 3306;
$username = 'admin';
$password = 'admin12345';
$database = 'nombre_de_la_base_de_datos'; // Reemplaza con el nombre de tu base de datos

$mysqli = new mysqli($host, $username, $password, $database, $port);

if ($mysqli->connect_error) {
    die("Error de conexión: " . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comment = $_POST['comment'];

    $stmt = $mysqli->prepare("INSERT INTO comentarios (texto) VALUES (?)");
    $stmt->bind_param("s", $comment);

    if ($stmt->execute()) {
        echo "Comentario agregado con éxito.";
    } else {
        echo "Error al agregar el comentario.";
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Recuperar comentarios
    $comments = [];
    $result = $mysqli->query("SELECT texto FROM comentarios ORDER BY id DESC");

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row['texto'];
        }
    }

    // Devuelve los comentarios como una lista HTML
    echo '<ul>';
    foreach ($comments as $comment) {
        echo '<li>' . htmlspecialchars($comment) . '</li>';
    }
    echo '</ul>';
}

$mysqli->close();


// Realiza una consulta para obtener las tareas pendientes
$result = $mysqli->query("SELECT nombre FROM tareas");

$tareas = array();
while ($row = $result->fetch_assoc()) {
    $tareas[] = $row;
}

// Devuelve las tareas en formato JSON
echo json_encode($tareas);

$mysqli->close();
?>

