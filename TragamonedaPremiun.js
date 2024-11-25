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
    function TragamonedaPremium(intentosMaximos, numBarras, numPosiciones) {
        var _this = _super.call(this, intentosMaximos, numBarras, numPosiciones) || this;
        _this.FACTOR_SUERTE = 2; //Mas de 2 --> Mucha probabilidad que salga comodin
        _this.comodin = "🃏";
        _this.agregarComodin();
        _this.barras = Array.from({ length: numBarras }, function () { return _this.generarBarra(numPosiciones); }); //El comodiin se agrega a los posibles valores
        return _this;
    }
    TragamonedaPremium.prototype.agregarComodin = function () {
        for (var index = 0; index < this.FACTOR_SUERTE; index++) {
            this.valores.push(this.comodin);
        }
    };
    //METODO TIRAR CON LA POSIBILIDAD DE QUE SALGA EL COMODIN (SE PUEDE MEJORAR UN MONTOOOOON) lleva
    TragamonedaPremium.prototype.tirarPremium = function () {
        var resultado = _super.prototype.tirar.call(this); // DESCUBRI QUE SE PUEDE USAR UN METODO DE LA CLASE QUE HEREDA CON SUPER
        //IF LLEVADO A MOSTRAR RESULTADO
        // if (resultado.length > 0 && resultado.includes(this.comodin)) { 
        //     // SE LE DA LA TIRADA ADICIONAL AL USUSARIO SI SALE EL COMODIN Y NO SE DESCUENTA EL INTENTO
        //     console.log("¡Has sacado el Comodín 🎉! Tienes una tirada adicional GRATIS 🆓");
        //     this.agregarTirada(); //Agrego tirada gratis al jugador
        //     //const tiradaAdicional = this.tirar();
        //    //resultado.push(...tiradaAdicional); //AGREGA LA TIRADA QUE GANO EL USUARIO A LOS INTENTOS RESTANTES QUE TIENE
        // }
        return resultado;
    };
    TragamonedaPremium.prototype.mostrarResultado = function () {
        var resultado = _super.prototype.tirar.call(this);
        if (resultado.length > 0) {
            console.log("Resultado de la tirada:", resultado.join(" | "));
        }
        if (resultado.length > 0 && resultado.includes(this.comodin)) {
            // SE LE DA LA TIRADA ADICIONAL AL USUSARIO SI SALE EL COMODIN Y NO SE DESCUENTA EL INTENTO
            console.log("¡Has sacado el Comodín 🎉! Tienes una tirada adicional GRATIS 🆓");
            this.agregarTirada(); //Agrego tirada gratis al jugador
            //const tiradaAdicional = this.tirar();
            //resultado.push(...tiradaAdicional); //AGREGA LA TIRADA QUE GANO EL USUARIO A LOS INTENTOS RESTANTES QUE TIENE
        }
        console.log("Intentos Restantes:", this.intentosMaximos);
    };
    TragamonedaPremium.prototype.getComodin = function () {
        return this.comodin;
    };
    TragamonedaPremium.prototype.agregarTirada = function () {
        this.intentosMaximos++;
    };
    return TragamonedaPremium;
}(Tragamoneda_1.Tragamoneda));
exports.TragamonedaPremium = TragamonedaPremium;
