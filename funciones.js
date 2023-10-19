$(document).ready(function () {
    $.get("tasks.php", function (data) {
        var taskList = JSON.parse(data);

        for (var i = 0; i < taskList.length; i++) {
            var task = taskList[i];
            $("#task-list").append(
                '<li class="list-group-item">' +
                'Nombre: ' + task.nombre + '<br>' +
                'Entrega día: ' + task.entrega_dia + '<br>' +
                'Hora: ' + task.entrega_hora +
                '</li>'
            );
        }
    });
});

