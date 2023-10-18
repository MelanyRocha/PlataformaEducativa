
let btnRetirar = document.getElementById('botonRetirar');
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let mensajeSeleccion = document.getElementById("mensajeEliminacion");
let mensajeConfirmacion = document.getElementById("mensajeConfirmacion");
let materia;
btnRetirar.addEventListener('click', () => {
    //Obtener los elementos seleccionados, etiquetas html
    const checkedCheckboxes = [];
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox);
        }
    }

    //Si no se ha seleccionado ninguna materia muestra un mensaje y vuelve arriba de la página
    if(checkedCheckboxes.length === 0){
        mensajeSeleccion.style.display = "block";
        window.scrollTo({
            top: 0,
            left: 0
        });
    } else{
        mensajeSeleccion.style.display = "none";

        //Eliminar de la BD y Eliminar de la pantalla
        for (const checkbox of checkedCheckboxes) {
            materia = checkbox.value;

            $.ajax({
                url: "php/retirarMateria.php",
                type: "POST",
                data: { materia: materia},
                dataType: "json",
                success: function(response) {
                    console.log("conección a la bd exitosa");
                    $("#resultado").empty();
                    $("#resultado").append($("<p></p>").addClass("alert alert-success").text(response.mensaje));
                },
                error: function(error) {
                    alert(error.responseText);
                }
            });
            mensajeConfirmacion.style.display = "block";
            checkbox.parentNode.style.display = "none";
        }
    }
});