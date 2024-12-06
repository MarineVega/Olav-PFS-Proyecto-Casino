import { Juego } from "../abstractas/Juego";
import { Usuario } from "../clases/Usuario";
import * as readline from "readline-sync";

export class HorasEspejo extends Juego {

    private intentosJugador: number;
    private intentosMaquina: number;
    private puntosAcumuladosMaquina: number;
    private puntosAcumulados: number;
    private puntosMayor: number;
    private horasEspejo: string[];
    private puntos10: string[];
    private puntos25: string[];
    private puntosSimples: number;
    private puntosDobles: number;
    protected jugador: Usuario;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario) {
        super(nombre, reglamento, apuMin, apuMax, jugador);

        this.puntosAcumuladosMaquina = 0;
        this.puntosAcumulados = 0;
        this.intentosJugador = 3;
        this.intentosMaquina = 3;
        this.puntosMayor = 50;
        this.jugador = jugador;
        this.puntosSimples = 10;
        this.puntosDobles = 25;

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

    // GENERAR HORAS
    private generarHoraEspejo(): string {
        let hora: number;
        let minutos: number;
        const generarEspejo = Math.random() < 0.3; // 30% de probabilidad de generar una hora espejo
        if (generarEspejo) {
            const indiceAleatorio = Math.floor(Math.random() * this.horasEspejo.length);
            return this.horasEspejo[indiceAleatorio];
        }
        hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
        minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
        const horaFormateada = hora < 10 ? `0${hora}` : `${hora}`;
        const minutosFormateados = minutos < 10 ? `0${minutos}` : `${minutos}`;
        
        return `${horaFormateada}:${minutosFormateados}`;
    }
    //JUEGA EL TURNO
    private jugarTurno(quienJuega: string): void {
        const horaFormateada = this.generarHoraEspejo();
        let puntos = 0;
        let dinero = 0;

        // Condición de victoria especial
        if (horaFormateada === "00:00") {
            dinero = this.getApuesta() * 10;
            console.log(`🎉 ¡${quienJuega === 'jugador' ? 'El jugador' : 'La máquina'} GANA con 🕛"00:00"🎉!`);

            if (quienJuega === 'jugador') {
                this.puntosAcumulados += this.puntosMayor;
                this.pagarApuesta(dinero);
                this.intentosJugador = 0;
                this.intentosMaquina = 0;
            } else {
                this.puntosAcumuladosMaquina += this.puntosMayor;
                this.intentosJugador = 0;
                this.intentosMaquina = 0;
            }
            return; // Termina la ejecución
        }

        // Asignación de puntos por coincidencias
        if (this.puntos10.indexOf(horaFormateada) !== -1) {
            puntos = this.puntosSimples;
        } else if (this.puntos25.indexOf(horaFormateada) !== -1) {
            puntos = this.puntosDobles;
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
        console.log(`${quienJuega === 'jugador' ? 'Jugador' : 'Máquina'}: ⏰ ${horaFormateada}, Puntos 👉: ${puntos}`);
    }

    
    //INICIA LA PARTIDA CONTROLANDO LAS RONDAS
    public jugar(): void {
        this.mostrarInfoComienzoJuego();

        let continua: boolean = true;

        if(this.apostar()){
            this.mostrarInfoCobroEntrada();

            console.log("\n--- 🍀 INICIA LA PARTIDA 🍀---");
    
            let ronda = 1;

            while (this.intentosJugador !== 0) {
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
                    //console.log("La máquina ya no tiene intentos restantes.");
                }
    
                if (this.intentosJugador > 0){
                    console.log("Presione una tecla para continuar..., 🍀Suerte!!");
                    readline.question();
                }

                ronda++;
            }
    
            this.mostrarPuntajeTotal();

            // Preguntar si desea jugar nuevamente
            continua = this.preguntarSiContinua();
                    
            if(continua){
                console.log(`\nJugaras otra ronda.\n`);
                this.restablecerJuego();
                this.jugar();
                
            } else {
                console.log(`Has elegido salir del juego\n`);
                console.log(`Saldo final en tu Billetera:💲${this.jugador.obtenerSaldo()}`);
            }

        } else {
            
            if(this.verifcarBilletera()){
                this.jugar();
            }
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
        
    }

    public restablecerJuego(): void {
        this.intentosJugador = 3;
        this.intentosMaquina = 3;
        this.puntosAcumulados = 0;
        this.puntosAcumuladosMaquina = 0;
    }
}