import * as gesPres from "./gestionPresupuesto.js"

//Identifico los botones
let bt_actualizarPresupuesto = document.getElementById("actualizarpresupuesto")
let bt_anyadirGasto = document.getElementById("anyadirgasto")

//Handlers de eventos
bt_actualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb)
bt_anyadirGasto.addEventListener("click", nuevoGastoWeb)

//Función de dos parámetros que se encargará de escribir el valor (texto) en el elemento HTML con id idElemento indicado:
function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento);
    elemento.innerText = valor;
}

//Función de dos parámetros que se encargará de añadir dentro del elemento HTML con id idElemento indicado una estructura HTML para el gasto que se pase como parámetro:
function mostrarGastoWeb(idElemento, gasto) {

    if (!gasto || typeof gasto !== "object") {
        console.error("El parámetro gasto no es válido:", gasto);
        return;
    }
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
    if (Array.isArray(gasto.etiquetas)) {
        for (const etiqueta of gasto.etiquetas) {
            let span = document.createElement("span");
            span.innerText = `${etiqueta}`;
            span.className = "gasto-etiquetas-etiqueta";
            divEtiquetas.append(span);
        }
    } else {
        console.error("Etiquetas no es un array es: ", gasto.etiquetas);
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

    h1.innerText = `Gastos agrupados por ${periodo}`

    //Version anterior no funcionaba porque tenia dos for separados y entonces creaba un unico divAgrupacionDato
    for (const [clave, valor] of Object.entries(agrup)) {
        let divAgrupacionDato = document.createElement("div")
        let spanClave = document.createElement("span")
        let spanValor = document.createElement("span")

        divAgrupacionDato.className = "agrupacion-dato"
        spanClave.className = "agrupacion-dato-clave"
        spanValor.className = "agrupacion-dato-valor"

        spanClave.innerText = clave;
        spanValor.innerText = valor;

        divAgrupacionDato.append(spanClave);
        divAgrupacionDato.append(spanValor);
        divAgrupacion.append(divAgrupacionDato);
    }

    divAgrupacion.className = "agrupacion"

    divAgrupacion.append(h1)
    elemento.append(divAgrupacion)
}

function limpiarListado() {
    let lista = document.getElementById("listado-gastos-completo")
    lista.innerText = ""
}

function repintar() {
    mostrarDatoEnId("presupuesto", gesPres.mostrarPresupuesto())
    mostrarDatoEnId("gastos-totales", gesPres.calcularTotalGastos())
    mostrarDatoEnId("balance-total", gesPres.calcularBalance())
    limpiarListado()
    for (const gasto of gesPres.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto)    
    }
}

function actualizarPresupuestoWeb() {
    let respuesta = prompt("Introduce un nuevo presupuesto", 1500)
    if (respuesta === null || respuesta === NaN) {
        respuesta = 1500
    } else {
        gesPres.actualizarPresupuesto(parseFloat(respuesta))
        repintar()
    }
}

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto", "Gasto generico")
    let valor = prompt("Introduce el importe del gasto", 15)
    let fecha = prompt("Introduce la fecha del gasto", "2024-05-10")
    let etiquetas = prompt("Introduce las etiquetas separadas por , por favor:", "Seguro,Coche")
    if (valor === null || isNaN(valor)) {
        alert("Introduce un número por favor")
    }
    let importe = parseFloat(valor)

    let etiquetasArray = etiquetas.split(",")
    let gasto = new gesPres.CrearGasto(descripcion, importe, fecha, ...etiquetasArray)
    gesPres.anyadirGasto(gasto)
    repintar()
}

function EditarHandle() {

}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}