
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function loadTasks() {
    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Define the callback function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
            let taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear existing tasks

            let data = JSON.parse(xhr.responseText);

            data.forEach(function(task) {
                let listItem = document.createElement('div');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = '<p><strong>Nombre:</strong> ' + task.nombre + '</p>' +
                    '<p><strong>Entrega Día:</strong> ' + task.entrega_dia + '</p>' +
                    '<p><strong>Entrega Hora:</strong> ' + task.entrega_hora + '</p>';
                taskList.appendChild(listItem);
            });
        } else {
            console.error('Error fetching tasks:', xhr.statusText);
        }
    };

    // Configure the request
    xhr.open('GET', 'mostrar_tareas.php', true);

    // Send the request
    xhr.send();
}
