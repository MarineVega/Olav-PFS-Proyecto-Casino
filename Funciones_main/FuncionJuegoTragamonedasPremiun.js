"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.juegoTragamonedasPremiun = juegoTragamonedasPremiun;
var TragamonedasPremiun_1 = require("../TragamonedasPremiun");
var FuncionReturnToMenu_1 = require("./FuncionReturnToMenu");
//__________________ jugar Tragamonedas Premiun ______________________
function juegoTragamonedasPremiun(usuario) {
    var apuMin = 2500;
    var apuMax = 25000;
    console.log("Estas jugando en version de tragamonedas Premiun \n");
    console.log("Saldo en su Billetera : $ ".concat(usuario.obtenerSaldo()));
    console.log("Apuesta  \uD83D\uDCB8 $  ".concat(apuMin, " Hasta.. $ ").concat(apuMax));
    console.log("Ingrese el dinero que desea apostar...!  ");
    var readlineSync = require('readline-sync');
    var dineroApostado = readlineSync.questionInt("Ingrese una suma en $ : ");
    var tragamonedaPremium = new TragamonedasPremiun_1.TragamonedaPremium("TragaMoneda Premium", "Reglas del juego", apuMin, apuMax, usuario, 3);
    if (tragamonedaPremium.apostar(dineroApostado)) {
        var intentosP = tragamonedaPremium.getIntentosMaximos();
        while (intentosP > 0) {
            tragamonedaPremium.mostrarResultado();
            intentosP = tragamonedaPremium.getIntentosMaximos();
        }
    }
    console.log("Saldo en su Billetera : $ ".concat(usuario.obtenerSaldo(), "\n"));
    (0, FuncionReturnToMenu_1.returnToMenu)();
}
