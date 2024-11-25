"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veintiuno = void 0;
//export class Veintiuno extends Juego {
var Veintiuno = /** @class */ (function () {
    // OJO!!!! este constructor es de juego
    function Veintiuno(creditos, equivalenciaCredito) {
        //(nombre: string, reglamento: string, apuestaMinima: number, apuestaMaxima: number, creditos: number, equivalenciaCredito: number) {
        //super (nombre, reglamento, apuestaMinima, apuestaMaxima, creditos, equivalenciaCredito);
        this.sumatoriaValoresJugador = 0;
        this.cantidadCartasJugador = 0;
        this.sumatoriaValoresMaquina = 0;
        this.cantidadCartasMaquina = 0;
        this.ultimaCarta = 0;
        this.mano = true;
    }
    Veintiuno.prototype.obtenerUltimaCarta = function () {
        return this.ultimaCarta;
    };
    // Cuando inicia el juego, la mano siempre la tiene el jugador, por lo tanto es el que comienza.
    // Las cartas utilizadas son las españolas, del 1 al 12, sin uso de comodines
    Veintiuno.prototype.tirarCarta = function () {
        var cartaMaxima = 12;
        var cartaMinima = 1;
        this.ultimaCarta = Math.floor(Math.random() * (cartaMaxima - cartaMinima + 1) + cartaMinima);
        //console.log(this.ultimaCarta) 
        this.sumatoriaValores();
        this.verificarJugada();
    };
    // Uso la interface
    Veintiuno.prototype.verificarJugada = function () {
        //if (this.cantidadCartasMaquina === 0) {                     // si es la 1º ronda y la máquina todavía no tiró, el jugador no puede detener la partida
        if (this.mano) { // Si la mano la tiene el jugador, la máquina todavía no tiró, el jugador no puede detener la partida
            this.cambiarMano();
            this.tirarCarta();
        }
        else {
            this.cambiarMano();
        }
        if (this.cantidadCartasMaquina != 0) { // si la máquina ya jugó, se deben verificar las jugadas
            if (this.sumatoriaValoresJugador <= 21) {
            }
            else {
                this.detenerPartida();
            }
        }
    };
    Veintiuno.prototype.detenerPartida = function () {
        console.log("La partida termin\u00F3");
        this.determinarGanador();
    };
    // Desde acá se setea el Ranking?????
    Veintiuno.prototype.determinarGanador = function () {
        if (this.sumatoriaValoresJugador > this.sumatoriaValoresMaquina) {
            console.log("El jugador gan\u00F3 la partida");
        }
        else if (this.sumatoriaValoresJugador === this.sumatoriaValoresMaquina) {
            console.log("Hubo un empate");
        }
        else {
            console.log("El jugador perdi\u00F3");
        }
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
            this.cantidadCartasJugador += 1;
        }
        else {
            this.sumatoriaValoresMaquina += this.ultimaCarta;
            this.cantidadCartasMaquina += 1;
        }
    };
    Veintiuno.prototype.mostrarPartida = function () {
        return "Valor obtenido por el jugador: ".concat(this.sumatoriaValoresJugador, ", en ").concat(this.cantidadCartasJugador, " tiradas.");
    };
    Veintiuno.prototype.mostrarResultadoFinal = function () {
        return "Valor obtenido por el jugador: ".concat(this.sumatoriaValoresJugador, ", en ").concat(this.cantidadCartasJugador, " tiradas. \nValor obtenido por la m\u00E1quina: ").concat(this.sumatoriaValoresMaquina, ", en ").concat(this.cantidadCartasMaquina, " tiradas. \nGAN\u00D3!!!!! QUI\u00C9N??? ");
    };
    return Veintiuno;
}());
exports.Veintiuno = Veintiuno;
