document.addEventListener("DOMContentLoaded", function () {
    const contenido = document.getElementById("contenido");
    const url = new URL(window.location.href);
    const materia = url.searchParams.get("materia");
    contenido.textContent = "Contenido de " + materia;
});