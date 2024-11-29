import { Tragamoneda } from "./Tragamoneda";
import { Usuario } from "./Usuario";

export class TragamonedaSports extends Tragamoneda {

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario, intentosMaximos: number) {
        super(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos);
        this.valores = ["🏀", "🎱", "🏐", "⚽", "🏈", "🏉", "🏓", "🥊", "🏑", "🎾", "⛸️", "⛳"];
       //this.valores = ["🏀"];// Nos permite probar el método en caso de que salgan tres valores iguales.
        this.inicializarBarras();
    }

    protected generarBarra(numElementos: number): string[] {
        const barra: string[] = [];
        for (let i = 0; i < numElementos; i++) {
            const valorAleatorio = this.valores[Math.floor(Math.random() * this.valores.length)];
            barra.push(valorAleatorio);
        }
        return barra;
    }

    public bonificacionDeTirada(resultado: string[]): void {
        if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log(`Ganaste🏆‼️ 🎉 Sacaste tres ${resultado[0]} iguales 🎉 Se suma dinero a tu billetera💲💰`);

            this.jugador.agregarDinero(3000); 
        }
        else if (resultado[0] === resultado[1] || resultado[1] === resultado[2] || resultado[0] === resultado[2]) {
            console.log(`¡Bonificación! 🎉 Has sacado dos deportes iguales 🎉 Se suma dinero a tu billetera💲💰`);
            this.jugador.agregarDinero(1500);
        }
    }

    public mostrarResultado(): void {
        const resultado = this.tirar();
        if (resultado.length > 0) {

            console.log(resultado.join(" | "));
            console.log("Intentos Restantes:", this.intentosMaximos);

            this.bonificacionDeTirada(resultado);
        }
    }
}
