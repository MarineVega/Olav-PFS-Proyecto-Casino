import { match } from "assert";
import { Juego } from "./Juego";

export class Tragamoneda extends Juego{
    protected intentosMaximos: number;
    protected barras: string[][];
    protected valores: string[];

    constructor(nombre:string,reglamento:string,intentosMaximos: number, numBarras: number, numPosiciones: number) {
        super(nombre,reglamento);
        this.intentosMaximos = intentosMaximos;
        this.valores = ["🏀", "🎱", "🏐", "⚽", "🏈", "🏉", "🏓", "🥊", "🏑", "🎾", "⛸️", "⛳"];  //12
        this.barras = Array.from({ length:numBarras }, () => this.generarBarra(numPosiciones)); // en cada numbarras genera vectores "barras"
       // console.log(this.barras);
        //console.log("jugada cargada");
    }
  protected  finalizarJuego():void{
        console.log("final de juego");

    };

    public getIntentosMaximos(): number {
        return this.intentosMaximos;
    }

    public getValores(): string[] {
        return this.valores;
    }

    public setIntentosMaximos(intentosMaximos: number): void {
        this.intentosMaximos = intentosMaximos;
    }

    private generarBarra(numPosiciones: number): string[] {
        const barra: string[] = [];
         let valorRandom=0;
       
        for (let i = 0; i < numPosiciones; i++) { // cantidad de elementos del rodillo

            if ((this.apuestaMinima>=2587)&&(this.apuestaMinima<=2956)){  //valor que usamos para modificar la estadistica
                   valorRandom= Math.floor((Math.random())*(0.5*this.valores.length-0.55*this.valores.length)+(0.1*this.valores.length))
                   //console.log(`mirandom${valorRandom}`);
            }else {
                valorRandom =Math.floor(Math.random() * this.valores.length)
            }       
            const valorAleatorio = this.valores[valorRandom]; //rango  aleatorios para llevarme valores desde vector valores a la barra 
            barra.push(valorAleatorio);
           
        }
        //console.log(barra);
        return barra;
    }

    protected tirar(): string[] {
         const resultado: string[] = [];

        if (this.intentosMaximos <= 0) {
            console.log("Upss❗ No quedan más intentos 🥺.");
            return [];  
        }
        console.log(`longitud de barras ${this.barras.length}`);
        for (let index = 0; index < this.barras.length; index++) {
            const barras = this.barras[index];// de la matriz completa..le paso a barras[].. el vector "i"(o sea la fila "i")
           // console.log("this");
           // console.log(this.barras);
           // console.log(`constante barras${barras}`);
            const posicionAleatoria = Math.floor(Math.random() * barras.length);// de ese vector que tengo ahora en barras miro la posicion "esta"
           // console.log(posicionAleatoria);
            resultado.push(barras[posicionAleatoria]);//extrae un elemento aleatorio de cada vestor "i" y lo guarga en resultado
            //console.log(`resultado${resultado}`);
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


