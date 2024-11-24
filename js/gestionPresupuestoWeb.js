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
    let botonEditar = document.createElement("button");
    let botonEliminar = document.createElement("button");

    //Textos fijos
    botonEditar.innerText = "Editar"
    botonEliminar.innerText = "Eliminar"

    //Clases para los elementos
    div.className = "gasto"
    divDescripcion.className = "gasto-descripcion"
    divFecha.className = "gasto-fecha"
    divValor.className = "gasto-valor"
    divEtiquetas.className = "gasto-etiquetas"
    botonEliminar.className = "gasto-borrar"
    botonEditar.className = "gasto-editar"

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

            //Manejador de los eventos sobre la etiqueta
            let manejadorEtiqueta = new BorrarEtiquetasHandle(gasto, etiqueta)
            span.addEventListener("click", manejadorEtiqueta)

            divEtiquetas.appendChild(span);
        }
    } else {
        console.error("Etiquetas no es un array es: ", gasto.etiquetas);
    }

    //Crear objeto handler nuevo para editar
    let manejadorEditar = new EditarHandle(gasto);
    let manejadorBorrar = new BorrarHandle(gasto);

    botonEditar.addEventListener("click", manejadorEditar);
    botonEliminar.addEventListener("click", manejadorBorrar);


    let BorrarEtiqueta = new BorrarEtiquetasHandle(gasto, gasto.etiqueta)

    //Orden de appends
    div.appendChild(divDescripcion)
    div.appendChild(divFecha)
    div.appendChild(divValor)
    div.appendChild(divEtiquetas)
    div.appendChild(botonEditar)
    div.appendChild(botonEliminar)

    //Finalmente se agrega al elemento con la id del parametro
    elemento.appendChild(div)
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
    gesPres.anyadirGasto(recogeDatosGastos())
    repintar()
}

function EditarHandle(gasto) {
    this.gasto = gasto

    this.handleEvent = function (evento) {
       let gastoEditado = recogeDatosGastos()
       this.gasto.actualizarValor(gastoEditado.valor)
       this.gasto.actualizarDescripcion(gastoEditado.descripcion)
       this.gasto.actualizarFecha(gastoEditado.fecha)
       this.gasto.anyadirEtiquetas(gastoEditado.etiquetas)
       repintar()
    }
}

function BorrarHandle(gasto) {
    this.gasto = gasto

    this.handleEvent = function (evento) {
        this.gasto.borrarGasto(this.gasto.id)
        repintar()
    }
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto
    this.etiqueta = etiqueta

    this.handleEvent = function (evento) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

//Funcion auxiliar que crea el objeto gasto con todos los prompts para no repetir en editarhandle y en nuevo gasto
function recogeDatosGastos() {
    let descripcion = prompt("Introduce la descripción del gasto", "Gasto generico")
    let valor = prompt("Introduce el importe del gasto", 15)
    let fecha = prompt("Introduce la fecha del gasto", "2024-05-10")
    let etiquetas = prompt("Introduce las etiquetas separadas por , por favor:", "Seguro,Coche")
    if (valor === null || isNaN(valor)) {
        alert("Introduce un número por favor")
        return
    }
    let importe = parseFloat(valor)

    let etiquetasArray = etiquetas.split(",")
    let gasto = new gesPres.CrearGasto(descripcion, importe, fecha, ...etiquetasArray)
    return gasto
}


export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}