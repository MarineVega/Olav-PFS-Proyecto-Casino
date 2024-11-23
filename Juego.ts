import { Apuesta } from "./Apuesta";

export abstract class Juego implements Apuesta{
    protected nombre: string;
    protected reglamento: string;
    protected apuestaMinima: number;
    protected apuestaMaxima: number;
    protected dinero: number;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number){
        this.nombre = nombre;
        this.reglamento = reglamento;
        this.dinero = 0;
        this.setApuestaMinima(apuMin);    
        this.setApuestaMaxima(apuMax);
    }

    //Interface Apuesta

    abstract apostar(costo: number): void;
    abstract verificarDinero(dineroDisponible: number): void;
    abstract gastarDinero(monto: number): void;
    abstract pagarApuesta(dinero: number): void;
    abstract duplicarApuesta(monto: number): void;

    protected iniciarJuego(dinero: number): void{
        this.cargarDinero(dinero);
    }

    //Metodos abstractos para implementar en cada Juego
    
    protected abstract finalizarJuego(): void;

    protected abstract determinarGanador(): void; 

    protected mostrarJuego(): string {
        return `Juego: ${this.getNombre()}\nReglamento: ${this.getReglamento()}`
    }

    protected cargarDinero(cantDinero: number): void {
        this.dinero += cantDinero;
    }

    protected usarDinero(cantDinero: number): void {
        this.dinero =- cantDinero;
    }

    //protected retirarDinero() envia el dinero a la billetera del usuario

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

}
