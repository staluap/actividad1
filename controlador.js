/* ACTIVIDAD NF3
Desarrollo Web en Entorno Cliente - iFP 2025/2026
Paula Serrano Torrecillas */

/* VARIABLES _______________________________________________________________________ */

// Variables que guardan el patrón RegEx que deben seguir los valores del formulario
  patronCodigo = /^[A-Z]{3}\d{3}\/\d{2}$/;
  patronNombre = /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑa-záéíóúüñ\s]{4,99}$/;

/* FUNCIONES ______________________________________________________________________*/

// Función que gestiona el envío del formulario con los dos valores del formulario
function enviarForm (codigo, nombre)  {
  // Si el código cumple la RegEx
  if (codigo.match(patronCodigo)) {
    // Comprobamos si el código ya está en uso en el array
    let cursoExiste = buscarCurso(codigo);
    // Si no existe ningún objeto con ese código
    if (!cursoExiste)  {
      // Comprobamos que el nombre del curso está bien escrito
      if (nombre.match(patronNombre)) {
        // Si todo está bien creamos el nuevo curso en el array
        nuevoCurso(codigo, nombre);
        // Reescribimos el número de cursos que aparece en la vista del contador
        actualizarContador();
        // Vaciamos los campos del formulario
        vaciarForm();
        // Mostramos feedback de que ha funcionado correctamente el envío
        formMSN("El curso ha sido incluido en la base de datos con éxito");
      } else {
        // Mostramos error si el formato del nombre del curso no es válido
        formMSN("ERROR: El nombre del curso debe ser sólo texto y espacios, ocupar entre 5 y 100 caracteres, y tener la primera letra en mayúscula");
      }
    } else {
      // Mostramos error si el código del curso ya existe en otro objeto del array
      formMSN("ERROR: El código ya existe en la base de datos");
    }
  } else {
    // Mostramos error si el formato del código no es válido
    formMSN("ERROR: El código debe ser de 9 caracteres, con 3 letras, 3 números, el símbolo \"/\" y 2 números que indiquen el año");
  }
}

// Función que revisa si un curso ya está impreso a través de su código. Devuelve true si está impreso y false si no.
function buscarLista (codigo) {
  // Generamos un string para comparar el inicio de línea
  string = `Código: ${codigo}`;
  // Por defecto devolverá false a no ser que detecte una coincidencia
  coincidencia = false;
  // Generamos un bucle que recorra posición a posición la colección de <p> del listado hasta encontrar una coincidencia
  for (let i = 0; i < listArray.length && coincidencia==false; i++) {
    // Actualizamos a true o false el valor de la coincidencia según si la comparación del string con el inicio del contenido del <p> es true o false
    coincidencia = listArray[i].innerText.startsWith(string);
  }
  // Devolvemos el valor de la coincidencia, que será true o false
  return coincidencia;
}

// Función que imprime todos los cursos, sin volver a imprimir los que ya están impresos
function listCursos() {
  // Por cada curso en el array...
  cursosArray.forEach(function(curso){
    // Si no hay ya impreso un curso con ese código
    if (!buscarLista(curso.codigo)) {
      crearItem(curso);
    }
  })
}

//Función que elimina todos los cursos del listado
function removeListado() {
    // Si el listado tiene algún nodo hijo (serán divs)
    if (listado.hasChildNodes()) {
        // Mientras el listado tenga nodos hijos
        while (listado.hasChildNodes) {
            // Eliminamos el primer hijo que haya en el listado
            listado.removeChild(listado.firstChild);
            // Actualizamos el contador de cursos mostrados
            numItemsLista = listArray.length;
            // Actualizamos la vista del contador
            actualizarContador();
        }
    }
}

// Función que añade un curso si no está en el listado usando el área código del formulario
function addCurso(codigo) {
  // Si el código cumple la RegEx
  if (codigo.match(patronCodigo)) {
    // Comprobamos si el código ya existe en uso en el array de cursos
    let curso = buscarCurso(codigo);
    // Si existe el curso en el array
    if (curso) {
      // Comprobamos que no se haya mostrado ya en lista
      if (!buscarLista(curso.codigo)) {
        // Creamos el curso en la lista
        crearItem(curso);
        // Vaciamos los campos del formulario
        vaciarForm();
        // Mostramos feedback de que ha funcionado correctamente la adición
        formMSN("El curso ha sido añadido a la lista");
      } else {
        // Mostramos error si intentamos mostrar un curso que NO existe
        formMSN("ERROR: El curso ya se encuentra añadido en la lista");
      }
    } else {
      // Mostramos error si intentamos mostrar un curso que NO existe
      formMSN("ERROR: El código introducido no corresponde con ningún curso que exista en la base de datos");
    }
  } else {
    // Mostramos error si el formato del código no es válido
    formMSN("ERROR: El código debe ser de 9 caracteres, con 3 letras, 3 números, el símbolo \"/\" y 2 números que indiquen el año");
  }
}

// Función que elimina al <p> comañero de un button dentro del mismo <div> del listado
function removeCursoLista(btn) {
  // Subimos al padre del botón, que es el div de esa botonera, y subimos al padre que es el div del item, y guardamos la referencia de ese div
  let div = btn.parentElement.parentElement;
  // Eliminamos el div con sus hijos, eliminando así el item
  div.remove();
  // Actualizamos el contador de cursos mostrados
  numItemsLista = listArray.length;
  // Actualizamos la vista del contador
  actualizarContador();
}


/* PROCESAMIENTO __________________________________________________________________ */

// Evento accionable al hacer click sobre el botón "Enviar" del formulario
btForm.addEventListener("click", function(e) {
  // Evita la recarga de página
  e.preventDefault();
  // Ejecuta la función creada para el envío del formulario con los valores que contegan los huecos del formulario
  enviarForm(code.value, curso.value);
});

// Evento accionable al hacer click sobre el botón "Listar todos los cursos"
btList.addEventListener("click", listCursos);

// Evento accionable al hacer click sobre el botón "Quitar todos los cursos"
btRemove.addEventListener("click", removeListado);

// Evento accionable al hacer click sobre el botón "Añadir curso con código"
btAdd.addEventListener("click", () => addCurso(code.value));











