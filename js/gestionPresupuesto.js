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
        let mes = String(nuevaFecha.getMonth() + 1).padStart(2, "0")
        let dia = String(nuevaFecha.getDate()).padStart(2, "0")
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
    if (Object.keys(gasto).length === 0) {
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
    if (gasto.valorMinimo) {
        resultados = resultados.filter(g => g.valor >= gasto.valorMinimo)
    }
    if (gasto.valorMaximo) {
        resultados = resultados.filter(g => g.valor <= gasto.valorMaximo)
    }
    if (gasto.descripcionContiene) {
        let descripcionMinus = gasto.descripcionContiene.toLowerCase();
        resultados = resultados.filter(g => g.descripcion.toLowerCase().includes(descripcionMinus))
    }
    //Me dejo esto explicado porque fue el filtro que más me costó
    // Filtro de etiquetas, solo si hay etiquetas especificadas
    if (gasto.etiquetasTiene && gasto.etiquetasTiene.length > 0) {
        // Paso a minúsculas todas las etiquetas usando map y toLowerCase
        let etiquetasMinus = gasto.etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());

        //Filtro de resultados sin eliminar los anteriores
        resultados = resultados.filter(g => {
            //Verificamos si alguna de las etiquetas del gasto coincide con las etiquetas que estamos buscando
            return g.etiquetas.some(etiqueta => etiquetasMinus.includes(etiqueta.toLowerCase()));
        });
    }

    return resultados;
}

//Devuelve el objeto gastosAgrupados, que contiene el total de gastos agrupados por el período especificado (mes, año, etc.)
//donde cada clave representa un período y cada valor representa el total de gastos de ese período.
function agruparGastos(periodo = "mes", etiqueta = [], fechaDesde, fechaHasta) {
    //Filtro los gastos usando los 4 parametros y la funcion filtrarGastos
    let gastosFiltrados = filtrarGastos({
        etiquetasTiene: etiqueta.length > 0 ? etiqueta : undefined,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta
    });

    //Uso estos gastos filtrados para la funcion reduce
    let gastosAgrupados = gastosFiltrados.reduce(function (acc, gasto) {

        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo)
        //Esto verifica si ya existe el periodo de agrupación en el acumulador
        if (!acc[periodoAgrupacion]) {
            //Si no existe lo inicializa con valor 0 para poder empezar a sumar valores de los gastos del periodo
            acc[periodoAgrupacion] = 0;
        }

        //Suma el gasto actual al total acumulado por el periodo de agrupación
        acc[periodoAgrupacion] += gasto.valor;

        return acc;
    }, {})
    return gastosAgrupados;
}


function transformarListadoEtiquetas(etiquetas) {

    //Expresion regular que segun entiendo hace o siguiente:
    //busca caracteres con . , ; : o cualquier espacio en blanco (la \s)
    //El más de al lado es para que coincida con uno o más de todos los caracteres consecutivos.
    let regexp = /[.,;:\s]+/;

    let etiquetasCorregidas = etiquetas.replace(regexp, ",")

    let etiquetasLimpias = etiquetasCorregidas.trim();

    let arrayEtiquetas = etiquetasLimpias.split(",");

    return arrayEtiquetas;
}

function cargarGastos(gastosAlmacenamiento) {
    // gastosAlmacenamiento es un array de objetos "planos"
    // No tienen acceso a los métodos creados con "CrearGasto":
    // "anyadirEtiquetas", "actualizarValor",...
    // Solo tienen guardadas sus propiedades: descripcion, valor, fecha y etiquetas

    // Reseteamos la variable global "gastos"
    gastos = [];
    if(!gastosAlmacenamiento || gastosAlmacenamiento.length === 0) {
        console.log("No hay nada que cargar")
        return
    }
    // Procesamos cada gasto del listado pasado a la función
    for (let g of gastosAlmacenamiento) {

        let gastoRehidratado = new CrearGasto();

        Object.assign(gastoRehidratado, g);

        gastos.push(gastoRehidratado)
    }
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
    agruparGastos,
    transformarListadoEtiquetas,
    cargarGastos
}
