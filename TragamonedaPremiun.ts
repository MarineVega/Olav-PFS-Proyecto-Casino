import { Tragamoneda } from "./Tragamoneda";

export class TragamonedaPremium extends Tragamoneda {
    private comodin: string;

    constructor(intentosMaximos: number, numBarras: number, numPosiciones: number) {
        super(intentosMaximos, numBarras, numPosiciones);
        this.comodin = "🃏";  
    }

    //METODO TIRAR CON LA POSIBILIDAD DE QUE SALGA EL COMODIN (SE PUEDE MEJORAR UN MONTOOOOON)
    public tirar(): string[] {
        const resultado = super.tirar(); // DESCUBRI QUE SE PUEDE USAR UN METODO DE LA CLASE QUE HEREDA CON SUPER

        if (resultado.length > 0 && resultado.includes(this.comodin)) {
            // SE LE DA LA TIRADA ADICIONAL AL USUSARIO SI SALE EL COMODIN Y NO SE DESCUENTA EL INTENTO
            console.log("¡Has sacado el Comodín 🎉! Tienes una tirada adicional GRATIS 🆓");
            const tiradaAdicional = super.tirar();
            resultado.push(...tiradaAdicional); //AGREGA LA TIRADA QUE GANO EL USUARIO A LOS INTENTOS RESTANTES QUE TIENE
        }

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
