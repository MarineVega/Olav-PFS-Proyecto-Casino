import { TragamonedaPremium } from "./TragamonedaPremiun";
import { Tragamoneda } from "./Tragamoneda";

let tragamonedaPremium: TragamonedaPremium = new TragamonedaPremium(5, 3, 3);
let maximoTiradas: number = tragamonedaPremium.getIntentosMaximos();

while (maximoTiradas > 0){
    tragamonedaPremium.mostrarResultado();
    maximoTiradas = tragamonedaPremium.getIntentosMaximos();

}

console.log(tragamonedaPremium.getValores());

