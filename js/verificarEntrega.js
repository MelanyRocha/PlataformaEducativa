$(document).ready(function () {
    comprobarEntrega();

    // Función para comprobar el estado de entrega de la tarea
    function comprobarEntrega() {
        const idEstudiante = 1; // Reemplaza con el ID del estudiante actual
        const idTarea = 1; // Reemplaza con el ID de la tarea actual

        $.ajax({
            url: 'php/verificarEntrega.php',
            method: 'GET',
            data: {idEstudiante, idTarea},
            dataType: 'json',
            success: function (respuesta) {
                const entregaInfo = $('#entrega-info');
                const listaArchivos = $('#lista-archivos');
                const editarButton = $('#editar-tarea-button');
                const entregarButton = $('#entregar-tarea-button');

                switch (respuesta.status) {
                    case 'no_editable':
                        entregaInfo.html('La tarea no es editable.');
                        listaArchivos.empty();
                        obtenerNombresArchivos(idEstudiante, idTarea);
                        entregarButton.hide();
                        editarButton.hide();
                        break;
                    case 'no_entregada':
                        entregaInfo.html('La tarea no ha sido entregada.');
                        listaArchivos.empty();
                        entregarButton.show();
                        editarButton.hide();
                        break;
                    case 'entregada':
                        entregaInfo.html('Los siguientes archivos fueron entregados');
                        listaArchivos.empty();
                        entregarButton.hide();
                        obtenerNombresArchivos(idEstudiante, idTarea);
                        editarButton.show();
                        break;
                    default:
                        console.error('Error en la solicitud AJAX: ' + respuesta.message);
                        break;
                }
            },
            error: function (xhr, status, error) {
                console.error('Error en la solicitud AJAX: ' + error);
            }
        });
    }

    // Función para obtener nombres de archivos entregados
    function obtenerNombresArchivos(idEstudiante, idTarea) {
        $.ajax({
            url: 'php/obtenerArchivosEntregados.php',
            method: 'GET',
            data: {idEstudiante, idTarea},
            dataType: 'json',
            success: function (archivosEntregados) {
                if (archivosEntregados.length > 0) {
                    const listaNombres = archivosEntregados.split(','); // Divide la cadena en una lista
                    listaNombres.forEach(agregarNombreArchivo);
                }
            },
            error: function (xhr, status, error) {
                console.error('Error al obtener nombres de archivos: ' + error);
            }
        });
    }

    // Función para agregar el nombre de un archivo a la lista
    function agregarNombreArchivo(nombre) {
        const li = $("<li></li>");
        li.html('<span>' + nombre + '</span> <button>X</button>');
        li.children("button").click(eliminar);
        $('#lista-archivos').append(li);
    }

    // Función para eliminar un archivo de la lista
    function eliminar(event) {
        const li = $(event.target).parent();
        const nombre = li.children("span").text();
        archivos = archivos.filter(a => a !== nombre);
        li.remove();
    }
});
