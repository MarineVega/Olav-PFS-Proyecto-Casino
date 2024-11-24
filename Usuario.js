"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    // protected juegoSelecionado: Juego;  // se compone de clase juego??? 
    function Usuario(alias, nombre, dineroInicio) {
        this.rankin = 0;
        this.dineroDisponible = 0;
        this.alias = alias;
        this.nombre = nombre;
        this.dineroInicio = dineroInicio;
    }
    Usuario.prototype.crearAliascuenta = function (alias, Nombre) {
        this.aliasCuenta = this.nombre + " Alias " + this.alias;
    };
    Usuario.prototype.getalias = function () {
        return this.alias;
    };
    Usuario.prototype.setalias = function (alias) {
        if (alias != "") {
            this.alias = alias;
        }
        else {
            this.alias = "Anonimo";
        }
    };
    Usuario.prototype.getnombre = function () {
        return this.nombre;
    };
    Usuario.prototype.setnombre = function (nombre) {
        if (nombre != "") {
            this.nombre = nombre;
        }
        else {
            console.log("Ingrese su nombre para jugar..");
        }
    };
    Usuario.prototype.getaliasCuenta = function () {
        return this.aliasCuenta;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
