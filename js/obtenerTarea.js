
  // Realiza una solicitud para obtener los datos del archivo PHP
  fetch('php/obtenertarea.php')
    .then(response => response.json())
    .then(data => {
     // Accede a los elementos HTML por su ID y asigna los datos obtenidos
      document.getElementById('titulo-tarea_h1').textContent = data.titulo;
      document.getElementById('nombredocente').textContent = "Nombre docente: " + data.nombre_docente;
      document.getElementById('fechaIni-fechafin').textContent = "Fecha de inicio - Fecha limite: " + data.fecha;
      document.getElementById('tarea-descripcion_p').textContent = "Descripción de la tarea: " + data.descripcion;
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });