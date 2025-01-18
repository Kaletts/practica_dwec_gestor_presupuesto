import * as gesPres from "./gestionPresupuesto.js"

//Identifico los botones
let bt_actualizarPresupuesto = document.getElementById("actualizarpresupuesto")
let bt_anyadirGasto = document.getElementById("anyadirgasto")
let bt_anyadirGastoForm = document.getElementById("anyadirgasto-formulario")

//Handlers de eventos
bt_actualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb)
bt_anyadirGasto.addEventListener("click", nuevoGastoWeb)
bt_anyadirGastoForm.addEventListener("click", nuevoGastoWebFormulario)

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
    let botonEditarForm = document.createElement("button");
    let botonEliminar = document.createElement("button");

    //Textos fijos
    botonEditar.innerText = "Editar"
    botonEditarForm.innerText = "Editar con formulario"
    botonEliminar.innerText = "Eliminar"

    //Clases para los elementos
    div.className = "gasto"
    divDescripcion.className = "gasto-descripcion"
    divFecha.className = "gasto-fecha"
    divValor.className = "gasto-valor"
    divEtiquetas.className = "gasto-etiquetas"
    botonEliminar.className = "gasto-borrar"
    botonEditar.className = "gasto-editar"
    botonEditarForm.className = "gasto-editar-formulario"

    //Carga de datos sobre los elementos
    divDescripcion.innerText = `${gasto.descripcion}`
    divFecha.innerText = gasto.fecha
        ? new Date(gasto.fecha).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric"
        }) : "Fecha no disponible"
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
    let manejadorEditarForm = new EditarHandleFormulario(gasto);
    let manejadorBorrar = new BorrarHandle(gasto);

    botonEditar.addEventListener("click", manejadorEditar);
    botonEditarForm.addEventListener("click", manejadorEditarForm);
    botonEliminar.addEventListener("click", manejadorBorrar);


    let BorrarEtiqueta = new BorrarEtiquetasHandle(gasto, gasto.etiqueta)

    //Orden de appends
    div.appendChild(divDescripcion)
    div.appendChild(divFecha)
    div.appendChild(divValor)
    div.appendChild(divEtiquetas)
    div.appendChild(botonEditar)
    div.appendChild(botonEditarForm)
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

//Funcion que recoge los datos con promts
function nuevoGastoWeb() {
    gesPres.anyadirGasto(recogeDatosGastos())
    repintar()
}

//Funcion que recoge los datos con un formulario
function nuevoGastoWebFormulario(evento) {
    //Guardo en una variable el template que esta en el HTML
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    //Se accede con selectores como si fuera un HTML más.
    let formulario = plantillaFormulario.querySelector("form");

    let botonAnyadir = document.getElementById("anyadirgasto-formulario");
    botonAnyadir.setAttribute("disabled", "true");

    //Codigo para ejecutar cuando se hace el submit del formulario - Funcion manejadora que omite el submit
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();
        document.getElementById("anyadirgasto-formulario").disabled = false;

        //Tomo los valores del formulario
        let descripcion = formulario.elements.descripcion.value;
        let valor = formulario.elements.valor.value;
        let fecha = formulario.elements.fecha.value;
        let etiquetas = formulario.elements.etiquetas.value;

        /* if(!descripcion || isNaN(valor) || !fecha) {
            alert("Datós invalidos, por favor verifica los valores")
        } */

        //Creo el array de etiquetas
        let etiquetasArray = etiquetas.split(",")

        let gasto = new gesPres.CrearGasto(descripcion, valor, fecha, etiquetasArray);
        gesPres.anyadirGasto(gasto);
        gesPres.calcularTotalGastos()
        repintar();

        //Reactivo el boton, elimino el formulario y repinto.
        botonAnyadir.removeAttribute("disable")
        formulario.remove()

    })

    

    //Manejador del boton cancelar
    let botonCancelar = formulario.querySelector(".cancelar")
    botonCancelar.addEventListener("click", new CancelarHandler())

    //Añado el formulario al contenedor principal
    let controles = document.getElementById("controlesprincipales")
    controles.appendChild(plantillaFormulario)

    repintar()
}

function CancelarHandler() {
    this.handleEvent = function (event) {
        let botonAnyadir = document.getElementById("anyadirgasto-formulario")
        botonAnyadir.removeAttribute("disabled")

        let contenedor = document.getElementById("controlesprincipales");
        let formulario = contenedor.querySelector("form");
        contenedor.removeChild(formulario);
    }
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

function EditarHandleFormulario(gasto) {
    this.gasto = gasto

    this.handleEvent = function (evento) {
        evento.preventDefault();

        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form");

        formulario.elements.descripcion.value = this.gasto.descripcion;
        formulario.elements.valor.value = this.gasto.valor;
        formulario.elements.fecha.value = this.gasto.fecha;
        formulario.elements.etiquetas.value = this.gasto.etiquetas;

        let botonEditarFormulario = evento.target; //El botón que fue clicado
        botonEditarFormulario.disabled = true;

        //Manejador para el submit
        let submitHandler = new SubmitFormularioEditado(this.gasto)
        formulario.addEventListener("submit", submitHandler)

        //Manejador del boton cancelar
        let botonCancel = formulario.querySelector("button.cancelar");
        botonCancel.addEventListener("click", (evento) => {
            evento.preventDefault();
            botonEditarFormulario.disabled = false;
            formulario.parentElement.removeChild(formulario);
        });

        //Agrego a la pagina el form
        let contenedorGasto = evento.target.closest(".gasto"); //Encuentra el contenedor del gasto en el que se hizo clic
        contenedorGasto.appendChild(plantillaFormulario); //Añade el formulario al gasto específico

    }
}

function SubmitFormularioEditado(gasto) {
    this.gasto = gasto

    this.handleEvent = function (evento) {
        evento.preventDefault()

        //Busco el formulario
        let contenedorGasto = evento.target.closest(".gasto");
        let formulario = contenedorGasto.querySelector("form");

        //Actualizo los datos con los nuevos del formulario
        this.gasto.descripcion = formulario.elements.descripcion.value
        
        //Verifica y confirma que todo el valor sea correcto para no afectar la logica detras
        let valorTexto = formulario.elements.valor.value
        let valorLimpio = valorTexto.replace(/[^0-9.-]+/g, "");
        let valorNumerico = parseFloat(valorLimpio)
        if (!isNaN(valorNumerico)) {
            this.gasto.valor = valorNumerico;
        } else {
            // Manejar el caso en que el valor no sea un número válido
            console.error("El valor no es un número válido");
        }
        this.gasto.fecha = formulario.elements.fecha.value
        this.gasto.etiquetas = formulario.elements.etiquetas.value.split(",")

        gesPres.calcularTotalGastos()
        repintar()

        formulario.remove()
    }
}

function BorrarHandle(gasto) {
    this.gasto = gasto

    this.handleEvent = function (evento) {
        gesPres.borrarGasto(this.gasto.id)
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