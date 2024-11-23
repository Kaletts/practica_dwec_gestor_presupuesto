//Este fichero contendrá las utilidades necesarias para mostrar los datos de la aplicación en la página interaccionHTML.html


//Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro:
function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);

    //Estructura HTML - Creacion de elementos
    let div = document.createElement("div");
    let divDescripcion = document.createElement("div");
    let divFecha = document.createElement("div");
    let divValor = document.createElement("div");
    let divEtiquetas = document.createElement("div");

    //Clases para los elementos
    div.className = "gasto"
    divDescripcion.className = "gasto-descripcion"
    divFecha.className = "gasto-fecha"
    divValor.className = "gasto-valor"
    divEtiquetas.className = "gasto-etiquetas"

    //Carga de datos sobre los elementos
    divDescripcion.innerText = `${gasto.descripcion}`
    divFecha.innerText = `${gasto.fecha}`
    divValor.innerText = `${gasto.valor}`
    //Para las etiquetas es necesario hacer un for of para pasar por todas
    for (const etiqueta of gasto.etiquetas) {
        let span = document.createElement("span");
        span.innerText = `${etiqueta}`;
        span.className = "gasto-etiquetas-etiqueta";
        divEtiquetas.append(span);
    }

    //Orden de appends
    div.append(divDescripcion)
    div.append(divFecha)
    div.append(divValor)
    div.append(divEtiquetas)

    //Finalmente se agrega al elemento con la id del parametro
    elemento.append(div)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento);

    //Estructura HTML - Creacion de elementos
    let divAgrupacion = document.createElement("div")
    let h1 = document.createElement("h1")
    let divAgrupacionDato = document.createElement("div")

    h1.innerText = `Gastos agrupados por ${periodo}`

    //for of para ver cada clave y luego valor de agrup
    for (const nombre of Object.keys(agrup)) {
        let spanClave = document.createElement("span")
        spanClave.innerText = `${nombre}`
        spanClave.className = "agrupacion-dato-clave"
        divAgrupacionDato.append(spanClave)
    }

    for (const valor of Object.values(agrup)) {
        let spanValor = document.createElement("span")
        spanValor.innerText = `${valor}`
        spanValor.className = "agrupacion-dato-valor"
        divAgrupacionDato.append(spanValor)
    }

    //Clases para el resto de elementos
    divAgrupacion.className = "agrupacion"
    divAgrupacionDato.className = "agrupacion-dato"

    divAgrupacion.append(h1)
    divAgrupacion.append(divAgrupacionDato)

    elemento.append(divAgrupacion)
}


export {
    mostrarDatoEnID,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}