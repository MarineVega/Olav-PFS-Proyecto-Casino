"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tragamoneda = void 0;
var Tragamoneda = /** @class */ (function () {
    function Tragamoneda(intentosMaximos, numBarras, numPosiciones) {
        var _this = this;
        this.intentosMaximos = intentosMaximos;
        this.valores = ["🏀", "🎱", "🏐", "⚽", "🏈", "🏉", "🏓", "🥊", "🏑", "🎾", "⛸️", "⛳"];
        this.barras = Array.from({ length: numBarras }, function () { return _this.generarBarra(numPosiciones); });
    }
    Tragamoneda.prototype.getIntentosMaximos = function () {
        return this.intentosMaximos;
    };
    Tragamoneda.prototype.getValores = function () {
        return this.valores;
    };
    Tragamoneda.prototype.setIntentosMaximos = function (intentosMaximos) {
        this.intentosMaximos = intentosMaximos;
    };
    Tragamoneda.prototype.generarBarra = function (numPosiciones) {
        var barra = [];
        for (var i = 0; i < numPosiciones; i++) {
            var valorAleatorio = this.valores[Math.floor(Math.random() * this.valores.length)];
            barra.push(valorAleatorio);
        }
        console.log(barra);
        return barra;
    };
    Tragamoneda.prototype.tirar = function () {
        if (this.intentosMaximos <= 0) {
            console.log("Upss❗ No quedan más intentos 🥺.");
            return [];
        }
        var resultado = [];
        for (var index = 0; index < this.barras.length; index++) {
            var barras = this.barras[index];
            var posicionAleatoria = Math.floor(Math.random() * barras.length);
            resultado.push(barras[posicionAleatoria]);
        }
        this.intentosMaximos--;
        console.log("Acaba de tirar! Buena suerte 🤞");
        return resultado;
    };
    Tragamoneda.prototype.mostrarResultado = function () {
        var resultado = this.tirar();
        if (resultado.length > 0) {
            console.log("Resultado de la tirada:", resultado.join(" | "));
            console.log("Intentos Restantes:", this.intentosMaximos);
        }
    };
    return Tragamoneda;
}());
exports.Tragamoneda = Tragamoneda;
