"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.juegoVeintiuno = juegoVeintiuno;
var Veintiuno_1 = require("../Veintiuno");
var readlineSync = require("readline-sync");
var FuncionReturnToMenu_1 = require("./FuncionReturnToMenu");
// ___________________ jugar Veintiuno _____________________________
function juegoVeintiuno(usuario) {
    var apuMin = 1000;
    var apuMax = 5000;
    console.log(" ");
    console.log(" ******************************************** JUEGO 21 *********************************************");
    var dinero = usuario.obtenerSaldo();
    //const usuario = new Usuario("Mary", "Mariné", 10000);
    var partida1 = new Veintiuno_1.Veintiuno("Veintiuno Partida 1", "Reglamento", apuMin, apuMax, usuario);
    var continuar = "S";
    var apuesta;
    var apuestaStr;
    var apuestaValida;
    console.log(" ");
    console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
    console.log(" ");
    console.error(partida1.mostrarDatosVeintiuno());
    console.log(" ");
    do {
        apuestaStr = readlineSync.question("Ingrese el dinero de la apuesta: ");
        apuesta = parseInt(apuestaStr);
        if (apuesta) {
            apuestaValida = partida1.apostar(apuesta);
        }
        else {
            console.error("ERROR!!! debe ingresar una apuesta válida.");
        }
    } while (!apuestaValida);
    console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
    if (apuestaValida) {
        console.log("  ");
        console.error("Presione cualquier tecla para comenzar: ");
        readlineSync.question();
        do {
            partida1.jugar();
            if (!partida1.getFinalizoPartida()) {
                console.warn(partida1.mostrarPartida());
            }
            if (!partida1.getFinalizoPartida()) {
                do {
                    continuar = readlineSync.question("Desea tirar nuevamente: S/N? ");
                    // chequeo que ingrese una opción válida
                } while (!["s", "n"].includes(continuar.toLowerCase()));
            }
        } while ((continuar.toLowerCase() == "s") && !partida1.getFinalizoPartida());
        // chequeo si salió porque el usuario no quiso continuar
        if (continuar.toLowerCase() == "n") {
            partida1.detenerPartida(1);
        }
        console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
        console.log(" ");
    }
    //main de Marine ....
    (0, FuncionReturnToMenu_1.returnToMenu)();
}
