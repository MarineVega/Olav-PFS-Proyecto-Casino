import { Usuario } from "./Usuario";
import { HorasEspejo } from "./HorasEspejo";

function main() {
    // Crear un usuario
    const usuario = new Usuario("Jugador1", "Carlos", 500); // Alias: Jugador1, Nombre: Carlos, Billetera: 500

    // Mostrar información inicial del usuario
    console.log("=== Bienvenido al Juego Horas Espejo ===");
    console.log(`Alias: ${usuario.alias}`);
    console.log(`Nombre: ${usuario.nombre}`);
    console.log(`Saldo inicial: ${usuario.obtenerSaldo()} pesos`);

    // Verificar si el usuario tiene suficiente dinero para iniciar el juego
    const apuestaMinima = 100;
    if (usuario.obtenerSaldo() < apuestaMinima) {
        console.log("No tienes suficiente saldo para jugar. Fin del programa.");
        return;
    }

    // Crear el juego Horas Espejo
    const juegoHorasEspejo = new HorasEspejo(
        "Horas Espejo",
        "Adivina la hora espejo y gana puntos.",
        apuestaMinima,
        500, // Apuesta máxima
        usuario
    );

    // Iniciar el juego
    console.log("\n--- Preparando el juego ---");
    juegoHorasEspejo.iniciarPartida();

    // Mostrar saldo final del usuario
    console.log("\n--- Fin del Juego ---");
    console.log(`Saldo final del jugador: ${usuario.obtenerSaldo()} pesos`);
}

// Ejecutar el programa principal
main();
