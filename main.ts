import { Apuesta } from "./Apuesta";
import { Casino } from "./Casino";
import { Juego } from "./Juego"
import { Usuario } from "./Usuario";
import { TragamonedaSports } from "./TragamonedaSport";
import { TragamonedaPremium } from "./TragamonedasPremiun";
import * as readlineSync from "readline-sync";

//___________________ Inicia la aplicación ________________________________

let casino1: Casino = new Casino("Juego Limpio");
console.log("Bienvenido al casino .Por favor registrese para seguir... \n");
// Crear un nuevo objeto de Usuario vacio
// Se crea un usuario (jugador) para probar los Tragamonedas Sports y Premium
const usuario = new Usuario('', '', 0);
usuario.RegistrarUsuario();
casino1.darBienvenida(usuario);
menuCasino();


//____________________ Menu principal de juegos _____________________________

function menuCasino(): void {

    console.log(`Seleccione ${usuario.nombre} el juego que desee..! \n `);
    console.log("1. Opcion 1: Tragamonedas");
    console.log("2. Opcion 2: Tragamonedas Premiun ");
    console.log("3. Opcion 3: veitiuno");
    console.log("4. Opcion 4: HorasEspejo");
    console.log("5. Opcion 5: Recargar Dinero 💸");
    console.log("6. Opcion 6: Retirar el dinero y salir del casino ");

    const opcion = readlineSync.question("Selecciona una opcion: ");

    switch (opcion) {
        case "1":
            juegoTragamonedasSport();
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
             recargarDinero();
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

//____________________ retorno para jugar ____________________________


function returnToMenu(): void {
    console.log("\nPresiona Enter para regresar al menu principal...");
    readlineSync.question(); // Pausa para el usuario ingrese enter
    menuCasino(); // Vuelve al menú principal
}


// ___________________ jugar Tragamonedas Sport ________________________

function juegoTragamonedasSport() {
    const apuMin=1000;
    const apuMax=15000

    console.log("Estas jugando en version Sport de tragamonedas \n");
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}`);
    console.log(`Apuesta  💸 $  ${apuMin} Hasta.. $ ${apuMax}`);
    console.log("Ingrese el dinero que desea apostar...!  ");
    const readlineSync = require('readline-sync');
    const dineroApostado: number = readlineSync.questionInt("Ingrese una suma en $ : ");
    const tragamonedaSports = new TragamonedaSports("Tragamoneda Sports", "Reglamento de Juegos Deportivos", apuMin, apuMax, usuario, 5);
   
    if (tragamonedaSports.apostar(dineroApostado)) {
    //Prueba con Sports
    let intentosS: number = tragamonedaSports.getIntentosMaximos();
    while (intentosS > 0) {
        tragamonedaSports.mostrarResultado();
        intentosS = tragamonedaSports.getIntentosMaximos();
    }
    }
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}\n`);

    returnToMenu();
}

//__________________ jugar Tragamonedas Premiun ______________________

function juegoTragamonedasPremiun(): void {
    const apuMin=2500;
    const apuMax=25000

    console.log("Estas jugando en version de tragamonedas Premiun \n");
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}`);
    console.log(`Apuesta  💸 $  ${apuMin} Hasta.. $ ${apuMax}`);
    console.log("Ingrese el dinero que desea apostar...!  ");
    const readlineSync = require('readline-sync');
    const dineroApostado: number = readlineSync.questionInt("Ingrese una suma en $ : ");
    const tragamonedaPremium = new TragamonedaPremium("TragaMoneda Premium", "Reglas del juego", apuMin, apuMax, usuario, 3);

    if (tragamonedaPremium.apostar(dineroApostado)) {

        let intentosP: number = tragamonedaPremium.getIntentosMaximos();
        while (intentosP > 0) {
            tragamonedaPremium.mostrarResultado();
            intentosP = tragamonedaPremium.getIntentosMaximos();
        }


    }
    
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}\n`);

    returnToMenu();
}


// ___________________ jugar Veintiuno _____________________________


function juegoVeintiuno(): void {
    
    //main de Marine ....

    returnToMenu();
}


//_________________ Jugar HorasEspejo _______________________________

function juegoHorasEspejo(): void {
    // main de Naty ...
    returnToMenu();
}


function recargarDinero(){

    console.log(`Ingrese dinero para recargar Billetera...💸  .Su saldo actual de $: ${usuario.obtenerSaldo()}`);
    const readlineSync = require('readline-sync');
    const dineroRecarga: number = readlineSync.questionInt("Ingrese una suma en $ : ");
    usuario.agregarDinero(dineroRecarga);
    console.log(`Su saldo actual recargado es de $: ${usuario.obtenerSaldo()}`);

    returnToMenu();
}







