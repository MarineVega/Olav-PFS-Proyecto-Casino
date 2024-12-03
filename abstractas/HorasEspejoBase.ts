import { Juego } from "./Juego";
import { Usuario } from "../clases/Usuario";
import * as rs from "readline-sync";

export abstract class HorasEspejoBase extends Juego {
    protected intentosJugador: number;
    protected puntosAcumulados: number;
    protected puntosMayor:number;
    protected puntosDobles:number;
    protected puntosSimples:number;
    protected horasGandoras:string[];
    protected jugador: Usuario;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario) {
        super(nombre, reglamento, apuMin, apuMax, jugador);
        this.intentosJugador = 3;
        this.puntosAcumulados = 0;
        this.puntosMayor=50;
        this.puntosDobles=20;
        this.puntosSimples=10;
        this.horasGandoras=[
            "01:10", "02:20", "03:30", "04:40", "05:50",
            "10:01", "11:11", "12:21", "13:31", "14:41",
            "15:51", "20:02", "21:12", "22:22", "23:32", "00:00"];
        this.jugador = jugador;
    }

    protected generarHoraAleatoria(): string {
        // Probabilidad de generar una hora espejo (30%)
        const probabilidadEspejo = 0.3; 
    
        if (Math.random() < probabilidadEspejo) {
            // Selecciona una hora espejo aleatoria
            const indice = Math.floor(Math.random() *this.horasGandoras.length);
            return this.horasGandoras[indice];
        }
    
        // Genera una hora completamente aleatoria
        const hora = Math.floor(Math.random() * 24); // Hora entre 0 y 23
        const minutos = Math.floor(Math.random() * 60); // Minutos entre 0 y 59
        const horaFormateada = hora < 10 ? `0${hora}` : `${hora}`;
        const minutosFormateados = minutos < 10 ? `0${minutos}` : `${minutos}`;
        
        return `${horaFormateada}:${minutosFormateados}`;
    }

    
    //DETERMINO QUE SEA UNA HORA ESPEJO COMPARANDO LAS POSICIONES DEL STRING
    protected determinarPuntaje(hora: string): number {
        // VERIFICO QUE SEA UNA HORA ESPEJO
        if (hora[0] === hora[4] && hora[1] === hora[3]) {
            switch (hora) {
                case "00:00":
                    return this.puntosMayor; // Puntaje máximo para "00:00"
                case "11:11":
                case "22:22":
                    return this.puntosDobles; // Puntaje especial para "11:11" y "22:22"
                default:
                    return this.puntosSimples // PUNTAJE RESTO HORAS ESPEJO
            }
        }

        return 0; //NO ES UNA HORA ESPEJO
    }
    
    protected preguntarSiContinua(): boolean {
        const sigueJugando = rs.question("Desea jugar otra vez? S/N: ");
        console.clear();

        if (sigueJugando.toLocaleLowerCase() === 'n') {
            console.log(`Has elegido salir del juego`);
            return false; // El jugador no desea continuar
        } else {
            console.log(`Jugaras otra ronda.\n`);
            this.restablecerJuego();
            return true; // El jugador desea continuar
        }
    }
    
    // Método abstracto 
    protected abstract restablecerJuego(): void;
}

