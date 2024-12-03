import { HorasEspejoBase } from "../abstractas/HorasEspejoBase";
import { Usuario } from "../clases/Usuario";
import * as readline from "readline-sync";


export class HorasEspejo extends HorasEspejoBase {
    private intentosMaquina: number;
    private puntosAcumuladosMaquina: number;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario) {
        super(nombre, reglamento, apuMin, apuMax, jugador);
        this.intentosMaquina = 3;
        this.puntosAcumuladosMaquina = 0;
    }

    private jugarTurno(quienJuega: string): void {
        const horaFormateada = this.generarHoraAleatoria();

        if (horaFormateada === "00:00") {
            console.log(`🎉 ¡${quienJuega === 'jugador' ? 'El jugador' : 'La máquina'} GANA con 🕛"00:00"! 🎉`);
            const premio = this.getApuesta() * 10;

            if (quienJuega === 'jugador') {
                this.puntosAcumulados += this.puntosMayor;
                this.pagarApuesta(premio);
            } else {
                this.puntosAcumuladosMaquina += this.puntosMayor;
            }

            this.intentosJugador = 0;
            this.intentosMaquina = 0;
            return; // Termina el juego
        }

        // Continúa con el cálculo de puntos regulares
        const puntos = this.determinarPuntaje(horaFormateada);
        if (quienJuega === 'jugador') {
            this.puntosAcumulados += puntos;
            this.intentosJugador--;
        } else {
            this.puntosAcumuladosMaquina += puntos;
            this.intentosMaquina--;
        }

        console.log(`${quienJuega === 'jugador' ? 'Jugador' : 'Máquina'}: ⏰ ${horaFormateada}, Puntos: ${puntos}`);
    }


    public jugar(): void {
        this.mostrarInfoComienzoJuego();
        let continua: boolean = true;
        if (this.apostar()) {
            let ronda = 1;
            while (this.intentosJugador > 0 || this.intentosMaquina > 0) {
                console.log(`\n--- Ronda ${ronda} ---`);
                if (this.intentosJugador > 0) this.jugarTurno('jugador');
                if (this.intentosMaquina > 0) this.jugarTurno('maquina');
                readline.question("Presione Enter para continuar...");
                ronda++;
            }
            this.mostrarPuntajeTotal();
        }
    }

    // Mostrar puntajes finales
    private mostrarPuntajeTotal(): void {
        console.log("                               ")
        console.log("\n--- PUNTAJE FINAL👇 ---");
        console.log(`Jugador 😉: ${this.puntosAcumulados} puntos.`);
        console.log(`Máquina 🤖: ${this.puntosAcumuladosMaquina} puntos.`);

        if (this.puntosAcumulados > this.puntosAcumuladosMaquina) {
            console.log("🎉🥂 ¡¡¡GANASTE!!! 🥂🎉");
            this.pagarApuesta(this.getApuesta() * 2);

        } else if (this.puntosAcumulados < this.puntosAcumuladosMaquina) {
            console.log("🤖 ¡La máquina gana!");
            console.log(`Saldo final en tu Billetera:💲${this.jugador.obtenerSaldo()}`);


        } else {
            console.log("🤗¡Es un empate!, recuperaste tu apuesta");
            this.pagarApuesta(this.getApuesta())

        }

        // Preguntar si desea continuar jugando
        if (this.preguntarSiContinua()) {
            this.jugar(); // Jugar otra ronda
        }
    }
    public restablecerJuego(): void {
        this.intentosJugador = 3;
        this.intentosMaquina = 3;
        this.puntosAcumulados = 0;
        this.puntosAcumuladosMaquina = 0;
    }

}
