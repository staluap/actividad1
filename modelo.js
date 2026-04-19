/* ACTIVIDAD NF3
Desarrollo Web en Entorno Cliente - iFP 2025/2026
Paula Serrano Torrecillas */


/* VARIABLES ______________________________________________________________________*/

// Creamos un array vacío que almacenará todos los cursos según se introduzcan
const cursosArray = [];
// Creamos una variable que cuente el total de cursos en el array
let numCursosArray = cursosArray.length;

/* FUNCIONES ______________________________________________________________________*/

// Esta función servirá para añadir objetos en el array y refrescar el valor de la longitud del array
function nuevoCurso (codigo, nombre) {
    // El método de arrays push() añade un nuevo elemento pero también devuelve la longitud del array
    numCursosArray = cursosArray.push({codigo: codigo, nombre: nombre});
}


// Esta función busca en el array el primer objeto que contenga el código
// Esta función será necesaria para asegurar que cada código en el array sea único
function buscarCurso (codigo) {
    // Utilizamos find() para encontrar un objeto que tenga ese código
    let curso = cursosArray.find(curso => curso.codigo === codigo);
    // Si encuentra coincidencia devuelve el objeto
    if (curso) {
        return curso;
    // Si no, devuelve 'false'
    } else {
        return false;
    }
}

// Función que elimina al <p> comañero de un button dentro del mismo <div> del array
function removeCursoArray(btn) {

  // Subimos al padre de los botones, y a su vez al padre de todo el item y guardamos la referencia de ese div
  let div = btn.parentElement.parentElement;
  // Conseguimos el <p> hijo y su texto interno
  let string = div.querySelector("p").innerText;
  // Utilizamos el método string slice() para tomar el código, que siempre estará en la misma posición con el mismo tamaño
  let codigo = string.slice(8,17);
  // Usando el código buscamos la posición del curso
  let posicion = cursosArray.findIndex(curso => curso.codigo == codigo);
  // Usamos el método para arrays splice() de forma que elimine sin dejar huecos en blanco en el array
  // Indicamos la posición de partida a través de la variable posición, e indicamos que sólo elimine un elemento
  cursosArray.splice(posicion, 1);
  // Actualizamos el contador del array
  numCursosArray = cursosArray.length;
  // Eliminamos de la lista también
  removeCursoLista(btn);
  // Actualizamos el contador de cursos mostrados
  numItemsLista = listArray.length;
  // Actualizamos la vista del contador
  actualizarContador();
}