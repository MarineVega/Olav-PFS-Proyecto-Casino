"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TragamonedaPremiun_1 = require("./TragamonedaPremiun");
var tragamonedaPremium = new TragamonedaPremiun_1.TragamonedaPremium(5, 3, 3);
var maximoTiradas = tragamonedaPremium.getIntentosMaximos();
while (maximoTiradas > 0) {
    tragamonedaPremium.mostrarResultado();
    maximoTiradas = tragamonedaPremium.getIntentosMaximos();
}
console.log(tragamonedaPremium.getValores());
