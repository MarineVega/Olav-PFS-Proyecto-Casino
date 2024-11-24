
import { Veintiuno } from "./Veintiuno";
import * as readlineSync from "readline-sync";

console.log(" ");
console.log(" ******************************************** JUEGO 21 *********************************************");

let partida1: Veintiuno = new Veintiuno ("Veintiuno Partida 1", "Reglamento" ,100,500);

let continuar: string;

do {    
    partida1.jugar();
    if (!partida1.getFinalizoPartida()) {
        console.log(partida1.mostrarPartida());
    }

    if (!partida1.getFinalizoPartida()) {
        do {
            continuar = readlineSync.question("Desea tirar nuevamente: S/N? ");
            // chequeo que ingrese una opción válida
        } while (!["S", "s", "N", "n"].includes(continuar))        
    }  
} while ((continuar == "S" || continuar == "s") && !partida1.getFinalizoPartida())


    
// chequeo si salió porque el usuario no quiso continuar
if (continuar == "N" || continuar == "n") {    
    partida1.detenerPartida(1);
}


//console.log(partida1.mostrarResultadoFinal());

// OJO!!!!!! al método protected abstract determinarGanador(motivo: number): void; de la clase Juego, tuve que agregarle un param -> motivo: number
// agregué atributo -->  private finalizoPartida: boolean;
// para que el jugador pueda irse y ganar, debe tener más de 16 puntos ?????
// cómo vamos seteando el ranking cuando gana? será un método de la interfaz???
