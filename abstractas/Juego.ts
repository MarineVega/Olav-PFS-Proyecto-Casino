import { Apuesta } from "../interfaz/Apuesta";
import { Usuario } from "../clases/Usuario";
import * as rs from "readline-sync";

export abstract class Juego implements Apuesta{
    protected nombre: string;
    protected reglamento: string;
    protected apuestaMinima: number;
    protected apuestaMaxima: number;
    protected dinero: number;
    protected jugador: Usuario;
    protected apuesta: number;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario){
        this.nombre = nombre;
        this.reglamento = reglamento;
        this.dinero = 0;
        this.jugador = jugador;
        this.apuesta = 0;
        this.apuestaMinima = apuMin;
        this.apuestaMaxima = apuMax;
    }

    //public abstract jugar(): void;

    //Interface Apuesta

    public apostar(): boolean {
        if(this.verifcarBilletera()){

            let costo: number = rs.questionInt('Ingrese su apuesta: ');

            console.clear();

            if (this.validarMinimosMaximos(costo)) {        
                if (this.verificarDinero(costo)) {
                    if(this.gastarDinero(costo)) {
                        console.log(`\n✔️  La apuesta de💲${costo} se realizó exitosamente ✔️\n`)
                        return true;
                    } 
                }
                console.log("\n❌ El dinero disponible no es suficiente para realizar la apuesta ❌\n")
                    
            } else {
                console.log(`\n❌💲${costo} excede los rangos admitidos de apuesta mínima (💲${this.apuestaMinima}) y/o apuesta máxima (💲${this.apuestaMaxima})❌\nVuelva a realizar la apuesta!\n`);
            }
        } else {
            console.log(`\n❌ No dispones de dinero para cumplir con la apuesta minima de💲${this.apuestaMinima}❌ \nCarga dinero antes de continuar!\n`);
            
        }

        return false;
        
    };

    // Chequea que el dinero disponible del jugador le alcance para realizar la apuesta
    public verificarDinero (apuesta: number): boolean {
        return (this.jugador.obtenerSaldo() >= apuesta);  
    };

    public gastarDinero(monto: number): boolean {
        let disponible: number;
        disponible = this.jugador.obtenerSaldo() - monto; 
          
        if (disponible >= 0) {
            this.jugador.setBilletera(disponible);
            this.apuesta = monto;

            return true;
        } else {
            return false;            
        }
    };  

    //Paga la apuesta al finalizar el juego
    public pagarApuesta(dinero: number): void {
        this.jugador.sumarJuegoGanado();

        let disponible = this.jugador.obtenerSaldo();
        disponible += dinero;
        this.jugador.setBilletera(disponible);
        
        console.log("\n💸💸💸💸💸💸\n");
        console.log(`Felicitaciones ${this.jugador.getAlias()}!!! 🎉 Ganó 💲${dinero} 💰\n`);
        console.log(`🎉🥂 Tienes💲${this.jugador.obtenerSaldo()} disponibles para seguir jugando!!! 🥂🎉\n`);
    };


    //Metodos de Juego
    
    public mostrarJuego(): string {
        return `Juego: ${this.getNombre()}`
    }

    protected cargarDinero(cantDinero: number): void {
        this.dinero += cantDinero;
    }

    protected usarDinero(cantDinero: number): void {
        this.dinero =- cantDinero;
    }

    protected iniciarJuego(dinero: number): void{
        this.cargarDinero(dinero);
    }

    //Muestra info como apuesta minima y maxima al comenzar el juego y saldo disponible del jugaodr
    protected mostrarInfoComienzoJuego(): void {
        console.log(`💸 Apuesta Minima de💲${this.getApuestaMinima()} Hasta💲${this.getApuestaMaxima()} 💸\n`);
        console.log(`Saldo disponible en su Billetera:💲${this.jugador.obtenerSaldo()}\n`);
    }

    //Cobro por empezar a jugar el juego
    protected mostrarInfoCobroEntrada(): void {
        this.gastarDinero(this.getApuestaMinima()); 
        console.log(`Se le ha cobrado ademas,💲${this.getApuestaMinima()} de costo del juego!\n`);
    }

    protected preguntarSiContinua(): boolean {
        let sigueJugando: string;

        do {
            sigueJugando = rs.question("\nDesea seguir jugando? S/N: ");
        } while (!["s", "n"].includes(sigueJugando.toLowerCase()))
            
        console.clear();

        return sigueJugando === 's' ? true : false;
    }

    //Verificaciones

    //Chequea si la apuesta esta entre los valores permitidos del juego
    public validarMinimosMaximos(apuesta: number): boolean {
        return (apuesta >= this.apuestaMinima && apuesta <= this.apuestaMaxima);
    }  
    
    //Chequea si cumple al menos con la minima apuesta para poder jugar
    public verifcarBilletera(): boolean {
        return (this.jugador.obtenerSaldo() >= this.getApuestaMinima());
    }

    //Logueo

    //Si se cambia de usuario, actualizo el jugador en el juego
    public cambiarJugador(nuevoJugador: Usuario): void{
        this.jugador = nuevoJugador;
    }

    public desloguearJugador(): void {
        let usuario: Usuario = new Usuario("", "", 0, 0);
        this.jugador = usuario;
    }

    //Getter and setters

    protected getApuesta(): number {
        return this.apuesta;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getReglamento(): string {
        return this.reglamento;
    }

    public setReglamento(reglamento: string): void {
        this.reglamento = reglamento;
    }

    public getApuestaMinima(): number {
        return this.apuestaMinima;
    }

    public setApuestaMinima(apuestaMinima: number): void {
        this.apuestaMinima = apuestaMinima;
    }

    public getApuestaMaxima(): number {
        return this.apuestaMaxima;
    }

    public setApuestaMaxima(apuestaMaxima: number): void {
        this.apuestaMaxima = apuestaMaxima;
    }

    public getDinero(): number {
        return this.dinero;
    }

    public setDinero(creditos: number): void {
        this.dinero = creditos;
    }
    
}