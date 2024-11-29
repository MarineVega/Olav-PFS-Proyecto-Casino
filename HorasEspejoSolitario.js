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
exports.HorasEspejoSolitario = void 0;
var Juego_1 = require("./Juego");
var readline = require("readline-sync");
var HorasEspejoSolitario = /** @class */ (function (_super) {
    __extends(HorasEspejoSolitario, _super);
    function HorasEspejoSolitario(nombre, reglamento, apuMin, apuMax, jugador) {
        var _this = _super.call(this, nombre, reglamento, apuMin, apuMax, jugador) || this;
        _this.intentosJugador = 3;
        _this.puntosAcumulados = 0;
        _this.jugador = jugador;
        return _this;
    }
    HorasEspejoSolitario.prototype.generarHoraAleatoria = function () {
        //SINO HARCODEO UN POCO HAY QUE HACER MILLONES DE PARTIDAS 
        var horasEspejo = [
            "01:10", "02:20", "03:30", "04:40", "05:50",
            "10:01", "11:11", "12:21", "13:31", "14:41",
            "15:51", "20:02", "21:12", "22:22", "23:32", "00:00"
        ];
        // Probabilidad de generar una hora espejo (30%)
        var probabilidadEspejo = 0.3;
        if (Math.random() < probabilidadEspejo) {
            // Selecciona una hora espejo aleatoria
            var indice = Math.floor(Math.random() * horasEspejo.length);
            return horasEspejo[indice];
        }
        // Genera una hora completamente aleatoria
        var hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
        var minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
        var horaFormateada = hora < 10 ? "0".concat(hora) : "".concat(hora);
        var minutosFormateados = minutos < 10 ? "0".concat(minutos) : "".concat(minutos);
        return "".concat(horaFormateada, ":").concat(minutosFormateados);
    };
    //DETERMINO QUE SEA UNA HORA ESPEJO COMPARANDO LAS POSICIONES DEL STRING
    HorasEspejoSolitario.prototype.determinarPuntaje = function (hora) {
        // VERIFICO QUE SEA UNA HORA ESPEJO
        if (hora[0] === hora[4] && hora[1] === hora[3]) {
            switch (hora) {
                case "00:00":
                    return 50; // Puntaje máximo para "00:00"
                case "11:11":
                case "22:22":
                    return 20; // Puntaje especial para "11:11" y "22:22"
                default:
                    return 10; // PUNTAJE RESTO HORAS ESPEJO
            }
        }
        return 0; //NO ES UNA HORA ESPEJO
    };
    // EJECUTA UN TURNO, HASTA 3 POSIBILIDADES 
    HorasEspejoSolitario.prototype.jugarTurno = function () {
        var horaFormateada = this.generarHoraAleatoria();
        var puntos = this.determinarPuntaje(horaFormateada);
        //MAXIMO PUNTAJE     
        if (puntos === 50) {
            console.log("\uD83C\uDF89 \u00A1GANASTE con \uD83D\uDD5B\"00:00\"! \uD83C\uDF89");
            this.puntosAcumulados = 50; // Puntos máximos al ganar con "00:00"
            this.intentosJugador = 0;
            return true; // SI GANO CON 00:00 DEBE TERMINAR
        }
        this.puntosAcumulados += puntos;
        this.intentosJugador--;
        console.log("\u23F0 Hora: ".concat(horaFormateada, ", Puntos obtenidos: ").concat(puntos));
        console.log("Puntos acumulados: ".concat(this.puntosAcumulados));
        return this.puntosAcumulados >= 30; // ACA GANA POR PUNTOS ACUMULADOS
    };
    // Iniciar la partida
    HorasEspejoSolitario.prototype.iniciarPartida = function () {
        //DECREMENTA EL DINERO DEL JUGADOR
        this.gastarDinero(this.apuestaMinima);
        console.log("\n--- 🍀 INICIA LA PARTIDA 🍀 ---");
        while (this.intentosJugador > 0) {
            console.log("Intentos restantes: ".concat(this.intentosJugador));
            console.log("Presiona una tecla para jugar...");
            readline.question(); // Espera a que el jugador presione una tecla
            var victoria = this.jugarTurno();
            if (victoria) {
                console.log("🎉 ¡Ganaste al alcanzar 30 puntos o más! 🎉");
                if ((this.puntosAcumulados >= 30) && (this.puntosAcumulados < 50)) {
                    this.pagarApuesta(this.apuestaMinima * 2); // Premiar con el doble de la apuesta mínima
                }
                else if (this.puntosAcumulados >= 50) {
                    this.pagarApuesta(this.apuestaMinima * 10); //el premio mayor
                    break;
                }
            }
        }
        if (this.intentosJugador === 0 && this.puntosAcumulados < 30) {
            console.log("😞 No alcanzaste los puntos necesarios. ¡Suerte la próxima!");
        }
        console.log("Puntaje final: ".concat(this.puntosAcumulados));
        console.log("Saldo final del jugador\uD83D\uDCB8: ".concat(this.jugador.obtenerSaldo()));
    };
    return HorasEspejoSolitario;
}(Juego_1.Juego));
exports.HorasEspejoSolitario = HorasEspejoSolitario;
