"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.juegoTragamonedasSport = juegoTragamonedasSport;
var TragamonedaSport_1 = require("../TragamonedaSport");
var FuncionReturnToMenu_1 = require("./FuncionReturnToMenu");
// ___________________ jugar Tragamonedas Sport ________________________
function juegoTragamonedasSport(usuario) {
    var apuMin = 1000;
    var apuMax = 15000;
    console.log("Estas jugando en version Sport de tragamonedas \n");
    console.log("Saldo en su Billetera : $ ".concat(usuario.obtenerSaldo()));
    console.log("Apuesta  \uD83D\uDCB8 $  ".concat(apuMin, " Hasta.. $ ").concat(apuMax));
    console.log("Ingrese el dinero que desea apostar...!  ");
    var readlineSync = require('readline-sync');
    var dineroApostado = readlineSync.questionInt("Ingrese una suma en $ : ");
    var tragamonedaSports = new TragamonedaSport_1.TragamonedaSports("Tragamoneda Sports", "Reglamento de Juegos Deportivos", apuMin, apuMax, usuario, 5);
    if (tragamonedaSports.apostar(dineroApostado)) {
        //Prueba con Sports
        var intentosS = tragamonedaSports.getIntentosMaximos();
        while (intentosS > 0) {
            tragamonedaSports.mostrarResultado();
            intentosS = tragamonedaSports.getIntentosMaximos();
        }
    }
    console.log("Saldo en su Billetera : $ ".concat(usuario.obtenerSaldo(), "\n"));
    (0, FuncionReturnToMenu_1.returnToMenu)();
}
