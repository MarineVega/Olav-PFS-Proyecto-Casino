import { Tragamoneda } from "./Tragamoneda";

export class TragamonedaPremium extends Tragamoneda {
    private comodin: string;
    readonly FACTOR_SUERTE: number = 2; //Mas de 2 --> Mucha probabilidad que salga comodin

    constructor(intentosMaximos: number, numBarras: number, numPosiciones: number) {
        super(intentosMaximos, numBarras, numPosiciones);
        this.comodin = "🃏";  
        this.agregarComodin();
        this.barras = Array.from({ length: numBarras }, () => this.generarBarra(numPosiciones)); //El comodiin se agrega a los posibles valores
    }

    public agregarComodin(): void { //Segun la suerte, agrega comodines a las barras
        for (let index = 0; index < this.FACTOR_SUERTE; index++) {   
            this.valores.push(this.comodin);    
        }
    }

    //METODO TIRAR CON LA POSIBILIDAD DE QUE SALGA EL COMODIN (SE PUEDE MEJORAR UN MONTOOOOON) lleva
    public tirarPremium(): string[] {
        const resultado = super.tirar(); // DESCUBRI QUE SE PUEDE USAR UN METODO DE LA CLASE QUE HEREDA CON SUPER

        //IF LLEVADO A MOSTRAR RESULTADO
        // if (resultado.length > 0 && resultado.includes(this.comodin)) { 
        //     // SE LE DA LA TIRADA ADICIONAL AL USUSARIO SI SALE EL COMODIN Y NO SE DESCUENTA EL INTENTO
        //     console.log("¡Has sacado el Comodín 🎉! Tienes una tirada adicional GRATIS 🆓");
        //     this.agregarTirada(); //Agrego tirada gratis al jugador
        //     //const tiradaAdicional = this.tirar();
        //    //resultado.push(...tiradaAdicional); //AGREGA LA TIRADA QUE GANO EL USUARIO A LOS INTENTOS RESTANTES QUE TIENE
        // }

        return resultado;
    }

    public mostrarResultado(): void {
        const resultado = super.tirar(); 
        if (resultado.length > 0) {
            console.log("Resultado de la tirada:", resultado.join(" | "));
            
        }

        if (resultado.length > 0 && resultado.includes(this.comodin)) {
            // SE LE DA LA TIRADA ADICIONAL AL USUSARIO SI SALE EL COMODIN Y NO SE DESCUENTA EL INTENTO
            
            console.log("¡Has sacado el Comodín 🎉! Tienes una tirada adicional GRATIS 🆓");
            this.agregarTirada(); //Agrego tirada gratis al jugador
            
            //const tiradaAdicional = this.tirar();
            //resultado.push(...tiradaAdicional); //AGREGA LA TIRADA QUE GANO EL USUARIO A LOS INTENTOS RESTANTES QUE TIENE
        }
        console.log("Intentos Restantes:", this.intentosMaximos);
    }

    public getComodin(): string {
        return this.comodin;
    }

    public agregarTirada(): void {
        this.intentosMaximos++;
    }
}
