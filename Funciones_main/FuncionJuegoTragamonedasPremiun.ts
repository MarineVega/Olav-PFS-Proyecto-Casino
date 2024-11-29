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

//__________________ jugar Tragamonedas Premiun ______________________

export function juegoTragamonedasPremiun(usuario:Usuario): void {
    const apuMin=2500;
    const apuMax=25000

    console.log("Estas jugando en version de tragamonedas Premiun \n");
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}`);
    console.log(`Apuesta  💸 $  ${apuMin} Hasta.. $ ${apuMax}`);
    console.log("Ingrese el dinero que desea apostar...!  ");
    const readlineSync = require('readline-sync');
    const dineroApostado: number = readlineSync.questionInt("Ingrese una suma en $ : ");
    const tragamonedaPremium = new TragamonedaPremium("TragaMoneda Premium", "Reglas del juego", apuMin, apuMax, usuario, 3);

    if (tragamonedaPremium.apostar(dineroApostado)) {

        let intentosP: number = tragamonedaPremium.getIntentosMaximos();
        while (intentosP > 0) {
            tragamonedaPremium.mostrarResultado();
            intentosP = tragamonedaPremium.getIntentosMaximos();
        }


    }
    
    console.log(`Saldo en su Billetera : $ ${usuario.obtenerSaldo()}\n`);

    returnToMenu();
}
