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
    console.log(`Tu presupuesto actual es de ${presupuesto} €`)
}

function CrearGasto() {
    // TODO
    this.valor = 0;
    this.descripcion = "";

    function mostrarGasto() {
        `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }
    function actualizarDescripcion(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }
    function actualizarValor(nuevoValor) {
        this.valor = nuevoValor;
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
