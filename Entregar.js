// Variable global que almacena los nombres de los archivos
let archivos = [];

// Versión mejorada con jQuery
function agregar(input) {
    // Obtener el nombre del archivo seleccionado
    let archivo = input.files[0];
    if (archivo) {
        let nombre = archivo.name;
        // Añadir el nombre del archivo al array global
        archivos.push(nombre);
        // Crear un elemento li con el nombre y un botón para eliminar
        let li = $("<li></li>");
        li.html('<span>' + nombre + '</span> <button>X</button>');
        // Añadir un evento de clic al botón para eliminar el archivo
        li.children("button").click(eliminar);
        // Añadir el elemento li a la lista de archivos
        let lista = $("#lista-archivos");
        lista.append(li);
    }
    // Limpiar el input para poder seleccionar otro archivo
    input.value = "";
}

// Función para eliminar un archivo de la lista
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

// Función para cancelar la entrega
function cancelar() {
    // Eliminar todos los elementos li de la lista de archivos
    let lista = $("#lista-archivos");
    lista.empty();
    // Vaciar el array global de archivos
    archivos = [];
}

// Función para enviar la entrega al servidor
function entregar() {
    // Crear un formulario para enviar los archivos al servidor
    let formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
        formData.append('archivo[]', archivos[i]);
    }

    // Realizar una solicitud AJAX para enviar los archivos al servidor
    $.ajax({
        url: "entregar.php",
        type: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function(response) {
            // Si se recibió una respuesta exitosa
            alert("Has enviado los siguientes archivos: " + archivos.join(", "));
            // Ocultar los botones de entregar y cancelar
            $('#entregar').hide();
            $('#adjuntos').prop('disabled', true);
            // Mostrar el botón de editar
            $('#editar').show();
            location.reload ()
        },
        error: function(error) {
            // Si se recibió un error
            alert("Hubo un error al enviar los archivos.");
        }
    });
}
// Funcion para editar la entrega al servidor
function editarTarea() {
    // Crear un formulario para enviar los archivos al servidor
    let formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
        formData.append('archivo[]', archivos[i]);
    }

    // Realizar una solicitud AJAX para enviar los archivos al servidor
    $.ajax({
        url: "editar.php",
        type: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function(response) {
            // Si se recibió una respuesta exitosa
            alert("Has editado los siguientes archivos: " + archivos.join(", "));
            // Ocultar los botones de entregar y cancelar
            $('#entregar').hide();
            $('#adjuntos').prop('disabled', true);
            // Mostrar el botón de editar
            $('#editar').show();
            location.reload ()
        },
        error: function(error) {
            // Si se recibió un error
            alert("Hubo un error al editar los archivos.");
        }
    });
}
