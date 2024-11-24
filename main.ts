import { TragamonedaPremium } from "./TragamonedaPremiun";
import { Tragamoneda } from "./Tragamoneda";

let tragamonedaPremium: TragamonedaPremium = new TragamonedaPremium(5, 3, 3);
let maximoTiradas: number = tragamonedaPremium.getIntentosMaximos();

for (let index = 0; index <= maximoTiradas; index++) {
    tragamonedaPremium.mostrarResultado();
    
}

console.log(tragamonedaPremium.getValores()
)

