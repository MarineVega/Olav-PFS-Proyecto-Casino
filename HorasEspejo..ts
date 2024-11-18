export class HorasEspejo {
    private hora: number;
    private minutos: number;
    private puntosAcumulados: number;
    private intentosJugador: number;
    private intentosMaquina: number;
    private puntosAcumuladosMaquina: number;

    constructor() {
        this.hora = 0;
        this.minutos = 0;
        this.puntosAcumulados = 0;
        this.intentosJugador = 3; 
        this.intentosMaquina = 3; 
        this.puntosAcumuladosMaquina = 0;
    }
 
    //se mejoro el metodo para que haya una probabilidad de sacar del 50% horas espejo
    public generarHoraEspejo(): string {
        // Definir las horas espejo conocidas
        const horasEspejo: string[] = [
            "01:10", "02:20", "03:30", "04:40", "05:50", "10:01", "11:11", "12:21",
            "13:31", "14:41", "15:51", "20:02", "21:12", "22:22","23:32", "00:00"
        ];
    
        // Generar un índice aleatorio para elegir una hora espejo
        const generarEspejo = Math.random() < 0.3; // 50% de probabilidad de generar una hora espejo
    
        if (generarEspejo) {
            // Elegir una hora espejo aleatoria de la lista
            const indiceAleatorio = Math.floor(Math.random() * horasEspejo.length);
            return horasEspejo[indiceAleatorio];
        } else {
            // Si no, generar una hora aleatoria normal
            this.hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
            this.minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
    
            // Formatear la hora y los minutos
            const horaFormateada = this.hora < 10 ? `0${this.hora}` : `${this.hora}`;
            const minutosFormateados = this.minutos < 10 ? `0${this.minutos}` : `${this.minutos}`;
            return `${horaFormateada}:${minutosFormateados}`;
        }
    }
    

    // T
    public jugar(quienJuega: 'jugador' | 'maquina'): { horaIntento: string, puntos: number, gano: boolean, intentosRestantes: number } {
        let intentosRestantes = (quienJuega === 'jugador') ? this.intentosJugador : this.intentosMaquina;
        
        if (intentosRestantes <= 0) {
            console.log(`¡No hay intentos disponibles para el ${quienJuega}!`);
            return { horaIntento: "", puntos: 0, gano: false, intentosRestantes: 0 };
        }

        const horaFormateada = this.generarHoraEspejo(); // Generar la hora formateada
        return this.sumarPuntos(horaFormateada, quienJuega); // Llamar a la función que calcula puntos
    }

    // Suma puntos segun la hora obtenida
    private sumarPuntos(horaFormateada: string, quienJuega: 'jugador' | 'maquina'): {
        horaIntento: string,
        puntos: number,
        gano: boolean,
        intentosRestantes: number
    } {
        const puntos10: string[] = ["02:20", "03:30", "04:40", "05:50", "10:01", "12:21",
            "13:31", "14:41", "15:51", "20:02", "21:12", "23:32"];
        const puntos25: string[] = ["11:11", "22:22"];

        // Verificar si la hora es "00:00" ya que gana el juego
        if (horaFormateada === "00:00") {
            console.log(`¡${quienJuega === 'maquina' ? 'La máquina' : 'El jugador'} gana con la hora 00:00!`);
            return { horaIntento: horaFormateada, puntos: 10000, gano: true, intentosRestantes: quienJuega === 'maquina' ? this.intentosMaquina : this.intentosJugador };
        }

        // Determinar puntos según la hora usando indexOf
        let puntos = 0;
        if (puntos10.indexOf(horaFormateada) !== -1) {
            puntos = 10;
            console.log(`¡Hora válida para 10 puntos!: ${horaFormateada}`);
        } else if (puntos25.indexOf(horaFormateada) !== -1) {
            puntos = 25;
            console.log(`¡Hora válida para 25 puntos!: ${horaFormateada}`);
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
        console.log(`Puntaje total jugador: ${this.puntosAcumulados}`);
        console.log(`Puntaje total máquina: ${this.puntosAcumuladosMaquina}`);
     
        if (this.puntosAcumulados > this.puntosAcumuladosMaquina) {
            console.log("¡Me ganaste! felicitaciones");
        } else if (this.puntosAcumulados < this.puntosAcumuladosMaquina) {
            console.log("¡Te he ganado!");
        } else {
            console.log("¡Es un empate!");
        }
    }
}
