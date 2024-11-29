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
exports.HorasEspejo = void 0;
var Juego_1 = require("./Juego");
var HorasEspejo = /** @class */ (function (_super) {
    __extends(HorasEspejo, _super);
    function HorasEspejo(nombre, reglamento, apuMin, apuMax, jugador) {
        var _this = _super.call(this, nombre, reglamento, apuMin, apuMax, jugador) || this;
        _this.hora = 0;
        _this.minutos = 0;
        _this.intentosJugador = 3;
        _this.intentosMaquina = 3;
        _this.puntosAcumulados = 0;
        _this.puntosAcumuladosMaquina = 0;
        _this.jugador = jugador;
        _this.horasEspejo = [
            "01:10", "02:20", "03:30", "04:40", "05:50",
            "10:01", "11:11", "12:21", "13:31", "14:41",
            "15:51", "20:02", "21:12", "22:22", "23:32", "00:00"
        ];
        _this.puntos10 = [
            "02:20", "03:30", "04:40", "05:50", "10:01",
            "12:21", "13:31", "14:41", "15:51", "20:02",
            "21:12", "23:32"
        ];
        _this.puntos25 = ["11:11", "22:22"];
        return _this;
    }
    // Generar una hora espejo aleatoria
    HorasEspejo.prototype.generarHoraEspejo = function () {
        var generarEspejo = Math.random() < 0.3; // 30% de probabilidad de generar una hora espejo
        if (generarEspejo) {
            var indiceAleatorio = Math.floor(Math.random() * this.horasEspejo.length);
            return this.horasEspejo[indiceAleatorio];
        }
        this.hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
        this.minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
        var horaFormateada = this.hora < 10 ? "0".concat(this.hora) : "".concat(this.hora);
        var minutosFormateados = this.minutos < 10 ? "0".concat(this.minutos) : "".concat(this.minutos);
        return "".concat(horaFormateada, ":").concat(minutosFormateados);
    };
    // Ejecutar un turno
    HorasEspejo.prototype.jugarTurno = function (quienJuega) {
        var horaFormateada = this.generarHoraEspejo();
        var puntos = 0;
        var dinero = 0;
        if (horaFormateada === "00:00") {
            console.log("\uD83C\uDF89 \u00A1".concat(quienJuega === 'jugador' ? 'El jugador' : 'La máquina', "\uD83C\uDF89 GANA con \uD83D\uDD5B\"00:00\"\uD83C\uDF89!"));
            //DINERO QUE SE LE PAGA AL JUGADOR POR GANAR LA PARTIDA CON 00:00 $10000
            puntos = 50;
            dinero = 10000;
            if (quienJuega === 'jugador') {
                this.puntosAcumulados += puntos;
                this.pagarApuesta(dinero);
                this.intentosJugador = 0;
            }
            else {
                this.puntosAcumuladosMaquina += puntos;
                this.intentosMaquina = 0;
            }
            return;
        }
        if (this.puntos10.indexOf(horaFormateada) !== -1) {
            puntos = 10;
        }
        else if (this.puntos25.indexOf(horaFormateada) !== -1) {
            puntos = 25;
        }
        if (quienJuega === 'jugador') {
            this.puntosAcumulados += puntos;
            this.intentosJugador--;
        }
        else {
            this.puntosAcumuladosMaquina += puntos;
            this.intentosMaquina--;
        }
        console.log("".concat(quienJuega === 'jugador' ? 'Jugador' : 'Máquina', ": \u23F0  ").concat(horaFormateada, ", Puntos \uD83D\uDC49:  ").concat(puntos));
    };
    HorasEspejo.prototype.iniciarPartida = function () {
        console.log("\n--- 🍀 INICIA LA PARTIDA 🍀---");
        var ronda = 1;
        while (ronda > 0 && ronda <= 3) {
            console.log("\n--- \u21AA\uFE0F Ronda ".concat(ronda, " \u21A9\uFE0F---"));
            // Turno del jugador
            if (this.intentosJugador > 0) {
                this.jugarTurno('jugador');
            }
            else {
                console.log("El jugador ya no tiene intentos restantes.");
            }
            // Turno de la máquina
            if (this.intentosMaquina > 0) {
                this.jugarTurno('maquina');
            }
            else {
                console.log("La máquina ya no tiene intentos restantes.");
            }
            // Terminar anticipadamente si ambos se quedaron sin intentos
            if (this.intentosJugador === 0 || this.intentosMaquina === 0) {
                break;
            }
            ronda++;
        }
        this.mostrarPuntajeTotal();
    };
    // Mostrar puntajes finales
    HorasEspejo.prototype.mostrarPuntajeTotal = function () {
        console.log("                               ");
        console.log("\n--- PUNTAJE FINAL👇 ---");
        console.log("Jugador \uD83D\uDE09: ".concat(this.puntosAcumulados, " puntos."));
        console.log("M\u00E1quina \uD83E\uDD16: ".concat(this.puntosAcumuladosMaquina, " puntos."));
        if (this.puntosAcumulados > this.puntosAcumuladosMaquina) {
            console.log("🎉🥂 ¡¡¡GANASTE!!! 🥂🎉");
            this.pagarApuesta(this.apuestaMinima * 2);
        }
        else if (this.puntosAcumulados < this.puntosAcumuladosMaquina) {
            console.log("🤖 ¡La máquina gana!");
        }
        else {
            console.log("🤗¡Es un empate!");
        }
        console.log("Saldo final del jugador: ".concat(this.jugador.obtenerSaldo(), "."));
    };
    return HorasEspejo;
}(Juego_1.Juego));
exports.HorasEspejo = HorasEspejo;
