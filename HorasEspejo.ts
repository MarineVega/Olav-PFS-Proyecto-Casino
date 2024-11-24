import { Apuesta } from "./Apuesta";
import { Usuario } from "./Usuario";

export class HorasEspejo implements Apuesta {
    private hora: number;
    private minutos: number;
    private puntosAcumulados: number;
    private intentosJugador: number;
    private intentosMaquina: number;
    private puntosAcumuladosMaquina: number;
    private horasEspejo: string[];
    private puntos10: string[];
    private puntos25: string[];
    private usuario: Usuario;
    private apuestaMinima: number;


    constructor(usuario: any, apuestaMinima: number = 1000) {
        this.hora = 0;
        this.minutos = 0;
        this.puntosAcumulados = 0;
        this.intentosJugador = 3;
        this.intentosMaquina = 3;
        this.puntosAcumuladosMaquina = 0;
        this.usuario = usuario;
        this.apuestaMinima = 1000;

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

    // Verifica si el jugador tiene suficiente dinero para jugar
    public verificarDinero(dineroDisponible: number): boolean {
        if (dineroDisponible < this.apuestaMinima) {
            console.log(`No tienes suficientes saldo para jugar. Necesitas al menos ${this.apuestaMinima}.`);

            if (this.usuario.dineroDisponible >= this.apuestaMinima) {
                console.log(`Recargando ${this.apuestaMinima}  desde tu billetera.`);
                this.usuario.dineroDisponible -= this.apuestaMinima;
                this.usuario.dineroInicio += this.apuestaMinima;
                console.log("Recarga exitosa. Ahora puedes jugar.");
                return true;
            } else {
                console.log("No tienes suficientes dinero en tu billetera para recargar.");
                return false;
            }
        }
        return true;
    }

    // Realiza una apuesta verificando el costo
    public apostar(costo: number): void {
        if (this.verificarDinero(this.usuario.dineroInicio)) {
            this.gastarDinero(costo);
            console.log(`Has apostado ${costo}.`);
            this.iniciarPartida();
        } else {
            console.log("No tienes suficiente dinero para realizar la apuesta.");
        }
    }

    // Gasta una cantidad específica de dinero del saldo inicial del jugador
    public gastarDinero(monto: number): void {
        if (this.usuario.dineroInicio >= monto) {
            this.usuario.dineroInicio -= monto;
            console.log(`Se han gastado ${monto}`);
        } else {
            console.log("No tienes suficientes dinero para gastar esa cantidad.");
        }
    }
    // falta este metodo de la interface ********
    duplicarApuesta(monto: number): void {

    }
    
    // Paga una cantidad específica de dinero al saldo del jugador
    public pagarApuesta(dinero: number): void {
        this.usuario.dineroInicio += dinero;
        console.log(`Se te han pagado $${dinero} `);
    }

    // Generar una hora espejo aleatoria
    public generarHoraEspejo(): string {
        const generarEspejo = Math.random() < 0.3; // 30% de probabilidad de generar una hora espejo

        if (generarEspejo) {
            const indiceAleatorio = Math.floor(Math.random() * this.horasEspejo.length);
            return this.horasEspejo[indiceAleatorio];
        } else {
            this.hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
            this.minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
            const horaFormateada = this.hora < 10 ? `0${this.hora}` : `${this.hora}`;
            const minutosFormateados = this.minutos < 10 ? `0${this.minutos}` : `${this.minutos}`;
            return `${horaFormateada}:${minutosFormateados}`;
        }
    }

    // Método para realizar un intento (jugador o máquina)
    public jugar(quienJuega: 'jugador' | 'maquina'): { horaIntento: string, puntos: number, gano: boolean, intentosRestantes: number } {
        let intentosRestantes: number = 1;

        if (quienJuega === 'jugador') {
            intentosRestantes = this.intentosJugador;
        } else {
            intentosRestantes = this.intentosMaquina;
        }

        if (intentosRestantes <= 0) {
            console.log(`¡No hay intentos disponibles para el ${quienJuega}!`);
            return { horaIntento: "", puntos: 0, gano: false, intentosRestantes: 0 };
        }

        const horaFormateada = this.generarHoraEspejo();
        return this.sumarPuntos(horaFormateada, quienJuega); // Llamamos a sumarPuntos para devolver los resultados
    }

    // Sumar puntos y determinar ganador
    private sumarPuntos(horaFormateada: string, quienJuega: 'jugador' | 'maquina'): { horaIntento: string, puntos: number, gano: boolean, intentosRestantes: number } {
        let puntos = 0;
        let gano = false;

        // Verificar si la hora es "00:00" y si se gana el juego
        if (horaFormateada === "00:00") {
            let ganador;
            if (quienJuega === 'maquina') {
                ganador = 'La máquina';
                puntos += 10000;

            } else {
                ganador = 'El jugador';
                puntos += 10000;
            }
            console.log(`¡${ganador} 🎉gana con la hora 00:00🎉!`);
            let intentosRestantes: number = 1;

            if (quienJuega === 'jugador') {
                intentosRestantes = this.intentosJugador;
            } else {
                intentosRestantes = this.intentosMaquina;
            }
            return { horaIntento: horaFormateada, puntos: 10000, gano: true, intentosRestantes };
        }

        // Determinar puntos según la hora usando los arrays de puntos
        if (this.puntos10.indexOf(horaFormateada) !== -1) {
            puntos = 10;
        } else if (this.puntos25.indexOf(horaFormateada) !== -1) {
            puntos = 25;
        }

        // Actualizar acumulados y reducir intentos según quién juega
        if (quienJuega === 'jugador') {
            this.puntosAcumulados += puntos;
            this.intentosJugador--; // Reducir intentos para el jugador
        } else {
            this.puntosAcumuladosMaquina += puntos;
            this.intentosMaquina--; // Reducir intentos para la máquina
        }

        return { horaIntento: horaFormateada, puntos, gano: false, intentosRestantes: quienJuega === 'jugador' ? this.intentosJugador : this.intentosMaquina };
    }

    //  rondas intercaladas
    public iniciarPartida(): void {
        let ronda = 1;
        let intentos = 3;
        let partidaTerminada = false;

        console.log("\n--- Inicia la partida ---");

        while (intentos > 0 && !partidaTerminada) { // Máximo de 3 rondas
            console.log(`\n--- Ronda ${ronda} ---`);

            // Ronda del jugador
            const resultadoJugador = this.jugar('jugador');
            console.log(`Jugador: ${resultadoJugador.horaIntento} puntos ${resultadoJugador.puntos}`);
            if (resultadoJugador.gano) {
                partidaTerminada = true;
                break; // Termina si el jugador gana con "00:00"
            }

            // Ronda de la máquina
            const resultadoMaquina = this.jugar('maquina');
            console.log(`Máquina: ${resultadoMaquina.horaIntento} puntos ${resultadoMaquina.puntos}`);
            if (resultadoMaquina.gano) {
                partidaTerminada = true;
                break; // Termina si la máquina gana con "00:00"
            }

            ronda++;
            intentos--; // Reducir los intentos
        }

        console.log("\n--- Puntaje Final ---");
        this.mostrarPuntajeTotal(); // Muestra el puntaje final
    }

    // Mostrar el puntaje final del juego
    public mostrarPuntajeTotal(): void {
        console.log(`Puntaje total jugador😊: ${this.puntosAcumulados}`);
        console.log(`Puntaje total máquina🤖: ${this.puntosAcumuladosMaquina}`);

        if (this.puntosAcumulados > this.puntosAcumuladosMaquina) {
            console.log("¡Felicidades! Ganaste el juego 🎉");
            this.pagarApuesta(this.apuestaMinima * 2); // Pago por ganar
        } else if (this.puntosAcumulados < this.puntosAcumuladosMaquina) {
            console.log("La máquina gana esta vez 🤖.");
        } else {
            console.log("¡Es un empate!");
        }

        // Mostrar estado final después de la partida
        console.log(`\n--- Estado Final ---`);
        console.log(`Saldo final: ${this.usuario.dineroInicio}.`);
    }
}