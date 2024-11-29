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
exports.Tragamoneda = void 0;
var Juego_1 = require("./Juego");
var Tragamoneda = /** @class */ (function (_super) {
    __extends(Tragamoneda, _super);
    function Tragamoneda(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos) {
        var _this = _super.call(this, nombre, reglamento, apuMin, apuMax, jugador) || this;
        _this.barras = [];
        _this.valores = [];
        _this.numBarras = 3;
        _this.numElementos = 5;
        _this.intentosMaximos = intentosMaximos;
        return _this;
    }
    Tragamoneda.prototype.generarBarra = function (numElementos) {
        var barra = [];
        for (var i = 0; i < numElementos; i++) {
            var valorAleatorio = this.valores[Math.floor(Math.random() * this.valores.length)];
            barra.push(valorAleatorio);
        }
        return barra;
    };
    Tragamoneda.prototype.inicializarBarras = function () {
        var _this = this;
        this.barras = Array.from({ length: this.numBarras }, function () { return _this.generarBarra(_this.numElementos); });
    };
    Tragamoneda.prototype.getIntentosMaximos = function () {
        return this.intentosMaximos;
    };
    Tragamoneda.prototype.setIntentosMaximos = function (intentosMaximos) {
        this.intentosMaximos = intentosMaximos;
    };
    Tragamoneda.prototype.setNumBarras = function (numBarras) {
        this.numBarras = numBarras;
        this.inicializarBarras();
    };
    Tragamoneda.prototype.setNumElementos = function (numElementos) {
        this.numElementos = numElementos;
        this.inicializarBarras();
    };
    Tragamoneda.prototype.tirar = function () {
        if (this.intentosMaximos <= 0) {
            console.log("Upss❗ No quedan más intentos 🥺");
            return [];
        }
        var resultado = [];
        for (var index = 0; index < this.barras.length; index++) {
            var barra = this.barras[index];
            var posicionAleatoria = Math.floor(Math.random() * barra.length);
            resultado.push(barra[posicionAleatoria]);
        }
        this.intentosMaximos--;
        console.log("Acabas de tirar! Buena suerte 🤞");
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
}(Juego_1.Juego));
exports.Tragamoneda = Tragamoneda;
