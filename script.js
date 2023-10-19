document.addEventListener("DOMContentLoaded", function () {
    const materiasList = document.querySelectorAll("#materias li a");
    const contenidoMateria = document.querySelector("#contenido-materia"); // Cambia el selector según tu HTML

    materiasList.forEach((materia) => {
        materia.addEventListener("click", function (e) {
            e.preventDefault();
            const urlMateria = materia.getAttribute("href");
            cargarContenidoMateria(urlMateria);
        });
    });

    function cargarContenidoMateria(url) {
        fetch("tu-archivo-php.php?url=" + encodeURIComponent(url)) // Cambia la URL de tu archivo PHP
            .then((response) => response.text())
            .then((data) => {
                contenidoMateria.innerHTML = data;
            })
            .catch(() => {
                contenidoMateria.innerHTML = "Error al cargar el contenido de la materia.";
            });
    }
});
