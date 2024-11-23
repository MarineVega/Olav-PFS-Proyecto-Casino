"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var Tragamoneda_1 = require("./Tragamoneda");
var TragamonedaPremiun_1 = require("./TragamonedaPremiun");
var Casino = /** @class */ (function () {
    function Casino(nombre) {
        this.nombre = nombre;
        this.usuarios = [];
        this.juegos = [];
    }
    Casino.prototype.getNombre = function () {
        return this.nombre;
    };
    Casino.prototype.getUsuarios = function () {
        return this.usuarios;
    };
    Casino.prototype.getJuegos = function () {
        return this.juegos;
    };
    Casino.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Casino.prototype.mostrarCasino = function () {
        return "Casino: ".concat(this.getNombre(), " \n Usuarios del Casino: ").concat(this.getUsuarios(), " \n Juegos del Casino: ").concat(this.getJuegos());
    };
    Casino.prototype.listarNombres = function (arreglo) {
        var cadena = ' ';
        arreglo.forEach(function (a) { return cadena += "\n ".concat(a.getNombre()); });
        return cadena;
    };
    Casino.prototype.darBienvenida = function () {
        console.log("Bienvenido al Casino ".concat(this.getNombre()));
    };
    Casino.prototype.despedir = function () {
        return "Gracias por elegir ".concat(this.getNombre(), ", volve pronto!!!");
    };
    return Casino;
}());
exports.Casino = Casino;
var tragamonedaSports1 = new Tragamoneda_1.Tragamoneda(6, 3, 5);
var tragamonedaSports2 = new Tragamoneda_1.Tragamoneda(4, 3, 4);
/*tragamonedaSports1.mostrarResultado();
tragamonedaSports2.mostrarResultado();
console.log(tragamonedaSports2);*/
var tragamonedaPremium = new TragamonedaPremiun_1.TragamonedaPremium(3, 3, 4);
// Realiza una tirada normal
tragamonedaPremium.mostrarResultado();
tragamonedaPremium.mostrarResultado();
tragamonedaPremium.mostrarResultado();
