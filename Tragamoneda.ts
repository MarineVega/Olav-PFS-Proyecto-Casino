import { Juego } from "./Juego"
import { Usuario } from "./Usuario"

export class Tragamoneda extends Juego {
    protected intentosMaximos: number;
    protected barras: string[][];
    protected valores: string[];

    constructor(nombre: string, reglamento: string, intentosMaximos: number, numBarras: number, numPosiciones: number) {
        super(nombre, reglamento);
        this.intentosMaximos = intentosMaximos;
        this.valores = ["🏀", "🎱", "🏐", "⚽", "🏈", "🏉", "🏓", "🥊", "🏑", "🎾", "⛸️", "⛳"];  
        this.barras = Array.from({ length: numBarras }, () => this.generarBarra(numPosiciones));
    }

    public getIntentosMaximos(): number {
        return this.intentosMaximos;
    }

    public getValores(): string[] {
        return this.valores;
    }

    public setIntentosMaximos(intentosMaximos: number): void {
        this.intentosMaximos = intentosMaximos;
    }

    protected generarBarra(numPosiciones: number): string[] {
        const barra: string[] = [];
        for (let i = 0; i < numPosiciones; i++) {
            const valorAleatorio = this.valores[Math.floor(Math.random() * this.valores.length)];
            barra.push(valorAleatorio);
        }
        console.log(barra)
        
        return barra;
    }

    protected tirar(): string[] {
        if (this.intentosMaximos <= 0) {
            console.log("Upss❗ No quedan más intentos 🥺.");
            return [];  
        }

        const resultado: string[] = [];
        for (let index = 0; index < this.barras.length; index++) {
            const barras = this.barras[index];
            const posicionAleatoria = Math.floor(Math.random() * barras.length);
            resultado.push(barras[posicionAleatoria]);
        }

        this.intentosMaximos--;
        console.log("Acaba de tirar! Buena suerte 🤞");
        return resultado;
    }

    public mostrarResultado(): void {
        const resultado = this.tirar();
        if (resultado.length > 0) { 
            console.log("Resultado de la tirada:", resultado.join(" | "));
            console.log("Intentos Restantes:", this.intentosMaximos);
        }
    }


}
