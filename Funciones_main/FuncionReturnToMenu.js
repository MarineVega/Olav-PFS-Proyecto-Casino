"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnToMenu = returnToMenu;
var readlineSync = require("readline-sync");
var main_1 = require("../main");
//____________________ retorno para jugar ____________________________
function returnToMenu() {
    console.log("\nPresiona Enter para regresar al menu principal...");
    readlineSync.question(); // Pausa para el usuario ingrese enter
    (0, main_1.menuCasino)(); // Vuelve al menú principal
}
