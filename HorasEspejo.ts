export class HorasEspejo {
    private hora: number;
    private minutos: number;
    private puntosAcumulados: number;
    private intentosJugador: number;
    private intentosMaquina: number;
    private puntosAcumuladosMaquina: number;
    private horasEspejo: string[];
    private puntos10: string[];
    private puntos25: string[];

    constructor() {
        this.hora = 0;
        this.minutos = 0;
        this.puntosAcumulados = 0;
        this.intentosJugador = 3;
        this.intentosMaquina = 3;
        this.puntosAcumuladosMaquina = 0;

        // Inicializamos las horas espejo y sus puntajes
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

    // Método para generar una hora espejo o aleatoria
    public generarHoraEspejo(): string {
        const generarEspejo = Math.random() < 0.3; // 30% de probabilidad de generar una hora espejo

        if (generarEspejo) {
            // Elegir una hora espejo aleatoria
            const indiceAleatorio = Math.floor(Math.random() * this.horasEspejo.length);
            return this.horasEspejo[indiceAleatorio];
        } else {
            // Generar una hora aleatoria normal
            this.hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
            this.minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59

            // Formatear la hora y los minutos
            const horaFormateada = this.hora < 10 ? `0${this.hora}` : `${this.hora}`;
            const minutosFormateados = this.minutos < 10 ? `0${this.minutos}` : `${this.minutos}`;
            return `${horaFormateada}:${minutosFormateados}`;
        }
    }

    // Método para realizar un intento
    public jugar(quienJuega: 'jugador' | 'maquina'): {
        horaIntento: string,
        puntos: number,
        gano: boolean,
        intentosRestantes: number
    } {
        let intentosRestantes = (quienJuega === 'jugador') ? this.intentosJugador : this.intentosMaquina;

        if (intentosRestantes <= 0) {
            console.log(`¡No hay intentos disponibles para el ${quienJuega}!`);
            return { horaIntento: "", puntos: 0, gano: false, intentosRestantes: 0 };
        }

        const horaFormateada = this.generarHoraEspejo(); // Generar la hora formateada
        return this.sumarPuntos(horaFormateada, quienJuega); // Llamar a la función que calcula puntos
    }

    // Suma puntos según la hora obtenida
    private sumarPuntos(horaFormateada: string, quienJuega: 'jugador' | 'maquina'): {
        horaIntento: string,
        puntos: number,
        gano: boolean,
        intentosRestantes: number
    } {
        let puntos = 0;
        // Verificar si la hora es "00:00" y si se gana el juego
        if (horaFormateada === "00:00") {
            var ganador;

            // Determinar quién ganó el juego
            if (quienJuega === 'maquina') {
                ganador = 'La máquina';
                puntos += 10000;
            } else {
                ganador = 'El jugador';
                puntos += 10000;
            }

            console.log("¡" + ganador + " 🎉gana con la hora 00:00🎉!");
        

            var intentosRestantes=0;

            // Asignar los intentos restantes dependiendo de quién jugó
            if (quienJuega === 'maquina') {
                intentosRestantes = this.intentosMaquina;

            } else {
                intentosRestantes = this.intentosJugador;
            }

            return { horaIntento: horaFormateada, puntos: 10000, gano: true, intentosRestantes: intentosRestantes };
        }


        // Determinar puntos según la hora usando los arrays de puntos
       
        if (this.puntos10.indexOf(horaFormateada) !== -1) {
            puntos = 10;
            console.log(`¡⏰ 10 puntos!: ${horaFormateada}`);
        } else if (this.puntos25.indexOf(horaFormateada) !== -1) {
            puntos = 25;
            console.log(`¡⏰para 25 puntos!: ${horaFormateada}`);
        }

        // Actualizar acumulados y reducir intentos según quién juega
        if (quienJuega === 'maquina') {
            this.puntosAcumuladosMaquina += puntos;
            this.intentosMaquina--; // Reducir intentos para la máquina
        } else {
            this.puntosAcumulados += puntos;
            this.intentosJugador--; // Reducir intentos para el jugador
        }

        return { horaIntento: horaFormateada, puntos, gano: false, intentosRestantes: quienJuega === 'maquina' ? this.intentosMaquina : this.intentosJugador };
    }

    // Determinar el ganador si nadie obtuvo "00:00"
    public mostrarPuntajeTotal(): void {
        console.log(`Puntaje total jugador😊: ${this.puntosAcumulados}`);
        console.log(`Puntaje total máquina🤖: ${this.puntosAcumuladosMaquina}`);

        if (this.puntosAcumulados > this.puntosAcumuladosMaquina) {
            console.log("🏆¡Me ganaste! felicitaciones");
        } else if (this.puntosAcumulados < this.puntosAcumuladosMaquina) {
            console.log("¡Te he ganado!");
        } else {
            console.log("¡Es un empate!");
        }
    }
}
