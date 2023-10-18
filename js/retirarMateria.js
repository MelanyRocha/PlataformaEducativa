
let btnRetirar = document.getElementById('botonRetirar');
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let materia;
btnRetirar.addEventListener('click', () => {
    //Obtener los elementos seleccionados, etiquetas html
    const checkedCheckboxes = [];
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox);
        }
    }

/*    //Obtener los valores de los elementos seleccionados
    const checkedCheckboxValues = [];
    for (const checkbox of checkedCheckboxes) {
        checkedCheckboxValues.push(checkbox.value);
    }*/

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

        checkbox.parentNode.style.display = "none";
    }
});