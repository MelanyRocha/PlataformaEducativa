<?php
// Array de materias (puedes cargar estas materias desde una base de datos)
$materias = array(
    "materia1.html" => "Sistemas de Información 2",
    "materia2.html" => "Redes de Computadoras",
    "materia3.html" => "Gráficación por Computadora",
    "materia4.html" => "Big Data",
    "materia5.html" => "Elementos"
);

// Función para mostrar la lista de materias
function mostrarMaterias($materias) {
    echo '<ul>';
    foreach ($materias as $url => $nombre) {
        echo '<li><a href="' . $url . '">' . $nombre . '</a></li>';
    }
    echo '</ul>';
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mis Materias</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Mis Materias</h1>
        </header>
        <main class="row">
            <aside class="col-4">
                <section id="materias">
                    <h2>Materias Cursadas</h2>
                    <?php mostrarMaterias($materias); ?>
                </section>
            </aside>
            <section class="col-8">
                <!-- Contenido de la materia seleccionada se mostrará aquí -->
            </section>
        </main>
    </div>
</body>
</html>
