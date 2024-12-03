import { HorasEspejoBase } from "../abstractas/HorasEspejoBase";
import { Usuario } from "../clases/Usuario";
import * as readline from "readline-sync";

export class HorasEspejoSolitario extends HorasEspejoBase {
    private puntosGanador: number;
    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario) {
        super(nombre, reglamento, apuMin, apuMax, jugador);
        this.puntosGanador = 30;
    }

    protected jugarTurno(): boolean {
        const horaFormateada = this.generarHoraAleatoria();

        // Si la hora es "00:00" gana la partida y el premio  mayor
         if (horaFormateada === "00:00") {
            console.log(`🎉 ¡GANASTE con 🕛"00:00"! 🎉`);
            this.puntosAcumulados += this.puntosMayor;
            const premio = this.getApuesta() * 10;
            this.pagarApuesta(premio);
            this.intentosJugador = 0; // Detiene el juego
            return true; // Termina el juego si es "00:00"
        }

        // Calcular puntos regulares
        const puntos = this.determinarPuntaje(horaFormateada);
        this.puntosAcumulados += puntos;
        this.intentosJugador--;
        console.log(`⏰ Hora: ${horaFormateada}, Puntos obtenidos: ${puntos}`);
        console.log(`Puntos acumulados: ${this.puntosAcumulados}`);

        // Condición de victoria por puntos (30 o más, pero menos de 50)
        if (this.puntosAcumulados >= 30 && this.puntosAcumulados < this.puntosMayor) {
            console.log(`🎉 ¡Ganaste al alcanzar ${this.puntosAcumulados} puntos! 🎉`);
            const premio = this.getApuesta() * 2;
            this.pagarApuesta(premio);
            this.intentosJugador = 0; // Detiene el juego
            return false; // No detener el juego aquí, porque puede seguir jugando si hay intentos
        }

        return false; // Continuar jugando si no ha ganado
    }

    public jugar(): void {
       
        this.mostrarInfoComienzoJuego();

        if (this.apostar()) {

            console.log("\n--- 🍀 INICIA LA PARTIDA 🍀 ---");

            while (this.intentosJugador > 0) {
                console.log(`Intentos restantes: ${this.intentosJugador}`);
                console.log("Presiona una tecla para jugar...");
                readline.question(); // Espera a que el jugador presione una tecla

                const victoria = this.jugarTurno();
                if (victoria) {
                    break; // Termina el juego solo si el jugador gana con "00:00"
                }
            }

            if (this.intentosJugador === 0 && this.puntosAcumulados < this.puntosGanador) {
                console.log('____________________________________________________________')
                console.log("😞 No alcanzaste los puntos necesarios. ¡Suerte la próxima!");
                console.log('____________________________________________________________')
            }

            console.log(`Puntaje final: ${this.puntosAcumulados}`);
            console.log(`Saldo final del jugador💸: ${this.jugador.obtenerSaldo()}\n`);
        
            // Preguntar si desea continuar jugando
            if (this.preguntarSiContinua()) {
                this.jugar(); // Jugar otra ronda
            }
        } else {
            
            if(this.verifcarBilletera()){
                this.jugar();
            }
        }
    }

    public restablecerJuego(): void {
        this.intentosJugador = 3;
        this.puntosAcumulados = 0;
    }
}

