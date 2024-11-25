
import { Veintiuno } from "./Veintiuno";
import { Usuario } from "./Usuario";
import * as rs from "readline-sync";
import { log } from "console";

console.log(" ");
console.log(" ******************************************** JUEGO 21 *********************************************");

const usuario = new Usuario("Mary", "Mariné", 10000);
const partida1: Veintiuno = new Veintiuno ("Veintiuno Partida 1", "Reglamento", 100,500, usuario);

let continuar: string = "S";
let apuesta: number;
let apuestaValida: boolean;

console.log("Dinero disponible del usuario: " + usuario.getDineroDisponible());


do {
    apuesta = rs.questionInt("Ingrese el dinero de la apuesta: ");
    apuestaValida = partida1.apostar(apuesta);
} while (!apuestaValida)

console.log("Dinero disponible del usuario: " + usuario.getDineroDisponible());

if (apuestaValida) {

    do {    
        partida1.jugar();
        if (!partida1.getFinalizoPartida()) {
            console.log(partida1.mostrarPartida());
        }
    
        if (!partida1.getFinalizoPartida()) {
            do {
                continuar = rs.question("Desea tirar nuevamente: S/N? ");
                // chequeo que ingrese una opción válida
            } while (!["S", "s", "N", "n"].includes(continuar))        
        }  
    } while ((continuar == "S" || continuar == "s") && !partida1.getFinalizoPartida())
        
        
    // chequeo si salió porque el usuario no quiso continuar
    if (continuar == "N" || continuar == "n") {    
        partida1.detenerPartida(1);
    }
    
    console.log("Dinero disponible del usuario: " + usuario.getDineroDisponible());
}

/*

// Crear un usuario con un saldo inicial y disponible
const usuario = new Usuario('master','Juan', 2000); // Nombre, dinero inicial, saldo disponible en billetera

// Crear el juego con el usuario
const juego = new HorasEspejo(usuario);

// Mostrar estado inicial
console.log(`--- Estado Inicial ---`);
console.log(`Jugador: ${usuario.nombre}`);
console.log(`Saldo inicial: ${usuario.dineroInicio} créditos.`);
console.log(`Apuesta mínima: ${juego['apuestaMinima']} créditos.\n`);

// Intentar apostar la cantidad mínima para iniciar el juego
console.log(`Intentando iniciar la partida con la apuesta mínima (${juego['apuestaMinima']} créditos)...`);
juego.apostar(juego['apuestaMinima']); // Usar directamente la propiedad apuestaMinima de la clase


*/



//console.log(partida1.mostrarResultadoFinal());

// OJO!!!!!! al método protected abstract determinarGanador(motivo: number): void; de la clase Juego, tuve que agregarle un param -> motivo: number
// método verificarDinero --> uso el param dinero disponible como costo, porque al dinero disponible puedo obtenerlo del usuario
// agregué atributo -->  private finalizoPartida: boolean;
// para que el jugador pueda irse y ganar, debe tener más de 16 puntos ?????
// cómo vamos seteando el ranking cuando gana? será un método de la interfaz???
// a usuario le agregué el método getDineroDisponible y setDineroDisponible
