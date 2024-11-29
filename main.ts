import { Apuesta } from "./Apuesta";
import { Casino } from "./Casino";
import { Juego } from "./Juego"
import { Usuario } from "./Usuario";
import { Tragamoneda } from "./Tragamoneda";
import { TragamonedaSports } from "./TragamonedaSport";
import { TragamonedaPremium } from "./TragamonedasPremiun";
import * as readlineSync from "readline-sync";
import { Veintiuno } from "./Veintiuno";
import { HorasEspejoSolitario } from "./HorasEspejoSolitario";
import { HorasEspejo } from "./HorasEspejo";
import { juegoTragamonedasSport } from "./Funciones_main/FuncionJuegoTragamonedasSport";
import { juegoTragamonedasPremiun } from "./Funciones_main/FuncionJuegoTragamonedasPremiun";
import { juegoVeintiuno } from "./Funciones_main/FuncionJuegoVeintiuno";
import { recargarDinero } from "./Funciones_main/FuncionRecargaDinero";
import { juegoHorasEspejo } from "./Funciones_main/FuncionJuegoHorasEspejo";

//___________________ Inicia la aplicación ________________________________

let casino1: Casino = new Casino("Juego Limpio");
console.log("Bienvenido al casino .Por favor registrese para seguir... \n");
const usuario = new Usuario('', '', 0);
usuario.RegistrarUsuario();
casino1.darBienvenida(usuario);
menuCasino();

//____________________ Menu principal de juegos _____________________________
 export function menuCasino(): void {

    console.log(`Seleccione ${usuario.nombre} el juego que desee..! \n `);
    console.log("1. Opcion 1: Tragamonedas");
    console.log("2. Opcion 2: Tragamonedas Premiun ");
    console.log("3. Opcion 3: veitiuno");
    console.log("4. Opcion 4: HorasEspejo");
    console.log("5. Opcion 5: Recargar Dinero 💸");
    console.log("6. Opcion 6: Retirar el dinero y salir del casino ");

    const opcion = readlineSync.question("Selecciona una opcion: ");

    switch (opcion) {
        case "1":
            juegoTragamonedasSport(usuario);
            break;
        case "2":
            juegoTragamonedasPremiun(usuario);
            break;
        case "3":
            juegoVeintiuno(usuario);
            break;
        case "4":
            juegoHorasEspejo(usuario);
            break;
        case "5":
             recargarDinero(usuario);
            break;
        case "6":
            console.log("Saliendo del casino. ¡Hasta pronto!");
            break;

        default:
            console.log("Opción no valida. Intentalo de nuevo.");
            menuCasino(); // Vuelve al menú principal
            break;
    }
}





