import { Juego } from "./Juego";
import { Tragamoneda } from "./Tragamoneda";
import { Usuario } from "./Usuario";

export class TragamonedaPremium extends Tragamoneda {
    private comodin: string;
    readonly FACTOR_SUERTE: number = 2; 

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario, intentosMaximos: number) {
        super(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos);
        this.valores = ["🍎", "🍐", "🍇", "🍍", "🍉", "🍏", "🍒", "🍊", "🫐", "🍌"];
        this.comodin = "🃏";  
        this.agregarComodin();  
        this.barras = Array.from({ length: this.numBarras }, () => this.generarBarra(this.numElementos));
    }

    public getComodin(): string {
        return this.comodin;
    }

    public agregarComodin(): void {
        const comodinesADistribuir = Math.floor(this.FACTOR_SUERTE); 
        for (let i = 0; i < comodinesADistribuir; i++) {
            this.valores.push(this.comodin);
        }
    }

    public generarBarra(numElementos: number): string[] {
        const barra: string[] = [];
        for (let i = 0; i < numElementos; i++) {
            const valorAleatorio = this.valores[Math.floor(Math.random() * this.valores.length)];
            barra.push(valorAleatorio);
        }
        return barra;
    }

    public bonificacionDeTirada(resultado: string[]): void {
        if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log(`Winner 🏆‼️ 🎉 Has sacado tres ${resultado[0]} iguales 🎉 Se suma dinero a tu billetera 💲💰`);

            this.jugador.agregarDinero(1500);
        }
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
        }

        if (resultado.includes(this.comodin)) {
            this.duplicarIntentos();  
        }

        console.log("Intentos Restantes:", this.intentosMaximos);
        this.bonificacionDeTirada(resultado);
    }

    public duplicarIntentos(): void {
        this.intentosMaximos *= 2; 
        console.log("🎊Has obtenido el comodin🎊 ¡Duplicaste tus intentos! 🎁 Ahora tienes", this.intentosMaximos, "intentos.");
    }
}

