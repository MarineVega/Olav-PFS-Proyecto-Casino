import { Juego } from "./Juego";
import { Usuario } from "./Usuario";

export abstract class Tragamoneda extends Juego {
    protected intentosMaximos: number;
    protected barras: string[][] = [];  
    protected valores: string[] = []; 
    protected numBarras: number = 3;  
    protected numElementos: number = 5;

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario, intentosMaximos: number) {
        super(nombre, reglamento, apuMin, apuMax, jugador);
        this.intentosMaximos = intentosMaximos;
    }

    protected abstract generarBarra(numElementos: number): string[];

    public inicializarBarras(): void {
        this.barras = Array.from({ length: this.numBarras }, () => this.generarBarra(this.numElementos));
    }

    public getIntentosMaximos(): number {
        return this.intentosMaximos;
    }

    public setIntentosMaximos(intentosMaximos: number): void {
        this.intentosMaximos = intentosMaximos;
    }

    public setNumBarras(numBarras: number): void {
        this.numBarras = numBarras;
        this.inicializarBarras();
    }

    public setNumElementos(numElementos: number): void {
        this.numElementos = numElementos;
        this.inicializarBarras();  
    }

    protected tirar(): string[] {
        if (this.intentosMaximos <= 0) {
            console.log("Upss❗ No quedan más intentos 🥺.");
            return [];
        }

        const resultado: string[] = [];
        for (let index = 0; index < this.barras.length; index++) {
            const barra = this.barras[index];
            const posicionAleatoria = Math.floor(Math.random() * barra.length);
            resultado.push(barra[posicionAleatoria]);
        }

        this.intentosMaximos--;
        console.log("Acaba de tirar! Buena suerte 🤞");
        return resultado;
    }

    protected abstract bonificacionDeTirada(resultado: string[]): void;

    public mostrarResultado(): void {
        const resultado = this.tirar();
        if (resultado.length > 0) {
            console.log("Resultado de la tirada:", resultado.join(" | "));
            console.log("Intentos Restantes:", this.intentosMaximos);
        }
    }
}