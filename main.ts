import { TragamonedaPremium } from "./TragamonedaPremiun";
import { Tragamoneda } from "./Tragamoneda";

let tragamonedaPremium: TragamonedaPremium = new TragamonedaPremium(5, 3, 4);

for (let index = 0; index <= tragamonedaPremium.getIntentosMaximos(); index++) {
    tragamonedaPremium.mostrarResultado();

    
}

console.log(tragamonedaPremium.getValores()
)

