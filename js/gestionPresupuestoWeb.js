//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html


//Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
function mostrarDatoEnId (idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro:
function mostrarGastoWeb (idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    
}

function mostrarGastosAgrupadosWeb (idElemento, agrup, periodo) {

}


export{
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}