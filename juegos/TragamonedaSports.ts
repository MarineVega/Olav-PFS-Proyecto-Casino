import { Tragamoneda } from "../abstractas/Tragamoneda";
import { Usuario } from "../clases/Usuario";

export class TragamonedaSports extends Tragamoneda {
    readonly BONIF_3: number = 5000; 
    readonly BONIF_2: number = 2500; 

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario, intentosMaximos: number) {
        super(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos);
        this.valores = ["🏀", "🎱", "🏐", "⚽", "🏈", "🏉", "🏓", "🥊", "🏑", "🎾", "⛸️", "⛳"];
       //this.valores = ["🏀"];// Nos permite probar el método en caso de que salgan tres valores iguales.
        this.inicializarBarras();
    }

    //Paga la apuesta en cada ronda
    public bonificacionDeTirada(resultado: string[]): void {
        let bonificacionFinal: number = this.getApuesta();

        if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log(`Ganaste el Juego🏆‼️ 🎉 Sacaste tres ${resultado[0]} iguales 🎉 Sumas dinero a tu billetera💲💰`);
            console.log(`Obtuviste una bonificacion de 💲${this.BONIF_3}`)

            bonificacionFinal += this.BONIF_3;
            this.pagarApuesta(bonificacionFinal);
        }
        else if (resultado[0] === resultado[1] || resultado[1] === resultado[2] || resultado[0] === resultado[2]) {
            console.log(`\n¡Bonificación! 🎉 Has sacado dos Deportes iguales 🎉 Sumas dinero a tu billetera💲💰`);
            console.log(`Obtuviste 💲${this.BONIF_3} adicionales`)

            bonificacionFinal += this.BONIF_2;
            this.pagarApuesta(bonificacionFinal);
        }
    }

    public mostrarResultado(): void {
        if (this.getIntentosMaximos() > 0){
            const resultado = this.tirar();
            if (resultado.length > 0) {
    
                console.log(resultado.join(" | "));
                //console.log("Intentos Restantes:", this.intentosMaximos);
    
                this.bonificacionDeTirada(resultado);
            }
        }
    }
}
