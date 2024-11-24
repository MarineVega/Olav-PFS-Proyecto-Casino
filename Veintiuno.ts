import { Juego } from "./Juego";
import { Apuesta } from "./Apuesta";
import { Usuario } from "./Usuario";

//export class Veintiuno extends Juego {
export class Veintiuno extends Juego implements Apuesta {
    private sumatoriaValoresJugador: number;
    private cantidadCartasJugador: number;
    private sumatoriaValoresMaquina: number;
    private cantidadCartasMaquina: number;
    private ultimaCarta: number;
    private mano: boolean;
    private finalizoPartida: boolean;
    
    constructor (nombre: string, reglamento: string, apuestaMinima: number, apuestaMaxima: number) {
        super (nombre, reglamento, apuestaMinima, apuestaMaxima);
        this.sumatoriaValoresJugador = 0;
        this.cantidadCartasJugador = 0;
        this.sumatoriaValoresMaquina = 0;
        this.cantidadCartasMaquina = 0;
        this.ultimaCarta = 0;
        this.mano = true;
        this.finalizoPartida = false;
    }

    public apostar(costo: number): void {
    };

    public verificarDinero(dineroDisponible: number): void {
    };

    public gastarDinero(monto: number): void {
    };

    public pagarApuesta(dinero: number): void {
    };

    public duplicarApuesta(monto: number): void {
    };

    public finalizarJuego(): void {

    };

    private setManoJugador(): void {
        this.mano = true;
    }

    public getFinalizoPartida(): boolean {
        return this.finalizoPartida;
    }

    private setFinalizarPartida(): void {
        this.finalizoPartida = true;
    }

    public obtenerUltimaCarta(): number {
        return this.ultimaCarta;
    }

    public jugar (): void {
        
        this.setManoJugador();

        // Tiro carta del jugador        
        this.tirarCarta();
        this.cambiarMano();
        //console.log("Juega la máquina");            
        // Tiro carta de la máquina
        this.tirarCarta();
        this.verificarJugada();        
    }

    // Cuando inicia el juego, la mano siempre la tiene el jugador, por lo tanto es el que comienza.
    // Las cartas utilizadas son las españolas, del 1 al 12, sin uso de comodines
    private tirarCarta (): void {
        const cartaMaxima = 12;    
        const cartaMinima = 1;

        this.ultimaCarta = Math.floor(Math.random() * (cartaMaxima - cartaMinima + 1) + cartaMinima);
        //console.log( "ultima carta " + this.ultimaCarta);
        
        this.sumatoriaValores();
    }
    
    public verificarJugada (): void {        
        if (this.sumatoriaValoresJugador > 21) {            
            this.detenerPartida(2);
        } else if (this.sumatoriaValoresMaquina == 21) {
            this.detenerPartida(3);
        } else if (this.sumatoriaValoresMaquina > 21) {
            this.detenerPartida(4);
        }
    }
    /*
    motivos 1: jugador no quizo continuar
            2: jugador se pasó de 21
            3: máquina llegó a 21
            4: máquina se pasó de 21
    */

    public detenerPartida( motivo: number): void {
        let ganador: string;

        this.setFinalizarPartida();
        //console.log(`La partida terminó ${motivo}`);
        ganador = this.determinarGanador(motivo);
        console.log("");
        console.log(this.mostrarResultadoFinal(ganador));
        console.log("");
    }

    // Desde acá se setea el Ranking?????
    public determinarGanador(motivo: number): string {
        let ganador: string;
        if (motivo == 4) {
            ganador = "Jugador";
        } else if (motivo == 3){
            ganador = "Maquina"
        } else if (motivo == 2) {
            ganador = "Maquina"
        } else if (motivo == 1) {
            // para que el jugador pueda irse y ganar, debe tener más de 16 puntos ?????
            if ((this.sumatoriaValoresJugador > this.sumatoriaValoresMaquina) /*&& (this.sumatoriaValoresJugador > 16)*/) {
                ganador = "Jugador";
            } else if (this.sumatoriaValoresJugador === this.sumatoriaValoresMaquina) {
                ganador = "Empate";
            } else {
                ganador = "Maquina";
            }
            
        }
        if (ganador == "Jugador") {
            // seteo el ranking
        }

        return ganador
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

    public mostrarResultadoFinal(ganador: string): string {
        if (ganador == "Maquina") {
            return `Resultado de la partida: PERDIÓ 😒👎 \n  Valor obtenido por el jugador: ${this.sumatoriaValoresJugador}. \n  Valor obtenido por la máquina: ${this.sumatoriaValoresMaquina}, en ${this.cantidadCartasMaquina} tiradas. `
        } else if (ganador == "Jugador") {
            return `Resultado de la partida: 🏆 GANADOR!!! 🏆🥇🎉🥳 \n  Valor obtenido por el jugador: ${this.sumatoriaValoresJugador}. \n  Valor obtenido por la máquina: ${this.sumatoriaValoresMaquina}, en ${this.cantidadCartasMaquina} tiradas. `
        } else {
            return `🤷 Hubo un empate entre el jugador y la máquina, ambos obtuvieron un total de ${this.sumatoriaValoresJugador}, en ${this.cantidadCartasJugador} tiradas.`
        }
    }
}
