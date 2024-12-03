import { Juego } from "../abstractas/Juego";
import { Usuario } from "../clases/Usuario";
import * as rs from "readline-sync";

export class Veintiuno extends Juego {
    
    private sumatoriaValoresJugador: number = 0;
    private sumatoriaValoresMaquina: number = 0;
    private cantidadCartas: number = 0;
    private cartaMinima: number = 1;
    private cartaMaxima: number = 12;
    private ultimaCarta: number = 0;
    private valorObjetivo: number = 21;
    private mano: boolean = true;
    private finalizoPartida: boolean = false;
    
    constructor (nombre: string, reglamento: string, apuestaMinima: number, apuestaMaxima: number, jugador: Usuario) {
        super (nombre, reglamento, apuestaMinima, apuestaMaxima, jugador);
    }

    public mostrarDatosVeintiuno(): string {
        return `${this.nombre}\nApuesta mínima $${this.apuestaMinima} - Apuesta máxima $${this.apuestaMaxima}`;
    }

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

    public jugarRonda(): void {
        
        this.setManoJugador();

        // Tiro carta del jugador        
        this.tirarCarta();
        this.cambiarMano();

        // Tiro carta de la máquina
        this.tirarCarta();
        this.verificarJugada();        
    }

    // Cuando inicia el juego, la mano siempre la tiene el jugador, por lo tanto es el que comienza.
    // Las cartas utilizadas son las españolas, del 1 al 12, sin uso de comodines
    private tirarCarta (): void {
        this.ultimaCarta = Math.floor(Math.random() * (this.cartaMaxima - this.cartaMinima + 1) + this.cartaMinima);
        this.sumatoriaValores();
    }
    
    public verificarJugada (): void {   
             
        if (this.sumatoriaValoresJugador > this.valorObjetivo) { 
            this.detenerPartida(2);
        } else if (this.sumatoriaValoresMaquina == this.valorObjetivo) {
            this.detenerPartida(3);
        } else if (this.sumatoriaValoresMaquina > this.valorObjetivo) { 
            this.detenerPartida(4);
        }
    }
    /*
    motivos 1: jugador no quizo continuar
            2: jugador se pasó de 21
            3: máquina llegó a 21
            4: máquina se pasó de 21
    */

    public detenerPartida(motivo: number): void {
        let ganador: string;

        this.setFinalizarPartida();
        ganador = this.determinarGanador(motivo);
        console.log(" ");
        if (ganador === "Jugador") {
            console.warn(this.mostrarResultadoFinal(ganador));    
        } else {
            console.log(this.mostrarResultadoFinal(ganador));
        }
        console.log(" ");        
    }
    
    public determinarGanador(motivo: number): string {
        let ganador: string = '';

        if (this.sumatoriaValoresJugador === this.sumatoriaValoresMaquina) {
            ganador = "Empate";
        } else {
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
                    } else {
                        ganador = "Maquina";
                    }                    
                    break;
            }
        }

        if (ganador === "Jugador") {
            this.pagarApuesta(this.apuesta * 2);
        }

        return ganador;
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
        if (this.mano === true) { // si la mano la tiene el jugador, sumo la última carga que salió a la sumatoria de sus cartas, incremento en 1 la cantidad de cartas utilizadas por el jugador            
            this.sumatoriaValoresJugador += this.ultimaCarta;
            this.cantidadCartas += 1;
        } else {            
            this.sumatoriaValoresMaquina += this.ultimaCarta;
        }  
    }

    public mostrarPartida(): string {
        return `Valor obtenido por el jugador: ${this.sumatoriaValoresJugador}, en ${this.cantidadCartas} tiradas.`         
    }

    public mostrarResultadoFinal(ganador: string): string {
        if (ganador == "Maquina") {
            return `Resultado de la partida: PERDIÓ 😒👎 \n  Valor obtenido por el jugador: ${this.sumatoriaValoresJugador}. \n  Valor obtenido por la máquina: ${this.sumatoriaValoresMaquina}, en ${this.cantidadCartas} tiradas. `
        } else if (ganador == "Jugador") {
            return `Resultado de la partida: 🏆 GANADOR!!! 🏆🥇🎉🥳 \n  Valor obtenido por el jugador: ${this.sumatoriaValoresJugador}. \n  Valor obtenido por la máquina: ${this.sumatoriaValoresMaquina}, en ${this.cantidadCartas} tiradas. `
        } else {
            return `🤷 Hubo un empate entre el jugador y la máquina, ambos obtuvieron un total de ${this.sumatoriaValoresJugador}, en ${this.cantidadCartas} tiradas.`
        }
    }

    public jugar(): void {
        let continuar: boolean = true; 
        this.mostrarInfoComienzoJuego();
        
        if (this.apostar()) {
            console.log("  ")
            console.error("Presione cualquier tecla para comenzar: ");
            rs.question();            
            
            do {    
                this.jugarRonda(); 
                if (!this.getFinalizoPartida()) {
                    console.warn(this.mostrarPartida());
                }
            
                if (!this.getFinalizoPartida()) {
                    continuar = this.preguntarSiContinua();                 
                }       

            } while ((continuar) && !this.getFinalizoPartida());   
            
                
            // chequeo si salió porque el usuario no quiso continuar
            if (!continuar) { 
                this.detenerPartida(1);
            }

            if(this.preguntarSiContinua()){
                this.restablecerJuego();
                this.jugar();    
            } else {
                console.log("🎮 Ha Finalizado tu partida 🎮 ");
            } 
            
        } else {
            if(this.verifcarBilletera()){
                this.jugar();
            }
        }
    } 

    private restablecerJuego(): void{
        this.sumatoriaValoresJugador = 0;
        this.sumatoriaValoresMaquina = 0;
        this.cantidadCartas = 0;
        this.ultimaCarta = 0;
        this.mano = true;
        this.finalizoPartida = false;
    }
}
