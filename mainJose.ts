import { Apuesta } from "./Apuesta";
import { Casino } from "./Casino";
import { Juego } from "./Juego"
import { Usuario } from "./Usuario";
//import { Veintiuno } from "./Veintiuno";
import { TragamonedaSports } from "./TragamonedaSports";
import { TragamonedaPremium } from "./TragamonedaPremium";
import * as readlineSync from "readline-sync";

//___________________ Inicia la aplicación ________________________________

let casino1: Casino = new Casino("Juego Limpio 🎲🍀");
console.log("\nBienvenido al Casino Juego Limpio 🎲🍀. Por favor registrese para seguir...\n");
// Crear un nuevo objeto de Usuario vacio
// Se crea un usuario (jugador) para probar los Tragamonedas Sports y Premium
const usuario = new Usuario('', '', 0);
usuario.RegistrarUsuario();
//casino1.darBienvenida(usuario);
casino1.darBienvenida(usuario);
menuCasino();


//____________________ Menu principal de juegos _____________________________

function menuCasino(): void {

    console.log(`${usuario.nombre} seleccione el juego que desee...! \n `);
    console.log("Opcion 1: Tragamonedas Sports 🎰");
    console.log("Opcion 2: Tragamonedas Premiun 🎰");
    console.log("Opcion 3: Veitiuno ♣️♦️");
    console.log("Opcion 4: HorasEspejo 🪞");
    console.log("Opcion 5: Recargar Dinero 💸");
    console.log("Opcion 6: Retirar el dinero y salir del Casino");

    const opcion = readlineSync.question("\nSelecciona una opcion: ");

    switch (opcion) {
        case "1":
           juegoTragamonedaSport();
            break;
        case "2":
            juegoTragamonedaPremiun();
            break;
        case "3":
           // juegoVeintiuno();
            break;
        case "4":
           // juegoHorasEspejo();
            break;
        case "5":
           recargarDinero();
            break;
        case "6":
            console.log("Saliendo del Casino. ¡Hasta pronto!👋");
            break;

        default:
            console.log("Opción no válida❗. Intentalo de nuevo.");
            menuCasino(); 
            break;
    }
}

//____________________ retorno para jugar ____________________________

function returnToMenu(): void {
    console.log("\nPresiona Enter para regresar al Menú Principal...");
    readlineSync.question(); 
    menuCasino(); 
}

// ___________________ jugar Tragamonedas Sport ________________________

function juegoTragamonedaSport() {
    const apuMin=1000;
    const apuMax=15000

    console.log("\nEstás jugando la versión Sports de Tragamonedas 🎰 \n");
    console.log(`Saldo en su Billetera: $${usuario.obtenerSaldo()}`);
    console.log(`Apuesta 💸 $${apuMin} Hasta $${apuMax}`);
    console.log("Ingrese el dinero que desea apostar...!  ");
    const readlineSync = require('readline-sync');
    const dineroApostado: number = readlineSync.questionInt("Ingrese una suma en $: ");
    const tragamonedaSports = new TragamonedaSports("Tragamoneda Sports", "Reglamento de Juegos Deportivos", apuMin, apuMax, usuario, 5);
   
    if (tragamonedaSports.apostar(dineroApostado)) {
    //Prueba con Sports
    let intentos: number = tragamonedaSports.getIntentosMaximos();
    while (intentos > 0) {
        console.log("  ")
        console.error("Presione Enter para tirar🤞");
        readlineSync.question();
        tragamonedaSports.mostrarResultado();
        intentos = tragamonedaSports.getIntentosMaximos();
        }
    }
    console.log(`\nSaldo en su Billetera: $${usuario.obtenerSaldo()}`);
    
    returnToMenu();
}

//__________________ jugar Tragamonedas Premiun ______________________

function juegoTragamonedaPremiun(): void {
    const apuMin=2500;
    const apuMax=25000

    console.log("Estas jugando la version Premium de Tragamonedas 🎰 \n");
    console.log(`Saldo en su Billetera: $${usuario.obtenerSaldo()}`);
    console.log(`Apuesta 💸 $${apuMin} Hasta $${apuMax}`);
    console.log("Ingrese el dinero que desea apostar...!  ");
    const readlineSync = require('readline-sync');
    const dineroApostado: number = readlineSync.questionInt("Ingrese una suma en $: ");
    const tragamonedaPremium = new TragamonedaPremium("TragaMoneda Premium", "Reglas del juego", apuMin, apuMax, usuario, 3);

    if (tragamonedaPremium.apostar(dineroApostado)) {

        let intentosP: number = tragamonedaPremium.getIntentosMaximos();
        while (intentosP > 0) {
            console.log("  ")
            console.error("Presione Enter para tirar🤞");
            readlineSync.question();
            tragamonedaPremium.mostrarResultado();
            intentosP = tragamonedaPremium.getIntentosMaximos();
        }
    }
    console.log(`\nSaldo en su Billetera: $${usuario.obtenerSaldo()}`);

    returnToMenu();
}


// ___________________ jugar Veintiuno _____________________________


/*function juegoVeintiuno(): void {
    let continuar: string = "S";
    let apuesta: number;
    let apuestaValida: boolean;

    const partida1: Veintiuno = new Veintiuno ("Juego Veintiuno", "El objetivo principal es sumar puntos con las cartas hasta llegar a 21 o acercarse lo más posible sin pasarse. El jugador compite contra la máquina.", 1000, 5000, usuario);

    console.log(" ")
    console.warn("Dinero disponible del usuario: " + usuario.getBilletera());
    console.log(" ")
    console.error(partida1.mostrarDatosVeintiuno());
    console.log(" ")

    do {
        apuesta = readlineSync.questionInt("Ingrese el dinero de la apuesta: ");
        apuestaValida = partida1.apostar(apuesta);
    } while (!apuestaValida)

    console.warn("💸 Dinero disponible del usuario: " + usuario.getBilletera());

    if (apuestaValida) {
        console.log("  ")
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
                } while (!["s", "n"].includes(continuar.toLowerCase()))        
            }  
        } while ((continuar.toLowerCase() == "s") && !partida1.getFinalizoPartida())
            
            
        // chequeo si salió porque el usuario no quiso continuar
        if (continuar.toLowerCase() == "n") {    
            partida1.detenerPartida(1);
        }
        
        console.warn("Dinero disponible del usuario: " + usuario.getBilletera());
        console.log(" ");
    }
    
    returnToMenu();
}
*/

//_________________ Jugar HorasEspejo _______________________________

function juegoHorasEspejo(): void {
    // main de Naty ...
    returnToMenu();
}


function recargarDinero(){

    console.log(`Ingrese dinero para recargar Billetera...💸.Su saldo actual de $: ${usuario.obtenerSaldo()}`);
    const readlineSync = require('readline-sync');
    const dineroRecarga: number = readlineSync.questionInt("Ingrese una suma en $: ");
    usuario.agregarDinero(dineroRecarga);
    console.log(`Su saldo actual recargado es de $: ${usuario.obtenerSaldo()}`);

    returnToMenu();
}