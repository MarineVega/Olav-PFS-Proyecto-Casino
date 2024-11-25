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
    Casino.prototype.darBienvenida = function (nombre) {
        console.log("Bienvenido  !!!!   ".concat(nombre, "   al Casino  ").concat(this.getNombre(), " \n"));
    };
    Casino.prototype.despedir = function () {
        return "Gracias por elegir ".concat(this.getNombre(), ", volve pronto!!! \n");
    };
    return Casino;
}());
exports.Casino = Casino;
