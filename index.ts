import * as readline from "readline-sync";
import { Usuario } from "./Usuario";
import { HorasEspejo } from "./HorasEspejo";
import { HorasEspejoSolitario } from "./HorasEspejoSolitario";

// Crear al usuario
const jugador = new Usuario("Naty","Natalia", 10000); // Jugador con saldo inicial fijo
console.log(" ");
console.log(" *****************12:21***************** HORAS 00:00 ESPEJO ****************15:51*************************");

console.log("Selecciona un juego:");
console.log("1. Horas Espejo ⚔️  (Jugador vs Máquina)");
console.log("2. Horas Espejo Solitario 🙃");
const opcion = readline.questionInt("Opcion: ");


let apuesta: number=0;
let apuestaValida: boolean;


console.log(" ")
console.warn("Dinero disponible del usuario: " + jugador.obtenerSaldo());
console.log(" ")
console.log(" ")



// Instanciar el juego correspondiente
if (opcion === 1) {
    const horasEspejo = new HorasEspejo("Horas Espejo", "Apuesta minima de $1000, ganas con 30 puntos o con 00:00 multiplicas tu apuesta por 10!!", 1000, 5000, jugador);
    console.log(`Reglamento: ${horasEspejo.getReglamento()}`);
    do {
        apuesta = readline.questionInt("Ingrese el dinero de la apuesta: ");
        apuestaValida = horasEspejo.apostar(apuesta);
    } while (!apuestaValida)
        console.warn("Dinero disponible del usuario: " + jugador.obtenerSaldo());

        if (apuestaValida) {
            console.log("  ")
            console.error("🎮Presione cualquier tecla para comenzar: ");
            readline.question();         
            horasEspejo.iniciarPartida();
        }

} else if (opcion === 2) {
   
   
    const horasEspejoSolitario = new HorasEspejoSolitario("Horas Espejo Solitario", "Apuesta Minima $1000, ¿Que te dira el azar?, saca horas espejo y sumas puntos con 30 puntos ganas o con 00:00 ganas tu apuesta por 10!!.", 1000, 5000, jugador);
    console.log(`Reglamento: ${horasEspejoSolitario.getReglamento()}`);
    horasEspejoSolitario.iniciarPartida();
    do {
        apuesta = readline.questionInt("Ingrese el dinero de la apuesta: ");
        apuestaValida = horasEspejoSolitario.apostar(apuesta);
    } while (!apuestaValida)
        
        console.warn("Dinero disponible del usuario: " + jugador.obtenerSaldo());

        if (apuestaValida) {
            console.log("  ")
            console.error("🎮Presione cualquier tecla para comenzar: ");
            readline.question();         
            horasEspejoSolitario.iniciarPartida();
        }
} else {
    console.log("Opción no válida.");
}


