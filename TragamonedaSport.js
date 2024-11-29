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
exports.TragamonedaSports = void 0;
var Tragamoneda_1 = require("./Tragamoneda");
var TragamonedaSports = /** @class */ (function (_super) {
    __extends(TragamonedaSports, _super);
    function TragamonedaSports(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos) {
        var _this = _super.call(this, nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos) || this;
        _this.valores = ["🏀", "🎱", "🏐", "⚽", "🏈", "🏉", "🏓", "🥊", "🏑", "🎾", "⛸️", "⛳"];
        //this.valores = ["🏀"];// Nos permite probar el método en caso de que salgan tres valores iguales.
        _this.inicializarBarras();
        return _this;
    }
    TragamonedaSports.prototype.bonificacionDeTirada = function (resultado) {
        if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log("Ganaste\uD83C\uDFC6\u203C\uFE0F \uD83C\uDF89 Sacaste tres ".concat(resultado[0], " iguales \uD83C\uDF89 Se suma dinero a tu billetera\uD83D\uDCB2\uD83D\uDCB0"));
            this.jugador.agregarDinero(3000);
        }
        else if (resultado[0] === resultado[1] || resultado[1] === resultado[2] || resultado[0] === resultado[2]) {
            console.log("\u00A1Bonificaci\u00F3n! \uD83C\uDF89 Has sacado dos deportes iguales \uD83C\uDF89 Se suma dinero a tu billetera\uD83D\uDCB2\uD83D\uDCB0");
            this.jugador.agregarDinero(1500);
        }
    };
    TragamonedaSports.prototype.mostrarResultado = function () {
        if (this.getIntentosMaximos() >= 0) {
            var resultado = this.tirar();
            if (resultado.length > 0) {
                console.log("| ".concat(resultado.join("  |  "), "|"));
                console.log("Intentos Restantes:", this.intentosMaximos);
                console.log("\n");
                this.bonificacionDeTirada(resultado);
            }
        }
    };
    return TragamonedaSports;
}(Tragamoneda_1.Tragamoneda));
exports.TragamonedaSports = TragamonedaSports;
