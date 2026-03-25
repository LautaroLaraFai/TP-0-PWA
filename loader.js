// Este archivo se encarga de cargar el header y el footer en cualquier página

function cargarComponente(id, archivo) {
    fetch(archivo)
        .then(function(respuesta) {
            return respuesta.text();
        })
        .then(function(datos) {
            document.getElementById(id).innerHTML = datos;
        })
        .catch(function(error) {
            console.log('Error al cargar ' + archivo + ': ' + error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    cargarComponente('header-placeholder', 'header.html');
});
document.addEventListener('DOMContentLoaded', function() {
    cargarComponente('footer-placeholder', 'footer.html');
});

function cerrarMenu() {
    document.getElementById('menuCheckbox').checked = false;
}