import { Juego } from "../abstractas/Juego";
import { Usuario } from "../clases/Usuario";
import * as readline from "readline-sync";

export class HorasEspejoSolitario extends Juego {
    private intentosJugador: number;
    private puntosAcumulados: number;
    private puntosNumIguales: number;
    private puntosMayor:number;
    private puntosEspejo: number;
    private puntosGanador:number;
    protected jugador: Usuario;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario) {
        super(nombre, reglamento, apuMin, apuMax, jugador);
        this.intentosJugador = 3;
        this.puntosAcumulados = 0;
        this.jugador = jugador;
        this.puntosNumIguales= 20;
        this.puntosMayor=50;
        this.puntosEspejo=10;
        this.puntosGanador=30;
    }

    private generarHoraAleatoria(): string {
        //SINO HARdCODEO UN POCO HAY QUE HACER MILLONES DE PARTIDAS 
        const horasEspejo = [
            "01:10", "02:20", "03:30", "04:40", "05:50",
            "10:01", "11:11", "12:21", "13:31", "14:41",
            "15:51", "20:02", "21:12", "22:22", "23:32", "00:00"
        ];
    
        // Probabilidad de generar una hora espejo (30%)
        const probabilidadEspejo = 0.3; 
    
        if (Math.random() < probabilidadEspejo) {
            // Selecciona una hora espejo aleatoria
            const indice = Math.floor(Math.random() * horasEspejo.length);
            return horasEspejo[indice];
        }
    
        // Genera una hora completamente aleatoria
        const hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
        const minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
        const horaFormateada = hora < 10 ? `0${hora}` : `${hora}`;
        const minutosFormateados = minutos < 10 ? `0${minutos}` : `${minutos}`;
        return `${horaFormateada}:${minutosFormateados}`;
    }
    
    //DETERMINO QUE SEA UNA HORA ESPEJO COMPARANDO LAS POSICIONES DEL STRING
    private determinarPuntaje(hora: string): number {
        // VERIFICO QUE SEA UNA HORA ESPEJO
        if (hora[0] === hora[4] && hora[1] === hora[3]) {
            switch (hora) {
                case "00:00":
                    return this.puntosMayor; // Puntaje máximo para "00:00"
                case "11:11":
                case "22:22":
                    return this.puntosNumIguales; // Puntaje especial para "11:11" y "22:22"
                default:
                    return this.puntosEspejo; // PUNTAJE RESTO HORAS ESPEJO
            }
        }

        return 0; //NO ES UNA HORA ESPEJO
    }


    // EJECUTA UN TURNO, HASTA 3 POSIBILIDADES 
    private jugarTurno(): boolean {
        const horaFormateada = this.generarHoraAleatoria();
        const puntos = this.determinarPuntaje(horaFormateada);
        //MAXIMO PUNTAJE     
        if (puntos === this.puntosMayor) {
            console.log(`🎉 ¡GANASTE con 🕛"00:00"! 🎉`);
            this.puntosAcumulados = this.puntosMayor; // Puntos máximos al ganar con "00:00"
            this.intentosJugador = 0;
            return true; // SI GANO CON 00:00 DEBE TERMINAR
        }

        this.puntosAcumulados += puntos;
        this.intentosJugador--;

        console.log(`⏰ Hora: ${horaFormateada}, Puntos obtenidos: ${puntos}`);
        console.log(`Puntos acumulados: ${this.puntosAcumulados}`);
        return this.puntosAcumulados >= this.puntosGanador; // ACA GANA POR PUNTOS ACUMULADOS
    }

    // Iniciar la partida
    public jugar(): void {
        this.mostrarInfoComienzoJuego();

        this.gastarDinero(this.apuestaMinima);

        let sigueJugando: string;

        if(this.apostar()){
            this.mostrarInfoCobroEntrada();
            
            console.log("\n--- 🍀 INICIA LA PARTIDA 🍀 ---");

            while (this.intentosJugador > 0) {
                console.log(`Intentos restantes: ${this.intentosJugador}`);
                console.log("Presiona una tecla para jugar...");
                readline.question(); // Espera a que el jugador presione una tecla

                const victoria = this.jugarTurno();
                if (victoria) {
                    console.log("🎉 ¡Ganaste al alcanzar 30 puntos o más! 🎉");
                    if ((this.puntosAcumulados >= this.puntosGanador) && (this.puntosAcumulados < 50)) {
                        this.pagarApuesta(this.apuestaMinima * 2); // Premiar con el doble de la apuesta mínima
                        
                    }
                    else if (this.puntosAcumulados >= this.puntosMayor) {
                        this.pagarApuesta(this.apuestaMinima * 10); //el premio mayor
                        break;
                    }
                }
            }

            if (this.intentosJugador === 0 && this.puntosAcumulados < this.puntosGanador) {
                console.log('____________________________________________________________')
                console.log("😞 No alcanzaste los puntos necesarios. ¡Suerte la próxima!");
                console.log('____________________________________________________________')
            }

        
            console.log(`Puntaje final: ${this.puntosAcumulados}`);
            console.log(`Saldo final del jugador💸: ${this.jugador.obtenerSaldo()}`);
            
            // Preguntar si desea jugar nuevamente
            sigueJugando = readline.question("Desea jugar otra vez? S/N: ");

            if (sigueJugando.toLocaleLowerCase() === 'n'){
                console.log(`\nHas elegido salir del juego`); 

            } else {
                console.log(`\nJugaras otra ronda.`);
                this.restablecerJuego();
                this.jugar();
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
