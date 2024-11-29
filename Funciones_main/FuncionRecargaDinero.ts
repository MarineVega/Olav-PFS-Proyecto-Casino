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

export function recargarDinero(usuario:Usuario){

    console.log(`Ingrese dinero para recargar Billetera...💸  .Su saldo actual de $: ${usuario.obtenerSaldo()}`);
    const readlineSync = require('readline-sync');
    const dineroRecarga: number = readlineSync.questionInt("Ingrese una suma en $ : ");
    usuario.agregarDinero(dineroRecarga);
    console.log(`Su saldo actual recargado es de $: ${usuario.obtenerSaldo()}`);

    returnToMenu();
}
