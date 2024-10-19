// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;

function actualizarPresupuesto(importe) {
    if(importe <= 0 || isNaN(importe) == true) {
        console.log("El valor ingresado no es válido")
        return -1;
    }
    presupuesto = importe;

    return presupuesto;
    }
    

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcionGasto, valorGasto) {
    if(valorGasto <= 0 || isNaN(valorGasto) == true) {
        this.valor = 0;
    } else {
        this.valor = valorGasto;
    }
    this.descripcion = descripcionGasto;

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(nuevoValor) {
        if(nuevoValor <= 0 || isNaN(nuevoValor) == true) {
            return this.valor;
        } else {
            this.valor = nuevoValor;
        }
    }
   
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
