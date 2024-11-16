
import { Tragamoneda } from "./Tragamoneda";

export class TragamonedaPremiun extends Tragamoneda {
    private comodin: number;

    constructor(comodin: number) {
        super (comodin)
        this.comodin = comodin;
    }

    public getComodin(): number {
        return this.comodin;
    }

    public setComodin(comodin: number): void {
        this.comodin = comodin;
    }

    public tirarGratis(): void {
        
    }

}