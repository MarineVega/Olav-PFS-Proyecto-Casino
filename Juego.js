"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(nombre, reglamento) {
        this.nombre = nombre;
        this.reglamento = reglamento;
        this.apuestaMinima = 100000;
        this.apuestaMaxima = 0;
        this.creditos = 0;
        this.equivalenciaCredito = 0;
    }
    Juego.prototype.iniciarJuego = function (apuMin, apuMax, equivCred) {
        this.setApuestaMinima(apuMin);
        this.setApuestaMaxima(apuMax);
        this.setEquivalenciaCredito(equivCred);
    };
    Juego.prototype.mostrarJuego = function () {
        return "Juego: ".concat(this.getNombre(), "\nReglamento: ").concat(this.getReglamento());
    };
    Juego.prototype.cargarCredito = function (cantCreditos) {
        this.creditos += cantCreditos;
    };
    Juego.prototype.usarCredito = function () {
        this.creditos--;
    };
    //Getter and setters
    Juego.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Juego.prototype.getReglamento = function () {
        return this.reglamento;
    };
    Juego.prototype.setReglamento = function (reglamento) {
        this.reglamento = reglamento;
    };
    Juego.prototype.getApuestaMinima = function () {
        return this.apuestaMinima;
    };
    Juego.prototype.setApuestaMinima = function (apuestaMinima) {
        this.apuestaMinima = apuestaMinima;
    };
    Juego.prototype.getApuestaMaxima = function () {
        return this.apuestaMaxima;
    };
    Juego.prototype.setApuestaMaxima = function (apuestaMaxima) {
        this.apuestaMaxima = apuestaMaxima;
    };
    Juego.prototype.getCreditos = function () {
        return this.creditos;
    };
    Juego.prototype.setCreditos = function (creditos) {
        this.creditos = creditos;
    };
    Juego.prototype.getEquivalenciaCredito = function () {
        return this.equivalenciaCredito;
    };
    Juego.prototype.setEquivalenciaCredito = function (equivalenciaCredito) {
        this.equivalenciaCredito = equivalenciaCredito;
    };
    return Juego;
}());
exports.Juego = Juego;
