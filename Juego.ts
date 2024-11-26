import { Apuesta } from "./Apuesta";
import { Usuario } from "./Usuario";

export abstract class Juego implements Apuesta{
    protected nombre: string;
    protected reglamento: string;
    protected apuestaMinima: number;
    protected apuestaMaxima: number;
    protected creditos: number;
    protected equivalenciaCredito: number;
    protected usuario: Usuario;
    //protected apuesta: number;

    constructor(nombre: string, reglamento: string){
        this.nombre = nombre;
        this.reglamento = reglamento;
        this.apuestaMinima = 0;
        this.apuestaMaxima = 0;
        this.creditos = 0;
        this.equivalenciaCredito = 0;
    }

    protected iniciarJuego(apuMin: number, apuMax: number, equivCred: number): void{
        this.setApuestaMinima(apuMin);    
        this.setApuestaMaxima(apuMax);
        this.setEquivalenciaCredito(equivCred);
    }

    protected mostrarJuego(): string {
        return `Juego: ${this.getNombre()}\nReglamento: ${this.getReglamento()}`
    }

    protected cargarCredito(cantCreditos: number): void {
        this.creditos += cantCreditos;
    }

    protected usarCredito(): void {
        this.creditos--;
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

    public getCreditos(): number {
        return this.creditos;
    }

    public setCreditos(creditos: number): void {
        this.creditos = creditos;
    }

    public getEquivalenciaCredito(): number {
        return this.equivalenciaCredito;
    }

    public setEquivalenciaCredito(equivalenciaCredito: number): void {
        this.equivalenciaCredito = equivalenciaCredito;
    }

    //Interfaz Apuesta

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

    public verificarDinero (costo: number): boolean {
        if (this.usuario.getBilletera() >= costo) {
            return true;
        } else {
            return false;
        }
    };

    public gastarDinero(monto: number): boolean {
        let disponible: number;
        disponible = this.usuario.getBilletera() - monto;   
        if (disponible >= 0) {
            this.usuario.setBilletera(disponible);
            //this.apuesta = monto;
            return true;
        } else {
            return false;            
        }
    };  

    public pagarApuesta(dinero: number): void {
        let ranking = this.usuario.getRanking();
        ranking += ranking;
        this.usuario.setRanking(ranking);

        let disponible = this.usuario.getBilletera();
        disponible += dinero;
        this.usuario.setBilletera(disponible);
        
        console.log("");
        console.log("💸💸💸💸💸💸");
        
        console.log(`Felicitaciones!!! ganó $ ${dinero} 💰`);
        console.log(`Tiene $ ${this.usuario.getBilletera()} disponibles para seguir jugando!!!`);
    };

    private validarMinimosMaximos(costo: number): boolean {
        if (costo >= this.apuestaMinima && costo <= this.apuestaMaxima) {
            return true;
        } else {
            return false;
        }
    }
}