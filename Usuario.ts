export  class Usuario {

    public alias: string;
    public nombre: string;
    public aliasCuenta: string;
    protected ranking: number = 0;
    protected billetera: number;

    constructor(alias: string, nombre: string, billetera: number) {
        this.alias = alias;
        this.nombre = nombre;
        this.billetera = billetera;
    }

    public crearAliascuenta(alias: string, Nombre: string): void {

        this.aliasCuenta = this.nombre +" Alias " + this.alias
    }

    protected getalias(): String {
        return this.alias;
    }
    protected setalias(alias: string) {
        if (alias!=""){
           this.alias = alias;  
        }else{
            this.alias="Anonimo"
        }   
    }

    protected getnombre(): string {
        return this.nombre;
    }
    protected setnombre(nombre: string) {
        if (nombre!=""){
          this.nombre = nombre;   
        }else {
            console.log("Ingrese su nombre para jugar..");
        }
    }

    protected getaliasCuenta(): string {
        return this.aliasCuenta;
    }

    public getBilletera(): number {
        return this.billetera;
    }

    public setBilletera(billetera: number): void {
        this.billetera = billetera;
    }

    public getRanking(): number {
        return this.ranking;
    }

    public setRanking (ranking: number): void {
        this.ranking = ranking;
    }
}