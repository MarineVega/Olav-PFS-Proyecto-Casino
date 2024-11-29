import { Apuesta } from "./Apuesta";
import { Tragamoneda } from "./Tragamoneda";
import { Usuario } from "./Usuario";


export class TragamonedaSports extends Tragamoneda implements Apuesta {

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario, intentosMaximos: number) {
        super(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos);
        this.valores = ["🏀", "🎱", "🏐", "⚽", "🏈", "🏉", "🏓", "🥊", "🏑", "🎾", "⛸️", "⛳"];
       //this.valores = ["🏀"];// Nos permite probar el método en caso de que salgan tres valores iguales.
        this.inicializarBarras();
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
        if (this.getIntentosMaximos() >= 0){
            const resultado = this.tirar();
            if (resultado.length > 0) {

                console.log(`| ${resultado.join(`  |  `)}|`);
                console.log("Intentos Restantes:", this.intentosMaximos);
                console.log(`\n`);
    
                this.bonificacionDeTirada(resultado);
            }
        }
    }
}
