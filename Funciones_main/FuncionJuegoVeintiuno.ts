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

// ___________________ jugar Veintiuno _____________________________


export function juegoVeintiuno(usuario): void {
    const apuMin=1000;
    const apuMax=5000

    console.log(" ");
    console.log(" ******************************************** JUEGO 21 *********************************************");
    let dinero=usuario.obtenerSaldo()
    //const usuario = new Usuario("Mary", "Mariné", 10000);
    const partida1: Veintiuno = new Veintiuno ("Veintiuno Partida 1", "Reglamento", apuMin, apuMax, usuario);
    
    let continuar: string = "S";
    let apuesta: number;
    let apuestaStr: string;
    let apuestaValida: boolean;
    
    console.log(" ")
    console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
    console.log(" ")
    console.error(partida1.mostrarDatosVeintiuno());
    console.log(" ")
    
    do {
        apuestaStr = readlineSync.question("Ingrese el dinero de la apuesta: ");    
        apuesta = parseInt(apuestaStr);
    
        if (apuesta) {
            apuestaValida = partida1.apostar(apuesta);
        } else {
            console.error("ERROR!!! debe ingresar una apuesta válida.");
        }
        
    } while (!apuestaValida)
    
    console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
    
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
        
        console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
        console.log(" ");
    }
    //main de Marine ....

    returnToMenu();
}

