function cerrarMenu() {
    let checkbox = document.getElementById('menuCheckbox');
    if (checkbox) checkbox.checked = false;
}

function cargarComponente(id, archivo) {
    fetch(archivo)
        .then(respuesta => respuesta.text())
        .then(datos => {
            let elemento = document.getElementById(id);
            if (elemento) elemento.innerHTML = datos;
        })
        .catch(error => console.log('Error al cargar ' + archivo + ': ' + error));
}


function ejecutar(nroModulo, nroEjercicio) {
    let idTextarea = `codigo-mod${nroModulo}-ej${nroEjercicio}`;
    let idConsola = `consola-mod${nroModulo}-ej${nroEjercicio}`;
    
    let codigo = document.getElementById(idTextarea).value;
    let consolaElem = document.getElementById(idConsola);
    
    if (!consolaElem) return;
    
    let outputElem = consolaElem.querySelector(".consola-output");
    
    if (codigo.trim() === "") {
        outputElem.innerHTML = '<div class="consola-line error">> No hay código para ejecutar</div>';
        return;
    }
    
    outputElem.innerHTML = "";
    

    let originalLog = console.log;
    let originalError = console.error;
    

    console.log = function(...args) {
        outputElem.innerHTML += `<div class="consola-line success">> ${args.join(" ")}</div>`;
        outputElem.scrollTop = outputElem.scrollHeight;
    };
    
    console.error = function(...args) {
        outputElem.innerHTML += `<div class="consola-line error">> ${args.join(" ")}</div>`;
        outputElem.scrollTop = outputElem.scrollHeight;
    };
    
    try {
        new Function(codigo)();
    } catch(error) {
        outputElem.innerHTML += `<div class="consola-line error">> Error: ${error.message}</div>`;
    } finally {
    
        console.log = originalLog;
        console.error = originalError;
    }
}

function reiniciar(nroModulo, nroEjercicio) {
    fetch('ejercicios.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            let modulo = datos.find(m => m.modulo === nroModulo);
            if (!modulo) return;
            
            let ejercicio = modulo.ejercicios.find(ej => ej.numero === nroEjercicio);
            if (!ejercicio) return;
            
            let idTextarea = `codigo-mod${nroModulo}-ej${nroEjercicio}`;
            let textarea = document.getElementById(idTextarea);
            if (textarea) textarea.value = ejercicio.codigoInicial;
            
            let idConsola = `consola-mod${nroModulo}-ej${nroEjercicio}`;
            let consolaElem = document.getElementById(idConsola);
            if (consolaElem) {
                let outputElem = consolaElem.querySelector(".consola-output");
                outputElem.innerHTML = '<div class="consola-line info">> Código restaurado</div>';
            }
        });
}

function generarEjercicios(nroModulo) {
    fetch('ejercicios.json')
        .then(respuesta => respuesta.json())
        .then(datos => {
            let modulo = datos.find(m => m.modulo === nroModulo);
            if (!modulo) {
                console.log("Módulo no encontrado");
                return;
            }
            
            let container = document.getElementById("ejercicio-practica-container");
            if (!container) return;
            
            container.innerHTML = "";
            
            modulo.ejercicios.forEach(ej => {
                container.innerHTML += `
                    <div class="ejercicio">
                        <h3>Ejercicio ${ej.numero}: ${ej.titulo}</h3>
                        <div class="instruccion">${ej.instruccion}</div>
                        <textarea id="codigo-mod${nroModulo}-ej${ej.numero}" rows="8">${ej.codigoInicial}</textarea>
                        <button onclick="ejecutar(${nroModulo}, ${ej.numero})">Ejecutar</button>
                        <button onclick="reiniciar(${nroModulo}, ${ej.numero})">Reiniciar</button>
                        <div id="consola-mod${nroModulo}-ej${ej.numero}" class="consola">
                            <div class="consola-header">Consola</div>
                            <div class="consola-output"></div>
                        </div>
                        <div class="pregunta">${ej.pregunta}</div>
                    </div>
                `;
            });
        })
        .catch(error => console.log("Error al cargar ejercicios: " + error));
}

document.addEventListener('DOMContentLoaded', function() {
    cargarComponente('header-placeholder', 'header.html');
    cargarComponente('footer-placeholder', 'footer.html');
    
    let params = new URLSearchParams(window.location.search);
    let modulo = parseInt(params.get("modulo"));
    generarEjercicios(modulo);
});