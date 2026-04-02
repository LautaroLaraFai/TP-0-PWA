// ============================================
// FUNCIONES GLOBALES
// ============================================

function cargarComponente(id, archivo) {
    fetch(archivo)
        .then(res => res.text())
        .then(data => {
            let elem = document.getElementById(id);
            if (elem) elem.innerHTML = data;
        })
        .catch(err => console.log("Error cargando", archivo, err));
}

function cerrarMenu() {
    let checkbox = document.getElementById('menuCheckbox');
    if (checkbox) checkbox.checked = false;
}

function generarEjercicios(nroModulo) {
    fetch('ejercicios.json')
        .then(res => res.json())
        .then(datos => {
            let modulo = datos.find(m => m.modulo === nroModulo);
            if (!modulo) {
                console.log("Módulo no encontrado");
                return;
            }
            
            let container = document.getElementById("ejercicio-practica-container");
            if (!container) {
                console.log("Contenedor no encontrado");
                return;
            }
            
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
        .catch(err => console.log("Error cargando ejercicios:", err));
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
        let mensaje = args.join(" ");
        outputElem.innerHTML += `<div class="consola-line success">> ${mensaje}</div>`;
        outputElem.scrollTop = outputElem.scrollHeight;
    };
    
    console.error = function(...args) {
        let mensaje = args.join(" ");
        outputElem.innerHTML += `<div class="consola-line error">> ${mensaje}</div>`;
        outputElem.scrollTop = outputElem.scrollHeight;
    };
    
    try {
        let funcion = new Function(codigo);
        funcion();
        outputElem.innerHTML += `<div class="consola-line info">> Ejecución completada</div>`;
    } catch(error) {
        outputElem.innerHTML += `<div class="consola-line error">> Error: ${error.message}</div>`;
    } finally {
        console.log = originalLog;
        console.error = originalError;
    }
}

function reiniciar(nroModulo, nroEjercicio) {
    fetch('ejercicios.json')
        .then(res => res.json())
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
        })
        .catch(err => console.log("Error al reiniciar:", err));
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    cargarComponente('header-placeholder', 'header.html');
    cargarComponente('footer-placeholder', 'footer.html');
    
    let params = new URLSearchParams(window.location.search);
    let modulo = parseInt(params.get("modulo"));
    
    generarEjercicios(modulo);
});


// ============================================
// EASTER EGG - CÓDIGO KONAMI hecho por IA
// ============================================



    // const KONAMI_CODE = ['ArrowUp', 'ArrowDown', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    // let konamiPosicion = 0;
    // let konamiSecuencia = [];
    // let timeoutId = null;

    // function mostrarMensajeEasterEgg(texto, esError = false) {
    //     let mensajeDiv = document.getElementById('konami-mensaje');
    //     if (!mensajeDiv) {
    //         mensajeDiv = document.createElement('div');
    //         mensajeDiv.id = 'konami-mensaje';
    //         mensajeDiv.style.position = 'fixed';
    //         mensajeDiv.style.bottom = '20px';
    //         mensajeDiv.style.right = '20px';
    //         mensajeDiv.style.backgroundColor = '#2d2d3a';
    //         mensajeDiv.style.color = '#89ca78';
    //         mensajeDiv.style.padding = '10px 15px';
    //         mensajeDiv.style.borderRadius = '8px';
    //         mensajeDiv.style.fontFamily = 'monospace';
    //         mensajeDiv.style.fontSize = '12px';
    //         mensajeDiv.style.zIndex = '9999';
    //         mensajeDiv.style.border = '1px solid #3d3d4a';
    //         mensajeDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    //         document.body.appendChild(mensajeDiv);
    //     }
        
    //     mensajeDiv.innerHTML = texto;
    //     mensajeDiv.style.color = esError ? '#f48771' : '#89ca78';
        
    //     setTimeout(() => {
    //         if (mensajeDiv) mensajeDiv.style.opacity = '0';
    //         setTimeout(() => {
    //             if (mensajeDiv) mensajeDiv.remove();
    //         }, 500);
    //     }, 5000);
    // }

    // function reiniciarSecuencia() {
    //     konamiPosicion = 0;
    //     konamiSecuencia = [];
    //     if (timeoutId) {
    //         clearTimeout(timeoutId);
    //         timeoutId = null;
    //     }
    // }

    // function iniciarTimeout() {
    //     if (timeoutId) clearTimeout(timeoutId);
    //     timeoutId = setTimeout(() => {
    //         if (konamiPosicion > 0) {
    //             reiniciarSecuencia();
    //         }
    //     }, 5000);
    // }

    // document.addEventListener('keydown', function(e) {
    //     if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    //         e.preventDefault();
    //     }
        
    //     let tecla = e.code;
        
    //     if (tecla === KONAMI_CODE[konamiPosicion]) {
    //         konamiSecuencia.push(tecla);
    //         konamiPosicion++;
            
    //         if (konamiPosicion === KONAMI_CODE.length) {
    //             if (timeoutId) clearTimeout(timeoutId);
    //             mostrarMensajeEasterEgg('¡CÓDIGO SECRETO!');
    //             setTimeout(() => {
    //                 window.location.href = 'doom.html';
    //             }, 500);
    //         } else {
    //             iniciarTimeout();
    //         }
    //     } else if (tecla !== 'ShiftLeft' && tecla !== 'ShiftRight' && tecla !== 'ControlLeft' && tecla !== 'ControlRight') {        
    //         reiniciarSecuencia();
    //     }
    // });