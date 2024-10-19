// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(importe) {
    if (importe < 0 || isNaN(importe) == true) {
        console.log("El valor ingresado no es válido")
        return -1;
    }
    presupuesto = importe;

    return presupuesto;
}


function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    if (valor < 0 || isNaN(valor)) {
        this.valor = 0;
    } else {
        this.valor = valor;
    }
    this.descripcion = descripcion;

    //Para la verificación de la fecha lei en MDM web docs que si el valor de Date.parse falla se devuelve NaN
    if (!fecha || isNaN(Date.parse(fecha))) {
        this.fecha = Date.now();
    } else {
        this.fecha = fecha;
    }
    //Verifica que la etiqueta no este vacia
    if (!etiquetas || etiquetas.length === 0) {
        this.etiquetas = [];
    } else {
        this.etiquetas = etiquetas;
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.mostrarGastoCompleto = function () {
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        let fecha = `Fecha: ${this.fecha.toLocaleString()}`;
        let etiquetas = `Etiquetas: ${this.etiquetas.forEach((etiqueta) => "\n - " + etiqueta.toString())}`;
        mensaje.concat(fecha, etiquetas);
        return mensaje;
    }
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function (nuevoValor) {
        if (nuevoValor < 0 || isNaN(nuevoValor)) {
            return this.valor;
        } else {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function (fecha) {
        if (!fecha || isNaN(Date.parse(fecha))) {
            return
        } else {
            this.fecha = fecha;
        }
    }

    this.anyadirEtiquetas = function (...etiquetaNueva) {
        etiquetaNueva.forEach(element => {
            //Verifico si ya existe la etiqueta
            if (this.etiquetas.includes(element)) {
                console.log(`La etiqueta "${element}" ya existe.`);
            } else {
                //Si no existe la agrego
                this.etiquetas.push(element);
                console.log(`Etiqueta "${element}" añadida.`);
            }
        });
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        etiquetasBorrar.forEach(element => {
            //Busco el index de la etiqueta
            let index = this.etiquetas.indexOf(element);
            
            //Si es diferente a -1 quiere decir que existe y hay que eliminarlo
            if(index > -1) {
                this.etiquetas.splice(index, 1)
            } else {
                console.log(`No existe el ${element} en las etiquetas del gasto`);
            }
        });
    }
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    ++idGasto;
    gastos.push(gasto);
}

function borrarGasto(gasto) {
    let index = gastos.findIndex(gasto.id);

    if (index > -1) {
        gastos.splice(index, 1);
    }
}

function calcularTotalGastos() {
    let total = 0;

    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
}

function calcularBalance() {
    let totalGastos = calcularTotalGastos();
    let balance = presupuesto - totalGastos;
    return balance;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
