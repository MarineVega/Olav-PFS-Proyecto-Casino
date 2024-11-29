"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
var Juego = /** @class */ (function () {
    function Juego(nombre, reglamento, apuMin, apuMax, jugador) {
        this.nombre = nombre;
        this.reglamento = reglamento;
        this.dinero = 0;
        this.setApuestaMinima(apuMin);
        this.setApuestaMaxima(apuMax);
        this.jugador = jugador;
        this.apuesta = 0;
    }
    //Interface Apuesta
    Juego.prototype.iniciarJuego = function (dinero) {
        this.cargarDinero(dinero);
    };
    Juego.prototype.mostrarJuego = function () {
        return "Juego: ".concat(this.getNombre(), "\nReglamento: ").concat(this.getReglamento());
    };
    Juego.prototype.cargarDinero = function (cantDinero) {
        this.dinero += cantDinero;
    };
    Juego.prototype.usarDinero = function (cantDinero) {
        this.dinero = -cantDinero;
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
    Juego.prototype.getDinero = function () {
        return this.dinero;
    };
    Juego.prototype.setDinero = function (creditos) {
        this.dinero = creditos;
    };
    Juego.prototype.apostar = function (costo) {
        if (this.validarMinimosMaximos(costo)) {
            if (this.verificarDinero(costo)) {
                if (this.gastarDinero(costo)) {
                    console.log("La apuesta de ".concat(costo, " se realiz\u00F3 exitosamente"));
                    return true;
                }
                else {
                    console.log("El dinero disponible no es suficiente para realizar la apuesta.");
                    return false;
                }
            }
            else {
                console.log("El dinero disponible no es suficiente para realizar la apuesta.");
                return false;
            }
        }
        else {
            console.log("El dinero apostado $ ".concat(costo, " excede los rangos admitidos de apuesta m\u00EDnima ($ ").concat(this.apuestaMinima, ") y/o apuesta m\u00E1xima ($ ").concat(this.apuestaMaxima, ").\nVuelva a realizar la apuesta"));
            return false;
        }
    };
    ;
    // Chequeo que el dinero disponible del jugador le alcance para realizar la apuesta
    Juego.prototype.verificarDinero = function (costo) {
        if (this.jugador.obtenerSaldo() >= costo) {
            return true;
        }
        else {
            return false;
        }
    };
    ;
    Juego.prototype.gastarDinero = function (monto) {
        var disponible;
        disponible = this.jugador.obtenerSaldo() - monto;
        if (disponible >= 0) {
            this.jugador.setBilletera(disponible);
            this.apuesta = monto;
            return true;
        }
        else {
            return false;
        }
    };
    ;
    Juego.prototype.pagarApuesta = function (dinero) {
        var juegosGanados = this.jugador.getJuegosGanados();
        juegosGanados += juegosGanados;
        this.jugador.setJuegosGanados(juegosGanados);
        var disponible = this.jugador.obtenerSaldo();
        disponible += dinero;
        this.jugador.setBilletera(disponible);
        console.log("");
        console.log("💸💸💸💸💸💸");
        console.log("Felicitaciones!!! gan\u00F3 $ ".concat(dinero, " \uD83D\uDCB0"));
        console.log("Tiene $ ".concat(this.jugador.obtenerSaldo(), " disponibles para seguir jugando!!!"));
    };
    ;
    Juego.prototype.validarMinimosMaximos = function (costo) {
        if (costo >= this.apuestaMinima && costo <= this.apuestaMaxima) {
            return true;
        }
        else {
            return false;
        }
    };
    return Juego;
}());
exports.Juego = Juego;
