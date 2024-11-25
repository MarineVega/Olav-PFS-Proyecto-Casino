"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Importa readline-sync
var readlineSync = require("readline-sync");
var TragamonedasPremiun_1 = require("./TragamonedasPremiun");
var Tragamonedas_1 = require("./Tragamonedas");
var Casino_1 = require("./Casino");
var Usuario_1 = require("./Usuario");
//___________________ Inicia la aplicación ________________________________
var casino1 = new Casino_1.Casino("Juego Limpio");
console.log("Bienvenido al casino .Por favor registrese para seguir... ");
// Crear un nuevo objeto de Usuario vacio
var usuario = new Usuario_1.Usuario('', '', 0);
usuario.RegistrarUsuario();
casino1.darBienvenida(usuario.getNombre());
menuCasino();
//____________________ Menu principal de juegos _____________________________
function menuCasino() {
    console.log("Seleccione el juego que desee \n ");
    console.log("1. Opcion 1: Tragamonedas");
    console.log("2. Opcion 2: Tragamonedas Premiun ");
    console.log("3. Opcion 3: veitiuno");
    console.log("4. Opcion 4: HorasEspejo");
    console.log("5. Opcion 5: Retirar el dinero y salir del casino ");
    var opcion = readlineSync.question("Selecciona una opcion: ");
    switch (opcion) {
        case "1":
            juegoTragamonedas();
            break;
        case "2":
            juegoTragamonedasPremiun();
            break;
        case "3":
            juegoVeintiuno();
            break;
        case "4":
            juegoHorasEspejo();
            break;
        case "5":
            console.log("Saliendo del casino. ¡Hasta pronto!");
            break;
        default:
            console.log("Opción no valida. Intentalo de nuevo.");
            menuCasino(); // Vuelve al menú principal
            break;
    }
}
//____________________ retorno para jugar ____________________________
function returnToMenu() {
    console.log("\nPresiona Enter para regresar al menu principal...");
    readlineSync.question(); // Pausa para el usuario ingrese enter
    menuCasino(); // Vuelve al menú principal
}
// ___________________ jugar Tragamonedas ________________________
function juegoTragamonedas() {
    console.log("Estas jugando en version base de tragamonedas \n");
    console.log("\"\uD83C\uDFC0\", \"\uD83C\uDFB1\", \"\uD83C\uDFD0\"");
    console.log("\"\uD83C\uDFC8\", \"\uD83C\uDFC9\", \"\uD83C\uDFD3\"");
    console.log("\"\uD83E\uDD4A\", \"\uD83C\uDFD1\", \"\uD83C\uDFBE\"");
    console.log("\n");
    var readlineSync = require('readline-sync');
    // Solicitamos al usuario un número entero
    var nombre = "Tragamonedas Base ";
    var numeroJugadas = readlineSync.questionInt("¿Cual es la cantidad de intentos 1 , 2 o mas que deceas hacer ...? ");
    var intentosMaximos = numeroJugadas;
    var reglamento = "Basico";
    var tragamonedaSports1 = new Tragamonedas_1.Tragamoneda(numeroJugadas, 3, 3); // 3 rodillos 3 posiciones
    while (intentosMaximos > 0) {
        console.log("nueva tirada...");
        tragamonedaSports1.mostrarResultado();
        intentosMaximos--;
    }
    returnToMenu();
}
//__________________ jugar Tragamonedas Premiun ______________________
function juegoTragamonedasPremiun() {
    console.log("Estas jugando en version base de tragamonedas \n");
    console.log("\"\uD83C\uDFC0\", \"\uD83C\uDCCF\", \"\uD83C\uDFD0\"");
    console.log("\"\uD83C\uDFC8\", \"\uD83C\uDCCF\", \"\uD83C\uDFD3\"");
    console.log("\"\uD83E\uDD4A\", \"\uD83C\uDCCF\", \"\uD83C\uDFBE\"");
    console.log("\n");
    // Solicitamos al usuario un número entero
    var readlineSync = require('readline-sync');
    var nombre = "TragamonedaPremium.";
    var numeroJugadas = readlineSync.questionInt("¿Cual es la cantidad de intentos 1 , 2 o mas que deceas hacer ...? ");
    var reglamento = "Comodin";
    var tragamonedaPremium = new TragamonedasPremiun_1.TragamonedaPremium(nombre, reglamento, numeroJugadas, 3, 3);
    var maximoTiradas = tragamonedaPremium.getIntentosMaximos();
    while (maximoTiradas > 0) {
        tragamonedaPremium.mostrarResultado();
        maximoTiradas = tragamonedaPremium.getIntentosMaximos();
    }
    console.log(tragamonedaPremium.getValores());
    /*
        
    
        let intentosMaximos = numeroJugadas;
        const reglamento:string="Basico"
        
            let tragamonedaSports1: Tragamoneda = new Tragamoneda( numeroJugadas, 3, 3);// 3 rodillos 3 posiciones
            while (intentosMaximos > 0) {
                console.log("nueva tirada...");
                tragamonedaSports1.mostrarResultado();
    
                intentosMaximos--;
            }*/
    returnToMenu();
}
// ___________________ jugar Veintiuno _____________________________
function juegoVeintiuno() {
    var name = readlineSync.question("¿Cual es su figura para jugar? ");
    console.log("\u00A1Eligio el numero  ".concat(name, "!"));
    returnToMenu();
}
//_________________ Jugar HorasEspejo _______________________________
function juegoHorasEspejo() {
    var num1 = parseFloat(readlineSync.question("Ingresa el primer numero: "));
    var num2 = parseFloat(readlineSync.question("Ingresa el segundo numero: "));
    if (isNaN(num1) || isNaN(num2)) { // si alguno no es un numero...
        console.log("Por favor, ingresa numeros validos.");
    }
    else {
        console.log("El resultado de la suma es: ".concat(num1 + num2));
    }
    returnToMenu();
}
