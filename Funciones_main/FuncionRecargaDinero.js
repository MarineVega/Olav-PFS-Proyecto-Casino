"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recargarDinero = recargarDinero;
var FuncionReturnToMenu_1 = require("./FuncionReturnToMenu");
function recargarDinero(usuario) {
    console.log("Ingrese dinero para recargar Billetera...\uD83D\uDCB8  .Su saldo actual de $: ".concat(usuario.obtenerSaldo()));
    var readlineSync = require('readline-sync');
    var dineroRecarga = readlineSync.questionInt("Ingrese una suma en $ : ");
    usuario.agregarDinero(dineroRecarga);
    console.log("Su saldo actual recargado es de $: ".concat(usuario.obtenerSaldo()));
    (0, FuncionReturnToMenu_1.returnToMenu)();
}
