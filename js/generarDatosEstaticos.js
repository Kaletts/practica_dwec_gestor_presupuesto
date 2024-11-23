//Fichero que contendrá un programa de ejemplo para generar un conjunto de gastos y mostrar la información relacionada con estos en la página interaccionHTML.html
import * as presupuesto from "./gestionPresupuesto.js"
import * as presupuestoWeb from "./gestionPresupuestoWeb.js"

function inicializarPresupuesto(importe) {
    presupuesto.actualizarPresupuesto(importe);
    presupuestoWeb.mostrarDatoEnID("presupuesto", presupuesto.mostrarPresupuesto());
}

function crearYAnyadirGastos(gastos) {
    gastos.forEach(gasto => {
        let nuevoGasto = presupuesto.CrearGasto(...gasto);
        presupuesto.anyadirGasto(nuevoGasto);
    });
}

inicializarPresupuesto(1500);
crearYAnyadirGastos(gastosData);


//Todos los datos para los gastos
const gastosData = [
    ["Compra carne", 23.44, "2021-10-06", "casa", "comida"],
    ["Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"],
    ["Bonobús", 18.60, "2020-05-26", "transporte"],
    ["Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"],
    ["Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"],
    ["Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"]
];

presupuesto.anyadirGasto(gasto)
presupuesto.anyadirGasto(gasto1)
presupuesto.anyadirGasto(gasto2)
presupuesto.anyadirGasto(gasto3)
presupuesto.anyadirGasto(gasto4)
presupuesto.anyadirGasto(gasto5)

presupuestoWeb.mostrarDatoEnID("gastos-totales", presupuesto.calcularTotalGastos())
presupuestoWeb.mostrarDatoEnID("balance-total", presupuesto.calcularBalance())
presupuestoWeb.mostrarGastoWeb("listado-gastos-completo", presupuesto.listarGastos())
presupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", presupuesto.filtrarGastos())
