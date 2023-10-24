document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('comment-form');
    const commentTextArea = document.getElementById('comment');
    const commentsList = document.getElementById('comments-list');

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const commentText = commentTextArea.value;
        if (commentText.trim() === '') {
            alert('El comentario no puede estar vacío.');
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'comentarioDocente.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                loadComments();
            }
        };
        xhr.send('comment=' + encodeURIComponent(commentText));
        commentTextArea.value = '';
    });

    function loadComments() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'php/comentarioDocente.php', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                commentsList.innerHTML = xhr.responseText;
            }
        };
        xhr.send();
    }

    loadComments();
});

