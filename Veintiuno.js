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
exports.Veintiuno = void 0;
var Juego_1 = require("./Juego");
//export class Veintiuno extends Juego {
var Veintiuno = /** @class */ (function (_super) {
    __extends(Veintiuno, _super);
    function Veintiuno(nombre, reglamento, apuestaMinima, apuestaMaxima, jugador) {
        var _this = _super.call(this, nombre, reglamento, apuestaMinima, apuestaMaxima, jugador) || this;
        _this.sumatoriaValoresJugador = 0;
        _this.sumatoriaValoresMaquina = 0;
        _this.cantidadCartas = 0;
        _this.ultimaCarta = 0;
        _this.mano = true;
        _this.finalizoPartida = false;
        return _this;
    }
    Veintiuno.prototype.mostrarDatosVeintiuno = function () {
        return "".concat(this.nombre, "\nReglamento: ").concat(this.reglamento, "\nApuesta m\u00EDnima $").concat(this.apuestaMinima, " - Apuesta m\u00E1xima $").concat(this.apuestaMaxima);
    };
    Veintiuno.prototype.setManoJugador = function () {
        this.mano = true;
    };
    Veintiuno.prototype.getFinalizoPartida = function () {
        return this.finalizoPartida;
    };
    Veintiuno.prototype.setFinalizarPartida = function () {
        this.finalizoPartida = true;
    };
    Veintiuno.prototype.obtenerUltimaCarta = function () {
        return this.ultimaCarta;
    };
    Veintiuno.prototype.jugar = function () {
        this.setManoJugador();
        // Tiro carta del jugador        
        this.tirarCarta();
        this.cambiarMano();
        // Tiro carta de la máquina
        this.tirarCarta();
        this.verificarJugada();
    };
    // Cuando inicia el juego, la mano siempre la tiene el jugador, por lo tanto es el que comienza.
    // Las cartas utilizadas son las españolas, del 1 al 12, sin uso de comodines
    Veintiuno.prototype.tirarCarta = function () {
        var cartaMaxima = 12;
        var cartaMinima = 1;
        this.ultimaCarta = Math.floor(Math.random() * (cartaMaxima - cartaMinima + 1) + cartaMinima);
        this.sumatoriaValores();
    };
    Veintiuno.prototype.verificarJugada = function () {
        if (this.sumatoriaValoresJugador > 21) {
            this.detenerPartida(2);
        }
        else if (this.sumatoriaValoresMaquina == 21) {
            this.detenerPartida(3);
        }
        else if (this.sumatoriaValoresMaquina > 21) {
            this.detenerPartida(4);
        }
    };
    /*
    motivos 1: jugador no quizo continuar
            2: jugador se pasó de 21
            3: máquina llegó a 21
            4: máquina se pasó de 21
    */
    Veintiuno.prototype.detenerPartida = function (motivo) {
        var ganador;
        this.setFinalizarPartida();
        ganador = this.determinarGanador(motivo);
        console.log(" ");
        if (ganador === "Jugador") {
            console.warn(this.mostrarResultadoFinal(ganador));
        }
        else {
            console.log(this.mostrarResultadoFinal(ganador));
        }
        console.log(" ");
    };
    Veintiuno.prototype.determinarGanador = function (motivo) {
        var ganador;
        if (this.sumatoriaValoresJugador === this.sumatoriaValoresMaquina) {
            ganador = "Empate";
        }
        else {
            switch (motivo) {
                case 4:
                    ganador = "Jugador";
                    break;
                case 3:
                    ganador = "Maquina";
                    break;
                case 2:
                    ganador = "Maquina";
                    break;
                case 1:
                    if ((this.sumatoriaValoresJugador > this.sumatoriaValoresMaquina)) {
                        ganador = "Jugador";
                    }
                    else {
                        ganador = "Maquina";
                    }
                    break;
            }
        }
        if (ganador === "Jugador") {
            this.pagarApuesta(this.apuesta * 2);
            /*
             let juegosGanados: number;
             juegosGanados += this.jugador.getJuegosGanados();
             this.jugador.setJuegosGanados (juegosGanados);
             */
        }
        return ganador;
    };
    Veintiuno.prototype.cambiarMano = function () {
        // chequeo si la mano la tiene el jugador
        if (this.mano === true) {
            this.mano = false; // cambio la mano para la máquina
        }
        else {
            this.mano = true; // cambio la mano para el jugador
        }
    };
    Veintiuno.prototype.sumatoriaValores = function () {
        if (this.mano === true) { // si la mano la tiene el jugador, sumo la última carga que salió a la sumatoria de sus cartas, incremento en 1 la cantidad de cartas utilizadas por el jugador            
            this.sumatoriaValoresJugador += this.ultimaCarta;
            this.cantidadCartas += 1;
        }
        else {
            this.sumatoriaValoresMaquina += this.ultimaCarta;
        }
    };
    Veintiuno.prototype.mostrarPartida = function () {
        return "Valor obtenido por el jugador: ".concat(this.sumatoriaValoresJugador, ", en ").concat(this.cantidadCartas, " tiradas.");
    };
    Veintiuno.prototype.mostrarResultadoFinal = function (ganador) {
        if (ganador == "Maquina") {
            return "Resultado de la partida: PERDI\u00D3 \uD83D\uDE12\uD83D\uDC4E \n  Valor obtenido por el jugador: ".concat(this.sumatoriaValoresJugador, ". \n  Valor obtenido por la m\u00E1quina: ").concat(this.sumatoriaValoresMaquina, ", en ").concat(this.cantidadCartas, " tiradas. ");
        }
        else if (ganador == "Jugador") {
            return "Resultado de la partida: \uD83C\uDFC6 GANADOR!!! \uD83C\uDFC6\uD83E\uDD47\uD83C\uDF89\uD83E\uDD73 \n  Valor obtenido por el jugador: ".concat(this.sumatoriaValoresJugador, ". \n  Valor obtenido por la m\u00E1quina: ").concat(this.sumatoriaValoresMaquina, ", en ").concat(this.cantidadCartas, " tiradas. ");
        }
        else {
            return "\uD83E\uDD37 Hubo un empate entre el jugador y la m\u00E1quina, ambos obtuvieron un total de ".concat(this.sumatoriaValoresJugador, ", en ").concat(this.cantidadCartas, " tiradas.");
        }
    };
    return Veintiuno;
}(Juego_1.Juego));
exports.Veintiuno = Veintiuno;
