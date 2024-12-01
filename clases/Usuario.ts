export class Usuario {

    private alias: string;
    private nombre: string;
    private aliasCuenta: string = '';
    private juegosGanados: number;
    private billetera: number;
    private dni: number;

    constructor(alias: string, nombre: string, billetera: number, dni: number) {
        this.alias = alias;
        this.nombre = nombre;
        this.crearAliascuenta(alias, nombre);
        this.juegosGanados = 0;
        this.billetera = billetera;
        this.dni = dni;
    }

    public mostrarUsuario(){
        console.log(this.getAliasCuenta());
        console.log(`Cantidad Juegos Ganados: ${this.getJuegosGanados()}`);
        console.log(`Dinero disponible en Billetera: ${this.obtenerSaldo()}\n`);
    }

    public crearAliascuenta(alias: string, nombre: string): void {
        this.aliasCuenta = `${nombre} (${alias})`;
    }

    //Este método nos permite agregar dinero a la billetera del usuario en caso de que gane por ejemplo en el Tragamonedas
    public agregarDinero(monto: number): void {
        this.billetera += monto;
        console.log(`Has recibido💲${monto} pesos 💵. Tu saldo actual es:💲${this.billetera} pesos 🥳`);
    }

    public obtenerSaldo(): number {
        return this.billetera;
    }

    //Getters and setters

    public getAlias(): string {
        return this.alias;
    }

    public setAlias(alias: string) {
        if (alias != ""){
           this.alias = alias;  
        }else{
            this.alias= "Anonimo";
        }
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string) {
        if (nombre != ""){
            this.nombre = nombre;   
        }else {
            console.log("Ingrese su nombre para jugar...");
        }
    }

    public getAliasCuenta(): string {
        return this.aliasCuenta;
    }

    public setBilletera(billetera: number): void {
        this.billetera = billetera;
    }

    public getJuegosGanados(): number {
        return this.juegosGanados;
    }

    public setJuegosGanados(juegosGanados: number): void {
        this.juegosGanados = juegosGanados;
    }

    public getDni(): number {
        return this.dni;
    }
}