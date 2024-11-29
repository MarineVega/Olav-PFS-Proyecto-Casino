import { Juego } from "./Juego";
import { Usuario } from "./Usuario";
import * as readline from "readline-sync";

export class HorasEspejo extends Juego {
    private hora: number;
    private minutos: number;
    private intentosJugador: number;
    private intentosMaquina: number;
    private puntosAcumulados: number;
    private puntosAcumuladosMaquina: number;
    private horasEspejo: string[];
    private puntos10: string[];
    private puntos25: string[];
    protected jugador: Usuario;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario) {
        super(nombre, reglamento, apuMin, apuMax, jugador);

        this.hora = 0;
        this.minutos = 0;
        this.intentosJugador = 3;
        this.intentosMaquina = 3;
        this.puntosAcumulados = 0;
        this.puntosAcumuladosMaquina = 0;
        this.jugador = jugador;

        this.horasEspejo = [
            "01:10", "02:20", "03:30", "04:40", "05:50",
            "10:01", "11:11", "12:21", "13:31", "14:41",
            "15:51", "20:02", "21:12", "22:22", "23:32", "00:00"];

        this.puntos10 = [
            "02:20", "03:30", "04:40", "05:50", "10:01",
            "12:21", "13:31", "14:41", "15:51", "20:02",
            "21:12", "23:32"];

        this.puntos25 = ["11:11", "22:22"];
    }

    // Generar una hora espejo aleatoria
    private generarHoraEspejo(): string {
        const generarEspejo = Math.random() < 0.3; // 30% de probabilidad de generar una hora espejo
        if (generarEspejo) {
            const indiceAleatorio = Math.floor(Math.random() * this.horasEspejo.length);
            return this.horasEspejo[indiceAleatorio];
        }
        this.hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
        this.minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
        const horaFormateada = this.hora < 10 ? `0${this.hora}` : `${this.hora}`;
        const minutosFormateados = this.minutos < 10 ? `0${this.minutos}` : `${this.minutos}`;
        return `${horaFormateada}:${minutosFormateados}`;
    }

    // Ejecutar un turno
    private jugarTurno(quienJuega: 'jugador' | 'maquina'): void {
        const horaFormateada = this.generarHoraEspejo();
        let puntos = 0;
        let dinero = 0;
    
        // Condición de victoria especial
        if (horaFormateada === "00:00") {
            puntos = 50;
            dinero = 10000;
            console.log(`🎉 ¡${quienJuega === 'jugador' ? 'El jugador' : 'La máquina'} GANA con 🕛"00:00"🎉!`);
    
            if (quienJuega === 'jugador') {
                this.puntosAcumulados += puntos;
                this.pagarApuesta(dinero);
                this.intentosJugador = 0;
            } else {
                this.puntosAcumuladosMaquina += puntos;
                this.intentosMaquina = 0;
            }
            return; // Termina la ejecución
        }
    
        // Asignación de puntos por coincidencias
        if (this.puntos10.indexOf(horaFormateada) !== -1) {
            puntos = 10;
        } else if (this.puntos25.indexOf(horaFormateada) !== -1) {
            puntos = 25;
        }
    
        // Actualización de puntajes e intentos
        if (quienJuega === 'jugador') {
            this.puntosAcumulados += puntos;
            this.intentosJugador--;
        } else {
            this.puntosAcumuladosMaquina += puntos;
            this.intentosMaquina--;
        }
    
        // Mensaje de estado
        console.log(`${quienJuega === 'jugador' ? 'Jugador' : 'Máquina'}: ⏰  ${horaFormateada}, Puntos 👉:  ${puntos}`);
    }
    //INICIA LA PARTIDA CONTROLANDO LAS RONDAS
    public iniciarPartida(): void {
        console.log("\n--- 🍀 INICIA LA PARTIDA 🍀---");
    
        let ronda = 1;
        while (ronda >0 && ronda <= 3){
            console.log(`\n--- ↪️ Ronda ${ronda} ↩️---`);
    
            // Turno del jugador
            if (this.intentosJugador > 0) {
                this.jugarTurno('jugador');
            } else {
                console.log("El jugador ya no tiene intentos restantes.");
            }
    
            // Turno de la máquina
            if (this.intentosMaquina > 0) {
                this.jugarTurno('maquina');
            } else {
                console.log("La máquina ya no tiene intentos restantes.");
            }
    
            // Terminar anticipadamente si ambos se quedaron sin intentos
            if (this.intentosJugador === 0 || this.intentosMaquina === 0) {
                break;
            }
            console.log("Presione una tecla para continuar..., 🍀suerte!!");
            readline.question();
            ronda++;
        }
    
        this.mostrarPuntajeTotal();
    }    


    // Mostrar puntajes finales
    private mostrarPuntajeTotal(): void {
        console.log("                               ")
        console.log("\n--- PUNTAJE FINAL👇 ---");
        console.log(`Jugador 😉: ${this.puntosAcumulados} puntos.`);
        console.log(`Máquina 🤖: ${this.puntosAcumuladosMaquina} puntos.`);
        if (this.puntosAcumulados > this.puntosAcumuladosMaquina) {
            console.log("🎉🥂 ¡¡¡GANASTE!!! 🥂🎉");
            this.pagarApuesta(this.apuestaMinima * 2);
        } else if (this.puntosAcumulados < this.puntosAcumuladosMaquina) {
            console.log("🤖 ¡La máquina gana!");
        } else {
            console.log("🤗¡Es un empate!");
        }
       
    }
}