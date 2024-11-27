import { Apuesta } from "./Apuesta";
import { Usuario } from "./Usuario";

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

    //Interface Apuesta

    protected iniciarJuego(dinero: number): void{
        this.cargarDinero(dinero);
    }

    
    protected mostrarJuego(): string {
        return `Juego: ${this.getNombre()}\nReglamento: ${this.getReglamento()}`
    }

    protected cargarDinero(cantDinero: number): void {
        this.dinero += cantDinero;
    }

    protected usarDinero(cantDinero: number): void {
        this.dinero =- cantDinero;
    }

    //Getter and setters
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

    
    public apostar(costo: number): boolean {
        
        if (this.validarMinimosMaximos(costo)) {        
            if (this.verificarDinero(costo)) {
                if(this.gastarDinero(costo)) {
                    console.log(`La apuesta de ${costo} se realizó exitosamente`)
                    return true;
                } else {
                    console.log("El dinero disponible no es suficiente para realizar la apuesta.")
                    return false;
                }
            } else {
                console.log("El dinero disponible no es suficiente para realizar la apuesta.")
                return false;
            }
        } else {
            console.log(`El dinero apostado $ ${costo} excede los rangos admitidos de apuesta mínima ($ ${this.apuestaMinima}) y/o apuesta máxima ($ ${this.apuestaMaxima}).\nVuelva a realizar la apuesta`);
            return false
        }
    };

    // Chequeo que el dinero disponible del jugador le alcance para realizar la apuesta
    public verificarDinero (costo: number): boolean {
        if (this.jugador.obtenerSaldo() >= costo) {
            return true;
        } else {
            return false;
        }
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

    public pagarApuesta(dinero: number): void {
        let juegosGanados = this.jugador.getJuegosGanados();
        juegosGanados += juegosGanados;
        this.jugador.setJuegosGanados(juegosGanados);

        let disponible = this.jugador.obtenerSaldo();
        disponible += dinero;
        this.jugador.setBilletera(disponible);
        
        console.log("");
        console.log("💸💸💸💸💸💸");
        
        console.log(`Felicitaciones!!! ganó $ ${dinero} 💰`);
        console.log(`Tiene $ ${this.jugador.obtenerSaldo()} disponibles para seguir jugando!!!`);
    };
    

    private validarMinimosMaximos(costo: number): boolean {
        if (costo >= this.apuestaMinima && costo <= this.apuestaMaxima) {
            return true;
        } else {
            return false;
        }
    }   
}