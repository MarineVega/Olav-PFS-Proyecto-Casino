import { Tragamoneda } from "./Tragamoneda";

export class TragamonedaPremium extends Tragamoneda {
    private comodin: string;
    readonly FACTOR_SUERTE: number = 2; //Mas de 2 --> Mucha probabilidad que salga comodin

    constructor(nombre: string, reglamento: string, intentosMaximos: number, numBarras: number, numPosiciones: number) {
        super(nombre, reglamento, intentosMaximos, numBarras, numPosiciones);
        this.valores = ["🍎", "🍐", "🍇", "🍍", "🍉", "🍏", "🍒", "🍊", "🫐", "🍌"];
        this.comodin = "🃏";  
        this.agregarComodin();
        this.barras = Array.from({ length: numBarras }, () => this.generarBarra(numPosiciones)); 
    }

    public agregarComodin(): void { 
        for (let index = 0; index < this.FACTOR_SUERTE; index++) {   
            this.valores.push(this.comodin);    
        }
    }

    public tirarPremium(): string[] {
        const resultado = super.tirar(); 
        return resultado;
    }

    public mostrarResultado(): void {
        const resultado = super.tirar(); 
        if (resultado.length > 0) {
            console.log("Resultado de la tirada:", resultado.join(" | "));   
        }

        if (resultado.length > 0 && resultado.includes(this.comodin)) {
   
            console.log("¡Ha salidó el Comodín 🎉! Tienes una tirada adicional GRATIS 🆓");
            this.agregarTirada();    
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
