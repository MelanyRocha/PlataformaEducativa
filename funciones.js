document.addEventListener("DOMContentLoaded", function () {
    const tareasLista = document.getElementById("tareasLista");
    const contenidoTarea = document.getElementById("contenidoTarea");

    function cargarTareas() {
        fetch("obtener_tareas.php")
            .then((response) => response.json())
            .then((data) => {
                tareasLista.innerHTML = "";

                if (data.length > 0) {
                    data.forEach((tarea) => {
                        const tareaElement = document.createElement("li");
                        tareaElement.className = "list-group-item";
                        tareaElement.innerHTML = `
                            <a href="#" data-id="${tarea.id}">${tarea.nombre}</a>
                        `;
                        tareasLista.appendChild(tareaElement);
                    });

                    const enlacesTareas = tareasLista.querySelectorAll("a");
                    enlacesTareas.forEach((enlace) => {
                        enlace.addEventListener("click", function (e) {
                            e.preventDefault();
                            mostrarTarea(this.getAttribute("data-id"));
                        });
                    });
                } else {
                    tareasLista.innerHTML = "<p>No se encontraron tareas pendientes.</p>";
                }
            })
            .catch(() => {
                tareasLista.innerHTML = "<p>Error al cargar las tareas pendientes.</p>";
            });
    }

    function mostrarTarea(id) {
        fetch("obtener_tarea.php?id=" + id)
            .then((response) => response.json())
            .then((tarea) => {
                contenidoTarea.innerHTML = `
                    <h2>${tarea.nombre}</h2>
                    <p><strong>Fecha de Entrega:</strong> ${tarea.entrega_dia} a las ${tarea.entrega_hora}</p>
                `;
            })
            .catch(() => {
                contenidoTarea.innerHTML = "<p>Error al cargar la tarea.</p>";
            });
    }

    cargarTareas();
});
