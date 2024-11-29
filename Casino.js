"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
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
    Casino.prototype.darBienvenida = function (usuario) {
        console.log("\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557");
        console.log("\u2551\uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0 ...Bienvenidos... \uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0\u2551");
        console.log("\u2551\uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0  Casino ".concat(this.getNombre(), "    \uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0\u2551"));
        console.log("\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n");
    };
    Casino.prototype.despedir = function () {
        return "Gracias por elegir ".concat(this.getNombre(), ", volve pronto!!!");
    };
    return Casino;
}());
exports.Casino = Casino;
