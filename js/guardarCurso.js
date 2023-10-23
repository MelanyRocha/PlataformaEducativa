document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón "Crear clase" por su clase
    var crearClaseButton = document.querySelector('.btn-crear');

    // Agrega un controlador de eventos para el evento 'click'
    crearClaseButton.addEventListener('click', function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario (envío)

        // Obtener los valores de los campos de texto
        var materia = document.getElementById("Materia").value;
        var fechainicio = document.getElementById("fecha_inicio").value;
        var fechafin = document.getElementById("fecha_fin").value;


        // Enviar una petición al servidor con los datos de la materia
        $.ajax({
            url: "php/guardarCurso.php",
            type: "POST",
            data: { materia: materia, fechainicio: fechainicio, fechafin: fechafin},
            dataType: "json",
            success: function(response) {
                // Si se recibió una respuesta exitosa
                console.log("si funciona");
                // Vaciar el div del resultado
                $("#resultado").empty();
                // Mostrar un mensaje de éxito con un elemento párrafo y una clase de Bootstrap
                $("#resultado").append($("<p></p>").addClass("alert alert-success").text(response.mensaje));
            },
            error: function(error) {
                // Si se recibió un error
                // Mostrar un mensaje de alerta
                alert(error.responseText);
            }
        });
    });
});