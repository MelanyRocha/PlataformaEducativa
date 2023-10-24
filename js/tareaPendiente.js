document.addEventListener("DOMContentLoaded", function () {
    const tareasLista = document.getElementById("tareasLista");
    const contenidoTarea = document.getElementById("contenidoTarea");

    function cargarTareasPendientes() {
        fetch("php/tareaPendiente.php")
            .then((response) => response.json())
            .then((tareas) => {
                tareasLista.innerHTML = "";

                if (tareas.length > 0) {
                    tareas.forEach((tarea, index) => {
                        const tareaElement = document.createElement("li");
                        tareaElement.classList.add("list-group-item");
                        tareaElement.textContent = tarea.nombre;

                        tareaElement.addEventListener("click", () => {
                            cargarContenidoTarea(tarea, index);
                        });

                        tareasLista.appendChild(tareaElement);
                    });
                } else {
                    tareasLista.innerHTML = "<p>No hay tareas pendientes.</p>";
                }
            })
            .catch(() => {
                tareasLista.innerHTML = "<p>Error al cargar las tareas pendientes.</p>";
            });
    }

    function cargarContenidoTarea(tarea, index) {
        const tareaSeleccionada = tareasLista.children[index];
        Array.from(tareasLista.children).forEach((item) => {
            item.classList.remove("active");
        });
        tareaSeleccionada.classList.add("active");

        contenidoTarea.innerHTML = `
            <h3>${tarea.nombre}</h3>
            <p><strong>Día de entrega:</strong> ${tarea.entrega_dia}</p>
            <p><strong>Hora de entrega:</strong> ${tarea.entrega_hora}</p>
        `;
    }

    cargarTareasPendientes();
});
