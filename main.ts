
import { Veintiuno } from "./Veintiuno";
import { Usuario } from "./Usuario";
import * as rs from "readline-sync";
import { Console } from "console";


console.log(" ");
console.log(" ******************************************** JUEGO 21 *********************************************");

const usuario = new Usuario("Mary", "Mariné", 10000);
const partida1: Veintiuno = new Veintiuno ("Veintiuno Partida 1", "Reglamento", 1000, 5000, usuario);

let continuar: string = "S";
let apuesta: number;
let apuestaValida: boolean;

console.warn("Dinero disponible del usuario: " + usuario.getBilletera());


do {
    apuesta = rs.questionInt("Ingrese el dinero de la apuesta: ");
    apuestaValida = partida1.apostar(apuesta);
} while (!apuestaValida)

console.warn("Dinero disponible del usuario: " + usuario.getBilletera());

if (apuestaValida) {
    console.log("  ")
    console.error("Presione cualquier tecla para comenzar: ");
    rs.question();            
    
    do {    
        partida1.jugar();
        if (!partida1.getFinalizoPartida()) {
            console.warn(partida1.mostrarPartida());
        }
    
        if (!partida1.getFinalizoPartida()) {
            do {
                continuar = rs.question("Desea tirar nuevamente: S/N? ");
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
