import { Juego } from "./Juego";

//export class Veintiuno extends Juego {
export class Veintiuno {
    /* esto pertenece a Juego */
    creditos: number;
    equivalenciaCredito: number;

    private sumatoriaValoresJugador: number;
    private cantidadCartasJugador: number;
    private sumatoriaValoresMaquina: number;
    private cantidadCartasMaquina: number;
    private ultimaCarta: number;
    private mano: boolean;

    // OJO!!!! este constructor es de juego
    constructor (creditos: number, equivalenciaCredito: number) {
        //(nombre: string, reglamento: string, apuestaMinima: number, apuestaMaxima: number, creditos: number, equivalenciaCredito: number) {
        //super (nombre, reglamento, apuestaMinima, apuestaMaxima, creditos, equivalenciaCredito);
        this.sumatoriaValoresJugador = 0;
        this.cantidadCartasJugador = 0;
        this.sumatoriaValoresMaquina = 0;
        this.cantidadCartasMaquina = 0;
        this.ultimaCarta = 0;
        this.mano = true;
    }

    public obtenerUltimaCarta(): number {
        return this.ultimaCarta;
    }

    // Cuando inicia el juego, la mano siempre la tiene el jugador, por lo tanto es el que comienza.
    // Las cartas utilizadas son las españolas, del 1 al 12, sin uso de comodines
    public tirarCarta (): void {
        const cartaMaxima = 12;    
        const cartaMinima = 1;

        this.ultimaCarta = Math.floor(Math.random() * (cartaMaxima - cartaMinima + 1) + cartaMinima);
        //console.log(this.ultimaCarta) 

        this.sumatoriaValores();        
        this.verificarJugada();     
    }

    // Uso la interface
    private verificarJugada (): void {
        //if (this.cantidadCartasMaquina === 0) {                     // si es la 1º ronda y la máquina todavía no tiró, el jugador no puede detener la partida
        if (this.mano) {                   // Si la mano la tiene el jugador, la máquina todavía no tiró, el jugador no puede detener la partida
            this.cambiarMano();
            this.tirarCarta();
        } else {
            this.cambiarMano();
        }
          
        if (this.cantidadCartasMaquina != 0 ) {             // si la máquina ya jugó, se deben verificar las jugadas
            if (this.sumatoriaValoresJugador <= 21) {

            } else {
                this.detenerPartida();
            }
        }     
    }

    public detenerPartida(): void {
        console.log(`La partida terminó`);
        this.determinarGanador();
    }

    // Desde acá se setea el Ranking?????
    public determinarGanador(): void {
        if (this.sumatoriaValoresJugador > this.sumatoriaValoresMaquina) {
            console.log(`El jugador ganó la partida`);
        } else if (this.sumatoriaValoresJugador === this.sumatoriaValoresMaquina) {
            console.log(`Hubo un empate`);
        } else {
            console.log(`El jugador perdió`);
        }
    }

    private cambiarMano(): void {
        // chequeo si la mano la tiene el jugador
        if (this.mano === true) {   
            this.mano = false;      // cambio la mano para la máquina
        } else {
            this.mano = true        // cambio la mano para el jugador
        }
    }

    private sumatoriaValores (): void {
        if (this.mano === true) {               // si la mano la tiene el jugador, sumo la última carga que salió a la sumatoria de sus cartas, incremento en 1 la cantidad de cartas utilizadas por el jugador
            this.sumatoriaValoresJugador += this.ultimaCarta;
            this.cantidadCartasJugador += 1; 
        } else {
            this.sumatoriaValoresMaquina += this.ultimaCarta;
            this.cantidadCartasMaquina += 1;
        }   
    }

    public mostrarPartida(): string {
        return `Valor obtenido por el jugador: ${this.sumatoriaValoresJugador}, en ${this.cantidadCartasJugador} tiradas.` 
    }

    public mostrarResultadoFinal(): string {
        return `Valor obtenido por el jugador: ${this.sumatoriaValoresJugador}, en ${this.cantidadCartasJugador} tiradas. \nValor obtenido por la máquina: ${this.sumatoriaValoresMaquina}, en ${this.cantidadCartasMaquina} tiradas. \nGANÓ!!!!! QUIÉN??? `
    }
}
