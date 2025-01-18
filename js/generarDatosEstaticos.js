import * as gesPresupuesto from "./gestionPresupuesto.js";
import * as gesPresupuestoWeb from "./gestionPresupuestoWeb.js";

gesPresupuesto.actualizarPresupuesto(1500);

gesPresupuestoWeb.mostrarDatoEnId("presupuesto", gesPresupuesto.mostrarPresupuesto());

//Creo que esto se podría hacer con un array de objetos pero al intentarlo no me funcionó
let gasto1 = new gesPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gesPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gesPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gesPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gesPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gesPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gesPresupuesto.anyadirGasto(gasto1);
gesPresupuesto.anyadirGasto(gasto2);
gesPresupuesto.anyadirGasto(gasto3);
gesPresupuesto.anyadirGasto(gasto4);
gesPresupuesto.anyadirGasto(gasto5);
gesPresupuesto.anyadirGasto(gasto6);

let importeFormato = gesPresupuesto.calcularTotalGastos().toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
    });

gesPresupuestoWeb.mostrarDatoEnId("gastos-totales", importeFormato);
gesPresupuestoWeb.mostrarDatoEnId("balance-total", gesPresupuesto.calcularBalance());

for(let gasto of gesPresupuesto.listarGastos()){
gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}
for(let gasto of gesPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}
for(let gasto of gesPresupuesto.filtrarGastos({ valorMinimo: 50 })){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}
for(let gasto of gesPresupuesto.filtrarGastos({valorMinimo: 200, etiquetas: ["seguros"]})){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}
for(let gasto of gesPresupuesto.filtrarGastos({ valorMaximo:49, etiquetas:["comida", "transporte"]})){
    gesPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia",gesPresupuesto.agruparGastos("dia"), "día");
gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gesPresupuesto.agruparGastos("mes"), "mes");
gesPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gesPresupuesto.agruparGastos("anyo"), "año");
