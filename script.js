document.addEventListener("DOMContentLoaded", function() {
    // Obtén la lista de materias y el área de contenido
    const materiasList = document.getElementById("materias").querySelector("ul");
    const contenidoMateria = document.querySelector(".col-8");

    // Agrega un manejador de eventos a los elementos de la lista de materias
    materiasList.addEventListener("click", function(event) {
        if (event.target.tagName === "A") {
            event.preventDefault();

            // Carga el contenido de la materia seleccionada en el área de contenido
            const url = event.target.getAttribute("href");
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    contenidoMateria.innerHTML = data;
                })
                .catch(error => {
                    console.error("Error al cargar el contenido de la materia", error);
                });
        }
    });
});
