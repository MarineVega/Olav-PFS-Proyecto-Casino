"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TragamonedaPremium = void 0;
var Tragamoneda_1 = require("./Tragamoneda");
var TragamonedaPremium = /** @class */ (function (_super) {
    __extends(TragamonedaPremium, _super);
    function TragamonedaPremium(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos) {
        var _this = _super.call(this, nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos) || this;
        _this.FACTOR_SUERTE = 2;
        _this.valores = ["🍎", "🍐", "🍇", "🍍", "🍉", "🍏", "🍒", "🍊", "🫐", "🍌"];
        //this.valores = ["🍎", "🍐"]; // Nos permite probar el método en caso de que salgan dos valores iguales.
        _this.comodin = "🃏";
        _this.agregarComodin();
        _this.barras = Array.from({ length: _this.numBarras }, function () { return _this.generarBarra(_this.numElementos); });
        return _this;
    }
    TragamonedaPremium.prototype.getComodin = function () {
        return this.comodin;
    };
    TragamonedaPremium.prototype.agregarComodin = function () {
        for (var index = 0; index < this.FACTOR_SUERTE; index++) {
            this.valores.push(this.comodin);
        }
    };
    TragamonedaPremium.prototype.bonificacionDeTirada = function (resultado) {
        if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log("Ganaste\uD83C\uDFC6\u203C\uFE0F \uD83C\uDF89 Sacaste tres ".concat(resultado[0], " iguales \uD83C\uDF89 Se suma dinero a tu billetera\uD83D\uDCB2\uD83D\uDCB0"));
            this.jugador.agregarDinero(5000);
        }
        else if (resultado[0] === resultado[1] || resultado[1] === resultado[2] || resultado[0] === resultado[2]) {
            console.log("\u00A1Bonificaci\u00F3n! \uD83C\uDF89 Has sacado dos frutas iguales \uD83C\uDF89 Se suma dinero a tu billetera\uD83D\uDCB2\uD83D\uDCB0");
            this.jugador.agregarDinero(2500);
        }
    };
    TragamonedaPremium.prototype.mostrarResultado = function () {
        if (this.getIntentosMaximos() >= 0) {
            var resultado = this.tirar();
            if (resultado.length > 0) {
                console.log("Resultado de la tirada:", resultado.join(" | "));
            }
            if (resultado.includes(this.comodin)) {
                this.duplicarIntentos();
            }
            if (this.getIntentosMaximos() > 0) {
                this.bonificacionDeTirada(resultado);
            }
            console.log("Intentos Restantes:", this.intentosMaximos);
        }
    };
    TragamonedaPremium.prototype.duplicarIntentos = function () {
        if (this.getIntentosMaximos() > 0) { //Si tiene 0 intentos, no duplica
            var intentosAntes = this.getIntentosMaximos();
            this.intentosMaximos *= 2;
            console.log("🎊 Has obtenido el comodin 🎊 ¡Duplicaste tus intentos! 🎁 Ahora tienes", this.intentosMaximos, "intentos! Antes tenias", intentosAntes, "👍");
        }
        else {
            console.log("Mala Suerte!🥺 Has obtenido el comodin 🎊 Pero no tenias intentos restantes 😭");
        }
    };
    return TragamonedaPremium;
}(Tragamoneda_1.Tragamoneda));
exports.TragamonedaPremium = TragamonedaPremium;
