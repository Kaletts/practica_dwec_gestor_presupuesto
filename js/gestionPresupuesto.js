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
    //Verifica que el importe-valor sea valido
    if (valor < 0 || isNaN(valor)) {
        this.valor = 0;
    } else {
        this.valor = valor;
    }
    this.descripcion = descripcion;
    this.etiquetas = [];

    //Para la verificación de la fecha lei en MDM web docs que si el valor de Date.parse falla se devuelve NaN
    if (!fecha || isNaN(Date.parse(fecha))) {
        this.fecha = Date.now();
    } else {
        this.fecha = new Date(fecha).getTime();
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.mostrarGastoCompleto = function () {
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.`;
        let fecha = `\nFecha: ${new Date(this.fecha).toLocaleString()}`;
        //Itero sobre el array usando map, paso a string y separo con \n para los espacios solicitados
        let etiquetas = `\nEtiquetas:${this.etiquetas.map(etiqueta => "\n- " + etiqueta.toString()).join('')}\n`;
        return mensaje + fecha + etiquetas;
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
            this.fecha = new Date(fecha).getTime();
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

    //Verifica que la etiqueta no este vacia
    if (!etiquetas || etiquetas.length === 0) {
        this.etiquetas = [];
    } else {
        this.anyadirEtiquetas(...etiquetas);
    }

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        etiquetasBorrar.forEach(element => {
            //Busco el index de la etiqueta
            let index = this.etiquetas.indexOf(element);

            //Si es diferente a -1 quiere decir que existe y hay que eliminarlo
            if (index > -1) {
                this.etiquetas.splice(index, 1)
            } else {
                console.log(`No existe el ${element} en las etiquetas del gasto`);
            }
        });
    }

    this.obtenerPeriodoAgrupacion = function (pAgrupacion) {
        let periodo;
        let nuevaFecha = new Date(this.fecha)
        let mes = String(nuevaFecha.getMonth() + 1).padStart(2,"0")
        let dia = String(nuevaFecha.getDate()).padStart(2,"0")
        let anyo = new Date(this.fecha).getFullYear()
        switch (pAgrupacion) {
            case "anyo":
                periodo = anyo
                break;
            case "mes":
                periodo = `${nuevaFecha.getFullYear()}-${mes}`
                break
            case "dia":
                periodo = `${anyo}-${mes}-${dia}`
                break
            default:
                console.log("El periodo ingresado es incorrecto")
                break;
        }
        return periodo;
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

function borrarGasto(gastoId) {
    let index = gastos.findIndex(gasto => gasto.id === gastoId);

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

function filtrarGastos(gasto) {
    if(Object.keys(gasto).length === 0) {
        return gastos;
    }

    let resultados = gastos;
    if (gasto.fechaDesde) {
        let fechaDesde = Date.parse(gasto.fechaDesde)
        resultados = resultados.filter(g => g.fecha >= fechaDesde)
    }
    if (gasto.fechaHasta) {
        let fechaHasta = Date.parse(gasto.fechaHasta)
        resultados = resultados.filter(g => g.fecha <= fechaHasta) 
    }
    if(gasto.valorMinimo) {
        resultados = resultados.filter(g => g.valor >= gasto.valorMinimo)
    }
    if(gasto.valorMaximo) {
        resultados = resultados.filter(g => g.valor <= gasto.valorMaximo)
    }
    if(gasto.descripcionContiene) {
        let descripcionMinus = gasto.descripcionContiene.toLowerCase();
        resultados = resultados.filter(g => g.descripcion.toLowerCase().includes(descripcionMinus))
    }
    if(gasto.etiquetasTiene) {
        //Paso a minusculas todas las etiquetas usando map y lowecase
        let etiquetasMinus = gasto.etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());

        //Filtro resultados
        resultados = resultados.filter(g => {
            //Variable de control para devolver a filter un OK de cada verificación
            let tieneEtiqueta = false;

            //Por cada etiqueta de cada Gasto
            for(let etiqueta of g.etiquetas) {
                //Verifico si se incluye la etiqueta y si es asi, paso a true la variable y hago un break del for
                if (etiquetasMinus.includes(etiqueta.toLowerCase())) {
                    tieneEtiqueta = true
                    break
                }
            }
            //Se le devuelve al filter el OK para que separe este gasto
            return tieneEtiqueta
        })
    }

    return resultados;
}

function agruparGastos() {

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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
