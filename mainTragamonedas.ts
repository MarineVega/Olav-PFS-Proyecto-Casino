import { Casino } from "./Casino";
import { Juego } from "./abstractas/Juego"
import { Usuario } from "./Usuario";
import { TragamonedaSports } from "./juegos/TragamonedaSports";
import { TragamonedaPremium } from "./juegos/TragamonedaPremium";

// Se crea un usuario (jugador) para probar los Tragamonedas Sports y Premium
const usuario1 = new Usuario("Antito", "Antonela Di Pinto", 10000);
const usuario2 = new Usuario("Naty", "Natalia Gelmi", 50000);

// Se crea una instancia de Tragamoneda Sports y una de Tragamoneda Premium
const tragamonedaSports = new TragamonedaSports("Tragamoneda Sports", "Reglamento de Juegos Deportivos", 1000, 15000, usuario1, 5);
const tragamonedaPremium = new TragamonedaPremium("TragaMoneda Premium", "Reglas del juego", 2500, 25000, usuario2, 3);

//Se muestra el resultado de las tiradas
let intentosP: number = tragamonedaPremium.getIntentosMaximos();

while(intentosP > 0){
    tragamonedaPremium.mostrarResultado(); 
    intentosP = tragamonedaPremium.getIntentosMaximos();
}

tragamonedaPremium.mostrarResultado(); //intento hacer tiradas cuando ya no tengo mas intentos

//Prueba con Sports
let intentosS: number = tragamonedaSports.getIntentosMaximos();

while(intentosS > 0){
    tragamonedaSports.mostrarResultado(); 
    intentosS = tragamonedaSports.getIntentosMaximos();
}

tragamonedaSports.mostrarResultado(); //intento hacer tiradas cuando ya no tengo mas intentos

