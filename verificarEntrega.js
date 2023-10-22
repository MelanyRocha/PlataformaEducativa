$(document).ready(function () {
    comprobarEntrega();

    function comprobarEntrega() {
        // Realiza una solicitud AJAX para verificar el estado de entrega
        const idEstudiante = 1; // Reemplaza con el ID del estudiante actual
        const idTarea = 1; // Reemplaza con el ID de la tarea actual

        $.ajax({
            url: 'verificarEntrega.php',
            method: 'GET',
            data: {idEstudiante, idTarea},
            dataType: 'json',
            success: function (respuesta) {
                const entregaInfo = $('#entrega-info');
                const listaArchivos = $('#lista-archivos');
                const editarButton = $('#editar-tarea-button');
                const entregarButton = $('#entregar-tarea-button');

                if (respuesta.status === 'no_editable' ) {
                    entregaInfo.html('La tarea no es editable.');
                    listaArchivos.empty();
                    obtenerNombresArchivos(idEstudiante, idTarea);
                    entregarButton.hide();
                    editarButton.hide();
                }  else if (respuesta.status === 'no_entregada') {
                    entregaInfo.html('La tarea no ha sido entregada.');
                    listaArchivos.empty();
                    entregarButton.show();
                    editarButton.hide();
                } else if (respuesta.status === 'entregada') {
                    entregaInfo.html('Los siguientes archivos fueron entregados ');
                    listaArchivos.empty();
                    entregarButton.hide();
                    obtenerNombresArchivos(idEstudiante, idTarea);
                    editarButton.show();
                } else {
                    console.error('Error en la solicitud AJAX: ' + respuesta.message);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error en la solicitud AJAX: ' + error);
            }
        });
    }


    function obtenerNombresArchivos(idEstudiante, idTarea) {
        // ... (tu código para obtener nombres de archivos)

        $.ajax({
            url: 'obtenerArchivosEntregados.php',
            method: 'GET',
            data: {idEstudiante, idTarea},
            dataType: 'json',
            success: function (archivosEntregados) {
                if (archivosEntregados.length > 0) {
                    const listaNombres = archivosEntregados.split(','); // Divide la cadena en una lista
                    listaNombres.forEach(function (nombre) {
                        agregarNombreArchivo(nombre);
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener nombres de archivos: ' + error);
            }
        });
    }

    function agregarNombreArchivo(nombre) {
        // Crea un elemento li con el nombre y un botón para eliminar
        const li = $("<li></li>");
        li.html('<span>' + nombre + '</span> <button>X</button>');
        // Añade un evento de clic al botón para eliminar el archivo
        li.children("button").click(eliminar);
        // Añade el elemento li a la lista de archivos
        const listaArchivos = $('#lista-archivos');
        listaArchivos.append(li);
    }

    function eliminar(event) {
        // Obtener el elemento li que contiene el botón
        let li = $(event.target).parent();
        // Obtener el nombre del archivo a eliminar
        let nombre = li.children("span").text();
        // Eliminar el nombre del archivo del array global
        archivos = archivos.filter(a => a !== nombre);
        // Eliminar el elemento li de la lista de archivos
        li.remove(); // Corregido aquí
    }
});
