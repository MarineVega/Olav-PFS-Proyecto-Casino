import { Juego } from "./Juego";
import { Usuario } from "../clases/Usuario";
import * as rs from "readline-sync";

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

    public generarBarra(numElementos: number): string[] {
        const barra: string[] = [];
        for (let i = 0; i < numElementos; i++) {
            const valorAleatorio = this.valores[Math.floor(Math.random() * this.valores.length)];
            barra.push(valorAleatorio);
        }
        return barra;
    }

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
            //console.log("Intentos Restantes:", this.intentosMaximos);
        }
    }

    public jugar(): void{
        console.log(`Apuesta 💸 $${this.getApuestaMinima()} Hasta $${this.getApuestaMaxima()}\n`);
        console.log(`Saldo en su Billetera: $${this.jugador.obtenerSaldo()}\n`);
    
        let continua: boolean = true;
        let sigueJugando: string;
    
        if (this.apostar()) {
            
            let intentos: number = this.getIntentosMaximos();
    
            while (intentos > 0 && continua) {
                console.log("  ")
                console.error("Presione Enter para tirar🤞");
                rs.question();
                this.mostrarResultado();
                intentos = this.getIntentosMaximos();
    
                if(intentos > 0){
                    sigueJugando = rs.question("Desea seguir jugando? S/N: ");
                } else {
                    console.log("Upss❗ No quedan más intentos 🥺.\n");
                }
    
                if(sigueJugando.toLocaleLowerCase() === 'n'){
                    console.log(`\nHas elegido salir del juego`);
                    continua = false; 
                }
            }
    
            console.log(`\nSaldo final en tu Billetera: $${this.jugador.obtenerSaldo()}`);
    
        } else {
            
            this.jugar();
        }
    }
}