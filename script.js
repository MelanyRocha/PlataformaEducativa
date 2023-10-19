document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentTextArea = document.getElementById('comment');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const commentText = commentTextArea.value;
        if (commentText.trim() === '') {
            alert('El comentario no puede estar vacío.');
            return;
        }

        // Envía el comentario al servidor (PHP) a través de una solicitud AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'comentarios.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // Recarga la lista de comentarios después de agregar uno
                loadComments();
            }
        };
        xhr.send('comment=' + encodeURIComponent(commentText));
        commentTextArea.value = '';
    });

    // Función para cargar los comentarios desde el servidor
    function loadComments() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'comentarios.php', true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                commentsList.innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    }

    // Carga los comentarios al cargar la página
    loadComments();
});
