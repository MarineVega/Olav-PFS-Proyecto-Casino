
export class Tragamoneda {
    protected intentosMaximos: number;
    protected valoresResultantes: number[];

    constructor(intentosMaximos: number) {
        this.intentosMaximos = intentosMaximos;
        this.valoresResultantes = [];
    }

    public getIntentosMaximos(): number {
        return this.intentosMaximos;
    }

    public getValoresResultantes(): number[] {
        return this.valoresResultantes;
    }

    public setIntentosMaximos(intentosMaximos: number): void {
        this.intentosMaximos = intentosMaximos;
    }

    public setValoresResultantes(valoresResultantes: number[]): void {
        this.valoresResultantes = valoresResultantes;
    }

    public tirar(): void {

    }

    public mostrarResultado(): void {
    const resultado = this.tirar();
    /*console.log("Resultado de la tirada:", resultado.join(" | "));*///Revisar el error con el Join
  }

}
   
