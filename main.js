"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCasino = menuCasino;
var Casino_1 = require("./Casino");
var Usuario_1 = require("./Usuario");
var readlineSync = require("readline-sync");
var FuncionJuegoTragamonedasSport_1 = require("./Funciones_main/FuncionJuegoTragamonedasSport");
var FuncionJuegoTragamonedasPremiun_1 = require("./Funciones_main/FuncionJuegoTragamonedasPremiun");
var FuncionJuegoVeintiuno_1 = require("./Funciones_main/FuncionJuegoVeintiuno");
var FuncionRecargaDinero_1 = require("./Funciones_main/FuncionRecargaDinero");
var FuncionJuegoHorasEspejo_1 = require("./Funciones_main/FuncionJuegoHorasEspejo");
//___________________ Inicia la aplicación ________________________________
var casino1 = new Casino_1.Casino("Juego Limpio");
console.log("Bienvenido al casino .Por favor registrese para seguir... \n");
var usuario = new Usuario_1.Usuario('', '', 0);
usuario.RegistrarUsuario();
casino1.darBienvenida(usuario);
menuCasino();
//____________________ Menu principal de juegos _____________________________
function menuCasino() {
    console.log("Seleccione ".concat(usuario.nombre, " el juego que desee..! \n "));
    console.log("1. Opcion 1: Tragamonedas");
    console.log("2. Opcion 2: Tragamonedas Premiun ");
    console.log("3. Opcion 3: veitiuno");
    console.log("4. Opcion 4: HorasEspejo");
    console.log("5. Opcion 5: Recargar Dinero 💸");
    console.log("6. Opcion 6: Retirar el dinero y salir del casino ");
    var opcion = readlineSync.question("Selecciona una opcion: ");
    switch (opcion) {
        case "1":
            (0, FuncionJuegoTragamonedasSport_1.juegoTragamonedasSport)(usuario);
            break;
        case "2":
            (0, FuncionJuegoTragamonedasPremiun_1.juegoTragamonedasPremiun)(usuario);
            break;
        case "3":
            (0, FuncionJuegoVeintiuno_1.juegoVeintiuno)(usuario);
            break;
        case "4":
            (0, FuncionJuegoHorasEspejo_1.juegoHorasEspejo)(usuario);
            break;
        case "5":
            (0, FuncionRecargaDinero_1.recargarDinero)(usuario);
            break;
        case "6":
            console.log("Saliendo del casino. ¡Hasta pronto!");
            break;
        default:
            console.log("Opción no valida. Intentalo de nuevo.");
            menuCasino(); // Vuelve al menú principal
            break;
    }
}
