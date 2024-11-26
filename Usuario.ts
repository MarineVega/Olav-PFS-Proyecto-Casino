export class Usuario {

    public alias: string;
    public nombre: string;
    public aliasCuenta: string;
    protected juegosGanados: number = 0;
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

    /*public getBilletera(): number {
        return this.billetera;
    }*/ //Reemplacé este método por obtenerSaldo() porque me pareció más apropiado el nombre.

    public setBilletera(billetera: number): void {
        this.billetera = billetera;
    }

    public getJuegosGanados(): number {
        return this.juegosGanados;
    }

    public setJuegosGanados (juegosGanados: number): void {
        this.juegosGanados = juegosGanados;
    }

//Este método nos permite agregar dinero a la billetera del usuario en caso de que gane por ejemplo en el Tragamonedas
     public agregarDinero(monto: number): void {
        this.billetera += monto;
        console.log(`Has recibido ${monto} pesos 💵. Tu saldo actual es:💲${this.billetera} pesos 🥳`);
    }

    public obtenerSaldo(): number {
        return this.billetera;
    }
}
