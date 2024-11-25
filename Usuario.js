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
    Usuario.prototype.SetAliascuenta = function (alias, nombre) {
        if (alias != "" && nombre != "") {
            this.aliasCuenta = this.nombre + " Alias " + this.alias;
        }
        else if (nombre != "") {
            this.aliasCuenta = this.nombre + " Alias  Jugador Anonimo";
        }
        console.log("Ingrese su Nombre para jugar..!");
    };
    Usuario.prototype.getAlias = function () {
        return this.alias;
    };
    Usuario.prototype.setAlias = function (alias) {
        if (alias != "") {
            this.alias = alias;
        }
        else {
            this.alias = "Anonimo";
        }
    };
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.setNombre = function (nombre) {
        if (nombre != "") {
            this.nombre = nombre;
        }
        else {
            console.log("Ingrese su nombre para jugar..");
        }
    };
    Usuario.prototype.getAliasCuenta = function () {
        return this.aliasCuenta;
    };
    Usuario.prototype.getDineroInicio = function () {
        return this.dineroInicio;
    };
    Usuario.prototype.RegistrarUsuario = function () {
        console.log("Ingrese su nombre completo ");
        var readlineSync = require('readline-sync');
        var nombre = readlineSync.question("Ingrese aqui su nombre: ");
        console.log("Escriba su Alias si lo tiene(opcional)");
        var alias = readlineSync.question("Descripcion u alias: ");
        console.log("Billetera para jugar ");
        var dineroInicio = readlineSync.questionInt('Ingrese dinero a jugar: ');
        if ((nombre != "") && (dineroInicio >= 0)) {
            if (alias === "") {
                alias = "Jugador Anonimo";
            }
            console.log("Cargando datos....");
            console.log(" jugador : ".concat(nombre, " \n alias : ").concat(alias, " \n Billetera  : ").concat(dineroInicio, " \n"));
            this.nombre = nombre;
            this.alias = alias;
            this.dineroInicio = dineroInicio;
        }
    };
    return Usuario;
}());
exports.Usuario = Usuario;
