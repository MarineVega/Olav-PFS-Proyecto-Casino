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

// ___________________ jugar Tragamonedas Sport ________________________

export function juegoTragamonedasSport(usuario:Usuario) {
    const apuMin=1000;
    const apuMax=15000

    console.log("Estas jugando en version Sport de tragamonedas \n");
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}`);
    console.log(`Apuesta  💸 $  ${apuMin} Hasta.. $ ${apuMax}`);
    console.log("Ingrese el dinero que desea apostar...!  ");
    const readlineSync = require('readline-sync');
    const dineroApostado: number = readlineSync.questionInt("Ingrese una suma en $ : ");
    const tragamonedaSports = new TragamonedaSports("Tragamoneda Sports", "Reglamento de Juegos Deportivos", apuMin, apuMax, usuario, 5);
   
    if (tragamonedaSports.apostar(dineroApostado)) {
    //Prueba con Sports
    let intentosS: number = tragamonedaSports.getIntentosMaximos();
    while (intentosS > 0) {
        tragamonedaSports.mostrarResultado();
        intentosS = tragamonedaSports.getIntentosMaximos();
    }
    }
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}\n`);

    returnToMenu();
}
