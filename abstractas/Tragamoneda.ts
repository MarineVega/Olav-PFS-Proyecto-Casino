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
        console.log("Acaba de tirar! Buena suerte 🤞\n");
        return resultado;
    }

    protected abstract bonificacionDeTirada(resultado: string[]): void;

    protected abstract mostrarResultado(): void;

    public jugar(): void{
        this.mostrarInfoComienzoJuego();
    
        let continua: boolean = true;
    
        if (this.apostar()) {
            
            let intentos: number = this.getIntentosMaximos();
    
            while (intentos > 0 && continua) {
                console.error("Presione Enter para tirar 🤞");
                rs.question();

                intentos = this.getIntentosMaximos();

                console.clear();

                this.mostrarResultado();
                
                if(intentos > 0){
                    continua = this.preguntarSiContinua();
                    
                    if(continua){
                        console.log(`Continuas Jugando!\n`);
                        
                    } else {
                        console.log(`Has elegido salir del juego\n`);
                    }
                    
                } else {
                    console.log("Upss❗ No quedan más intentos 🥺.\n");
                }
                
            }

            console.log(`Saldo final en tu Billetera:💲${this.jugador.obtenerSaldo()}`);
    
        } else { 
            if(this.verifcarBilletera()){ //Si dispone de saldo para el minimo, pero ingresa un valor fuera del rango de min/ max, entra aca
                this.jugar();
            }
        }
    }
}