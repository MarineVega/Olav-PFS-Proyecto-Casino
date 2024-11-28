import * as readline from "readline-sync";
import { Usuario } from "./Usuario";
import { HorasEspejo } from "./HorasEspejo";
import { HorasEspejoSolitario } from "./HorasEspejoSolitario";

// Crear al usuario
const jugador = new Usuario("Naty","Natalia", 200); // Jugador con saldo inicial fijo

console.log("Selecciona un juego:");
console.log("1. Horas Espejo (Jugador vs Máquina)");
console.log("2. Horas Espejo Solitario");
const opcion = readline.questionInt("Opcion: ");

// Instanciar el juego correspondiente
if (opcion === 1) {
    const horasEspejo = new HorasEspejo("Horas Espejo", "Reglas.", 100, 1000, jugador);
    horasEspejo.iniciarPartida();
} else if (opcion === 2) {
    const horasEspejoSolitario = new HorasEspejoSolitario("Horas Espejo Solitario", "Reglas.", 50, 500, jugador);
    horasEspejoSolitario.iniciarPartida();
} else {
    console.log("Opción no válida.");
}

console.log(`Saldo final del jugador: $${jugador.obtenerSaldo()}`);
