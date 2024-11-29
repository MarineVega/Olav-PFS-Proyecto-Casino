
import { Apuesta } from "../Apuesta";
import { Casino } from "../Casino";
import { Juego } from "../Juego"
import { Usuario } from "../Usuario";
import { Tragamoneda } from "../Tragamoneda";
import { TragamonedaSports } from "../TragamonedaSport";
import { TragamonedaPremium } from "../TragamonedasPremiun";
import { Veintiuno } from "../Veintiuno";
import { HorasEspejoSolitario } from "../HorasEspejoSolitario";
import { HorasEspejo } from "../HorasEspejo";
import * as readlineSync from "readline-sync";
import { returnToMenu } from "./FuncionReturnToMenu";


//_________________ Jugar HorasEspejo _______________________________

export function juegoHorasEspejo(usuario:Usuario): void {
    const apuMin=1000;
    const apuMax=5000
    const apuMinSolitario=1500;
    const apuMaxSolitario=5000
// Crear al usuario
//const jugador = new Usuario("Naty", "Natalia", 10000); // Jugador con saldo inicial fijo

console.log(" ");
console.log(" *****************12:21***************** HORAS 00:00 ESPEJO ****************15:51*************************");
console.log(" ");

let continuar: boolean = true;

while (continuar) {
    let opcion: number;
    do {
        console.log("Selecciona una opción:");
        console.log("1. Horas Espejo ⚔️  (Jugador vs Máquina)");
        console.log("2. Horas Espejo Solitario 🙃");
        console.log("3. Salir");
        opcion = readlineSync.questionInt("Respuesta: ");

        if (isNaN(opcion) || opcion < 1 || opcion > 3) {
            console.error("Error: Debe ingresar un número válido entre 1 y 3.");
        }
    } while (isNaN(opcion) || opcion < 1 || opcion > 3);

    let apuesta: number = 0;
    let apuestaValida: boolean;

    console.log(" ");

    if (opcion === 1) {
        const horasEspejo = new HorasEspejo("Horas Espejo","Apuesta mínima de $1000 y máxima $5000. ¡Gánale a la máquina! O con 00:00 multiplica tu apuesta por 10.", apuMin,apuMax,usuario);
        console.log(`Reglamento: ${horasEspejo.getReglamento()}`);

        do {
            const entrada = readlineSync.question("Ingrese el dinero de la apuesta: ");
            if (isNaN(Number(entrada)) || Number(entrada) <= 0) {
                console.error("Error: La apuesta debe ser un número positivo.");
                apuestaValida = false;
            } else {
                apuesta = Number(entrada);
                apuestaValida = horasEspejo.apostar(apuesta);
            }
        } while (!apuestaValida);

        console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
        console.log(" ");
        console.error("🎮 Presione cualquier tecla para comenzar: ");
        readlineSync.question();
        horasEspejo.iniciarPartida();
    } else if (opcion === 2) {
        const horasEspejoSolitario = new HorasEspejoSolitario("Horas Espejo Solitario","Apuesta mínima $1500 y máxima $5000. ¿Qué te dirá el azar? Saca horas espejo, suma 30 o más y gana. O con 00:00 ganas tu apuesta por 10.", apuMinSolitario,apuMaxSolitario,usuario);
        console.log(`Reglamento: ${horasEspejoSolitario.getReglamento()}`);

        do {
            const entrada = readlineSync.question("Ingrese el dinero de la apuesta: ");
            if (isNaN(Number(entrada)) || Number(entrada) <= 0) {
                console.error("Error: La apuesta debe ser un número positivo.");
                apuestaValida = false;
            } else {
                apuesta = Number(entrada);
                apuestaValida = horasEspejoSolitario.apostar(apuesta);
            }
        } while (!apuestaValida);

        console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
        console.log(" ");
        console.error("🎮 Presione cualquier tecla para comenzar: ");
        readlineSync.question();
        horasEspejoSolitario.iniciarPartida();
    } else if (opcion === 3) {
        console.log("Gracias por jugar. ¡Hasta la próxima!");
        continuar = false;
    }

    // Preguntar si desea jugar nuevamente
    if (continuar) {
        console.log("¿Desea jugar otra vez? (1: Sí, 2: No)");
        let respuesta: number;
        do {
            respuesta = readlineSync.questionInt("Respuesta: ");
            if (isNaN(respuesta) || (respuesta !== 1 && respuesta !== 2)) {
                console.error("Error: Debe ingresar 1 (Sí) o 2 (No).");
            }
        } while (isNaN(respuesta) || (respuesta !== 1 && respuesta !== 2));
        continuar = respuesta === 1;
    }
}
    // main de Naty ...
    returnToMenu();
}
