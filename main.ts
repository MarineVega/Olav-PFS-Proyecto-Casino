// Importa readline-sync
import * as readlineSync from "readline-sync";
import { Juego } from "./Juego";
import { TragamonedaPremium } from "./TragamonedasPremiun";
import { Tragamoneda } from "./Tragamonedas";
import { Casino } from "./Casino";
import { Veintiuno } from "./Veintiuno";
import { Usuario } from "./Usuario";
import { Apuesta } from "./Apuesta";


//___________________ Inicia la aplicación ________________________________

let casino1: Casino = new Casino("Juego Limpio");
console.log("Bienvenido al casino .Por favor registrese para seguir... ");
// Crear un nuevo objeto de Usuario vacio
const usuario = new Usuario('', '', 0);
usuario.RegistrarUsuario();
casino1.darBienvenida(usuario.getNombre());
menuCasino();


//____________________ Menu principal de juegos _____________________________

function menuCasino(): void {
   
    console.log(`Seleccione el juego que desee \n `);
    console.log("1. Opcion 1: Tragamonedas");
    console.log("2. Opcion 2: Tragamonedas Premiun ");
    console.log("3. Opcion 3: veitiuno");
    console.log("4. Opcion 4: HorasEspejo");
    console.log("5. Opcion 5: Retirar el dinero y salir del casino ");

    const opcion = readlineSync.question("Selecciona una opcion: ");

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


function returnToMenu(): void {
    console.log("\nPresiona Enter para regresar al menu principal...");
    readlineSync.question(); // Pausa para el usuario ingrese enter
    menuCasino(); // Vuelve al menú principal
}


// ___________________ jugar Tragamonedas ________________________

function juegoTragamonedas(){
console.log("Estas jugando en version base de tragamonedas \n");
console.log(`"🏀", "🎱", "🏐"`);
console.log(`"🏈", "🏉", "🏓"`);
console.log(`"🥊", "🏑", "🎾"`);
console.log("\n");

const readlineSync = require('readline-sync');

// Solicitamos al usuario un número entero
const nombre:string= "Tragamonedas Base "
let numeroJugadas = readlineSync.questionInt("¿Cual es la cantidad de intentos 1 , 2 o mas que deceas hacer ...? " );

let intentosMaximos = numeroJugadas;
const reglamento:string="Basico"

    let tragamonedaSports1: Tragamoneda = new Tragamoneda( numeroJugadas, 3, 3);// 3 rodillos 3 posiciones
    while (intentosMaximos > 0) {
        console.log("nueva tirada...");
        tragamonedaSports1.mostrarResultado();

        intentosMaximos--;
    }

returnToMenu();
}

//__________________ jugar Tragamonedas Premiun ______________________

function juegoTragamonedasPremiun(): void {
    

    console.log("Estas jugando en version base de tragamonedas \n");
    console.log(`"🏀", "🃏", "🏐"`);
    console.log(`"🏈", "🃏", "🏓"`);
    console.log(`"🥊", "🃏", "🎾"`);
    console.log("\n");
    // Solicitamos al usuario un número entero
    const readlineSync = require('readline-sync');
    let nombre:string="TragamonedaPremium."
    let numeroJugadas = readlineSync.questionInt("¿Cual es la cantidad de intentos 1 , 2 o mas que deceas hacer ...? " );
    let reglamento:string="Comodin";
    let tragamonedaPremium: TragamonedaPremium = new TragamonedaPremium(nombre,reglamento,numeroJugadas, 3, 3);
    let maximoTiradas: number = tragamonedaPremium.getIntentosMaximos();

while (maximoTiradas > 0){
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


function juegoVeintiuno(): void {
    const name = readlineSync.question("¿Cual es su figura para jugar? ");

    console.log(`¡Eligio el numero  ${name}!`);
    returnToMenu();
}


//_________________ Jugar HorasEspejo _______________________________

function juegoHorasEspejo(): void {
    const num1 = parseFloat(readlineSync.question("Ingresa el primer numero: "));
    const num2 = parseFloat(readlineSync.question("Ingresa el segundo numero: "));
    if (isNaN(num1) || isNaN(num2)) {         // si alguno no es un numero...
        console.log("Por favor, ingresa numeros validos.");
    } else {
        console.log(`El resultado de la suma es: ${num1 + num2}`);
    }
    returnToMenu();
}






