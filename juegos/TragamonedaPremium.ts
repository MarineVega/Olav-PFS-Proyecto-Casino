import { Juego } from "../abstractas/Juego";
import { Tragamoneda } from "../abstractas/Tragamoneda";
import { Usuario } from "../clases/Usuario";

export class TragamonedaPremium extends Tragamoneda {
    private comodin: string;
    readonly FACTOR_SUERTE: number = 2; 

    constructor(nombre: string, reglamento: string, apuMin: number, apuMax: number, jugador: Usuario, intentosMaximos: number) {
        super(nombre, reglamento, apuMin, apuMax, jugador, intentosMaximos);
        this.valores = ["🍎", "🍐", "🍇", "🍍", "🍉", "🍏", "🍒", "🍊", "🫐", "🍌"];
        //this.valores = ["🍎", "🍐"]; // Nos permite probar el método en caso de que salgan dos valores iguales.
        this.comodin = "🃏";  
        this.agregarComodin();  
        this.inicializarBarras();
    }

    public getComodin(): string {
        return this.comodin;
    }

    public agregarComodin(): void { 
        for (let index = 0; index < this.FACTOR_SUERTE; index++) {   
            this.valores.push(this.comodin);    
        }
    }

    public bonificacionDeTirada(resultado: string[]): void {
        let bonificacionFinal: number = this.getApuesta();

        if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
            console.log(`Ganaste el Juego🏆‼️ 🎉 Sacaste tres ${resultado[0]} iguales 🎉 Sumas dinero a tu billetera💲💰`);
            console.log(`Obtuviste una bonificacion de 💲5000`)

            bonificacionFinal += 5000;  
            this.pagarApuesta(bonificacionFinal);
        }
        else if (resultado[0] === resultado[1] || resultado[1] === resultado[2] || resultado[0] === resultado[2]) {
            console.log(`\n¡Bonificación! 🎉 Has sacado dos frutas iguales 🎉 Sumas dinero a tu billetera💲💰`);
            console.log(`Obtuviste 💲2500 adicionales`)

            bonificacionFinal += 2500;
            this.pagarApuesta(bonificacionFinal);
        }
    }

    public mostrarResultado(): void {
        if (this.getIntentosMaximos() > 0){
            const resultado = this.tirar(); 

            if (resultado.length >= 0) {
                console.log("Resultado de la tirada:", resultado.join(" | "));
            }

            if (resultado.includes(this.comodin)) {
                this.duplicarIntentos();  
            }

            if (this.getIntentosMaximos() > 0){
                this.bonificacionDeTirada(resultado);
            }

        } 
    }

    public duplicarIntentos(): void {
        if(this.getIntentosMaximos() > 0){ //Si tiene 0 intentos, no duplica
            let intentosAntes: number = this.getIntentosMaximos();
            
            this.intentosMaximos += 2;
            
            console.log("🎊 Has obtenido el comodin 🎊 ¡Sumaste Intentos! 🎁 Ahora tienes", this.intentosMaximos, "intentos! Antes tenias", intentosAntes,"👍");
        } else {
            console.log("Mala Suerte!🥺 Has obtenido el comodin 🎊 Pero no tenias intentos restantes 😭");
        }
    }
}

