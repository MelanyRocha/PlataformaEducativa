// Función para agregar un nuevo archivo a la lista
  function agregar(input) {
    // Obtener el nombre del archivo seleccionado
    let nombre = input.files[0].name;
    // Crear un elemento li con el nombre y un botón para eliminar
    let li = document.createElement("li");
    li.innerHTML = '<span>' + nombre + '</span> <button onclick="eliminar(this)">X</button>';
    // Añadir el elemento li a la lista de archivos
    let lista = document.getElementById("lista-archivos");
    lista.appendChild(li);
    // Limpiar el input para poder seleccionar otro archivo
    input.value = "";
  }

  // Función para eliminar un archivo de la lista
  function eliminar(boton) {
    // Obtener el elemento li que contiene el botón
    let li = boton.parentElement;
    // Eliminar el elemento li de la lista de archivos
    let lista = document.getElementById("lista-archivos");
    lista.removeChild(li);
  }

  // Función para cancelar la entrega
  function cancelar() {
    // Eliminar todos los elementos li de la lista de archivos
    let lista = document.getElementById("lista-archivos");
    lista.innerHTML = "";
  }

  // Función para enviar la entrega
  function entregar() {
    // Obtener los nombres de los archivos adjuntos
    let archivos = [];
    let lista = document.getElementById("lista-archivos");
    for (let li of lista.children) {
      let nombre = li.children[0].textContent;
      archivos.push(nombre);
    }
    // Mostrar un mensaje con los archivos enviados
    alert("Has enviado los siguientes archivos: " + archivos.join(", "));
  }