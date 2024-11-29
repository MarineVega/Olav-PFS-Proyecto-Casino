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
import { menuCasino } from "../main";

//____________________ retorno para jugar ____________________________
export function returnToMenu(): void {
    console.log("\nPresiona Enter para regresar al menu principal...");
    readlineSync.question(); // Pausa para el usuario ingrese enter
    menuCasino(); // Vuelve al menú principal
}
