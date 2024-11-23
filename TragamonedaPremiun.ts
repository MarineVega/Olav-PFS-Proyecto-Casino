import { Tragamoneda } from "./Tragamoneda";

export class TragamonedaPremium extends Tragamoneda {
    private comodin: string;
    readonly FACTOR_SUERTE: number = 5;

    constructor(intentosMaximos: number, numBarras: number, numPosiciones: number) {
        super(intentosMaximos, numBarras, numPosiciones);
        this.comodin = "🃏";  
        this.aniadirComodin();
        //this.generarBarra(3). El comodiin se agrega a los posibles valores, pero la barra ya se genera al crear el objeto sin este...
    }

    public aniadirComodin(): void {
        this.agregarValor(this.getComodin(), this.FACTOR_SUERTE); //Llama a Agregar valor de la clase padre
    }

    private agregarValor(valor: string, suerte: number): void { //agrega comodines segun cuanto valga el factor suerte
        for (let index = 0; index < suerte; index++) {    
            this.valores.push(valor);
        }
    }

    //METODO TIRAR CON LA POSIBILIDAD DE QUE SALGA EL COMODIN (SE PUEDE MEJORAR UN MONTOOOOON)
    public tirarPremium(): string[] {
        const resultado = this.tirar(); // DESCUBRI QUE SE PUEDE USAR UN METODO DE LA CLASE QUE HEREDA CON SUPER

        if (resultado.length > 0 && resultado.includes(this.comodin)) {
            // SE LE DA LA TIRADA ADICIONAL AL USUSARIO SI SALE EL COMODIN Y NO SE DESCUENTA EL INTENTO
            console.log("¡Has sacado el Comodín 🎉! Tienes una tirada adicional GRATIS 🆓");
            const tiradaAdicional = this.tirar();
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

    public getComodin(): string {
        return this.comodin;
    }
}
