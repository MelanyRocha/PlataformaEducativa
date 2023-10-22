// Variable global para almacenar nombres de archivos
let archivos = [];

// Agregar archivo a la lista
function agregar(input) {
    let archivo = input.files[0];
    if (archivo) {
        let nombre = archivo.name;
        archivos.push(nombre);
        let li = $("<li></li>");
        li.html('<span>' + nombre + '</span> <button>X</button>');
        li.children("button").click(eliminar);
        $("#lista-archivos").append(li);
    }
    input.value = "";
}

// Eliminar un archivo de la lista
function eliminar(event) {
    let li = $(event.target).parent();
    let nombre = li.children("span").text();
    archivos = archivos.filter(a => a !== nombre);
    li.remove();
}

// Cancelar la entrega
function cancelar() {
    $("#lista-archivos").empty();
    archivos = [];
}

// Enviar la entrega al servidor
function entregar() {
    let formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
        formData.append('archivo[]', archivos[i]);
    }

    $.ajax({
        url: "php/entregar.php",
        type: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("Archivos enviados: " + archivos.join(", "));
            $('#entregar').hide();
            $('#adjuntos').prop('disabled', true);
            $('#editar-tarea-button').show();
            location.reload();
        },
        error: function (error) {
            alert("Error al enviar archivos.");
        }
    });
}

// Editar la entrega al servidor
function editarTarea() {
    let formData = new FormData();
    for (let i = 0; i < archivos.length; i++) {
        formData.append('archivo[]', archivos[i]);
    }

    $.ajax({
        url: "php/editar.php",
        type: "POST",
        data: formData,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("Archivos editados: " + archivos.join(", "));
            $('#entregar').hide();
            $('#adjuntos').prop('disabled', true);
            $('#editar-tarea-button').show();
            location.reload();
        },
        error: function (error) {
            alert("Error al editar archivos.");
        }
    });
}
