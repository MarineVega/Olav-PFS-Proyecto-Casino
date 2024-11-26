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
console.log(`Juegos ganados : ${usuario.getjuegosGanados()}`)
console.log(`Billetera para jugar : ${usuario.getBilletera()}`)
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

function juegoTragamonedas() {
    console.log("Estas jugando en version base de tragamonedas \n");
    /*
    console.log(`"🏀", "🎱", "🏐"`);
    console.log(`"🏈", "🏉", "🏓"`);
    console.log(`"🥊", "🏑", "🎾"`);
    console.log("\n");
    */
    const readlineSync = require('readline-sync');

    // Solicitamos al usuario un número entero
    const nombre: string = "Tragamoneda"
    let numeroJugadas = readlineSync.questionInt("¿Cual es la cantidad de intentos 1 , 2 o mas que deceas hacer ...? ");
    const reglamento: string = "Basico"

    let tragamonedaPremium: TragamonedaPremium = new TragamonedaPremium(nombre, reglamento, numeroJugadas, 3, 3);
    let maximoTiradas: number = tragamonedaPremium.getIntentosMaximos();

    while (maximoTiradas > 0) {
        tragamonedaPremium.mostrarResultado();
        //maximoTiradas = tragamonedaPremium.getIntentosMaximos();
        maximoTiradas--;
    }

    console.log(tragamonedaPremium.getValores());

    returnToMenu();

}

//__________________ jugar Tragamonedas Premiun ______________________

function juegoTragamonedasPremiun(): void {

    /*
        console.log("Estas jugando en version base de tragamonedas \n");
        console.log(`"🏀", "🃏", "🏐"`);
        console.log(`"🏈", "🃏", "🏓"`);
        console.log(`"🥊", "🃏", "🎾"`);
        */
    console.log("\n");
    // Solicitamos al usuario un número entero
    const readlineSync = require('readline-sync');
    let nombre: string = "TragamonedaPremium."
    let numeroJugadas = readlineSync.questionInt("¿Cual es la cantidad de intentos 1 , 2 o mas que deceas hacer ...? ");
    let reglamento: string = "Comodin";
    let tragamonedaPremium: TragamonedaPremium = new TragamonedaPremium(nombre, reglamento, numeroJugadas, 3, 3);
    let maximoTiradas: number = tragamonedaPremium.getIntentosMaximos();

    while (maximoTiradas > 0) {
        tragamonedaPremium.mostrarResultado();
        //maximoTiradas = tragamonedaPremium.getIntentosMaximos();
        maximoTiradas--;
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


    console.log(" ");
    console.log(" ******************************************** JUEGO 21 *********************************************");

    const usuario = new Usuario("Mary", "Mariné", 10000);
    // const partida1: Veintiuno = new Veintiuno ("Veintiuno Partida 1", "Reglamento", 100,500, usuario);

    let continuar: string = "S";
    let apuesta: number;
    let apuestaValida: boolean;

    console.log("Dinero disponible del usuario: " + usuario.getBilletera());

    /* 
     do {
         apuesta = readlineSync.questionInt("Ingrese el dinero de la apuesta: ");
         apuestaValida = partida1.apostar(apuesta);
     } while (!apuestaValida)
     
     console.log("Dinero disponible del usuario: " + usuario.getBilletera());
     
     if (apuestaValida) {
     
         do {    
             partida1.jugar();
             if (!partida1.getFinalizoPartida()) {
                 console.log(partida1.mostrarPartida());
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
         
         console.log("Dinero disponible del usuario: " + usuario.getBilletera());
     }
     
 */
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






