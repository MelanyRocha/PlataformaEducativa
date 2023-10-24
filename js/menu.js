// Mostrar/Ocultar la caja Bookshelf
const icon = document.getElementById("menu-icon");
const caja = document.getElementById("menu");

//Mostrar
icon.onclick = () => {
    caja.classList.toggle("hide-menu");
};

//Ocultar
window.addEventListener("click", (e) => {
    if (
        !caja.classList.contains("hide-menu") &&
        e.target != caja &&
        e.target != icon
    ) {
        caja.classList.toggle("hide-menu");
    }
});
