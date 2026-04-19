/* ACTIVIDAD NF3
Desarrollo Web en Entorno Cliente - iFP 2025/2026
Paula Serrano Torrecillas */

/* VARIABLES DEL DOM _________________________________________________________________*/

// Casilla de formulario para el código
const code = document.getElementById("code");

// Casilla de formulario para el nobre del curso
const curso = document.getElementById("curso");

// Array variable con los input del formulario
let huecos = document.querySelectorAll(".hueco");

// Botón "Enviar" del formulario
const btForm = document.getElementById("btForm");

// Botón para añadir un curso con código
const btAdd = document.getElementById("add");

// Botón para eliminar todos los cursos
const btRemove = document.getElementById("remove");

// Botón para listar todos los cursos
const btList = document.getElementById("list");

// Contenedor donde se escriben los cursos
const listado = document.getElementById("listado");

// Elementos <p> del contenedor. Usamos getElementsByTagName para facilitar la actualización automática y sea una HTMLCollection 'viva'
const listArray = listado.getElementsByTagName("p");

// Creamos una variable que contará los elementos que se incluyen a la lista
let numItemsLista = listArray.length;



/* FUNCIONES VISTA____________________________________________________________________*/
// Función que permite hacer un mensaje con feedback visible (para el envío de folmularios)
function formMSN (mensaje) {
    // Introducimos una variable que capta el elemento <p> que contendrá el mensaje
    const formMSN = document.getElementById("formMSN");
    // Introducimos en el elemento <p> el mensaje que introduzcamos como variable por parámetro de la función
    formMSN.innerText = mensaje;
    // Hacemos visible el elemento en su CSS
    formMSN.style.display = "block";
    // Si el mensaje empieza con "ERROR" el color de texto debe ser rojo
    if (mensaje.startsWith("ERROR")) {
        formMSN.style.color = "rgb(216, 57, 57)";
    // Si no, será feedback positivo y será verde
    } else {
        formMSN.style.color = "rgb(15, 170, 1)";
        setTimeout(() => {
            formMSN.style.display = "none";
        }, 1500);
    }
}

// Función que simplifica la ejecución de la línea que reescribe el contador
function actualizarContador() {
    document.getElementById("contador").innerText = `${numItemsLista} cursos mostrados de ${numCursosArray} cursos en total`;
}

// Función para vaciar el formulario
function vaciarForm() {
    code.value = "";
    curso.value = "";
}

// Función para crear un elemento en lista
function crearItem(curso) {
    // Creamos un nuevo elemento <div> para meter el <p> y su <button> que lo elimine
    const div = document.createElement("div");
    // clase del div
    div.className = "item";
    // incluímos el div dentro del div del listado
    listado.appendChild(div);

    // Creamos un nuevo elemento <p>
    const item = document.createElement("p");
    // Con el siguiente contenido
    item.innerText = `Código: ${curso.codigo}, Nombre del curso: ${curso.nombre}`;
    // Y lo incluimos como hijo del <div> con clase item
    div.appendChild(item);

    // Creamos un div para los botones (por cuestiones del CSS)
    const divBtns = document.createElement("div");
    // incluímos el div dentro del div del listado
    div.appendChild(divBtns);

    // Creamos un nuevo elemento <button>
    const btn1 = document.createElement("button");
    // clase del botón
    btn1.className = "eliminarItem";
    // Contenido textual del botón
    btn1.innerHTML = "<i class='far fa-folder-open'></i>";
    // btn2.innerHTML = "&#128465;";
    // Y lo incluimos como hijo del <div> con clase item
    divBtns.appendChild(btn1);

    // Creamos un segundo elemento <button>
    const btn2 = document.createElement("button");
    // clase del botón
    btn2.className = "eliminarItem";
    // Contenido textual del botón
    btn2.innerHTML = "<i class='fas fa-eraser'></i>";
    // Y lo incluimos como hijo del <div> con clase item
    divBtns.appendChild(btn2);

    // Para que los botones creados dinámicamente no pierda su función la incluimos durante la creación
    // Al hacer click acciona el evento de borrar el curso de la LISTA
    btn1.addEventListener("click", () => removeCursoLista(btn1));
    // Al hacer click acciona el evento de borrar el curso del ARRAY
    btn2.addEventListener("click", () => removeCursoArray(btn2));

    // Actualizamos el contador de cursos mostrados
    numItemsLista = listArray.length;
    // Actualizamos la vista del contador
    actualizarContador();
}


/* PROCESAMIENTO ____________________________________________________________________*/

// Escribimos por primera vez el contador
actualizarContador();

// Por cada hueco en el array de huecos indicamos que se le asigne dos acciones
// Elegimos este método porque facilita la aplicación automática a huecos nuevos si se requiriese añadir nuevos
huecos.forEach(function (hueco){
    // Cambio de fondo al estar en foco (focus)
    hueco.addEventListener("focus", function() {
        hueco.style.backgroundColor = "rgb(158, 202, 219)";
    })
    // Cambio al fondo original al quitar foco (blur)
    hueco.addEventListener("blur", function() {
        hueco.style.backgroundColor = "white";
    })
});

// Indicamos que el texto del hueco código, su valor pase a mayúsculas automáticamente cada vez que el input sea modificado (input)
code.addEventListener("input", function() {
    code.value = code.value.toUpperCase();
});


