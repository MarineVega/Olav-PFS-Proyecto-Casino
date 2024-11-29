export class Usuario {

    public alias: string;
    public nombre: string;
    public aliasCuenta: string;
    protected juegosGanados: number = 0;
    protected billetera: number;

    constructor(alias: string, nombre: string, billetera: number) {
        this.alias = alias;
        this.aliasCuenta = '';
        this.nombre = nombre;
        this.billetera = billetera;
    }

    public crearAliascuenta(alias: string, nombre: string): void {

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
            console.log("Ingrese su nombre para jugar...");
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
        console.log(`Has recibido💲${monto} pesos 💵. Tu saldo actual es:💲${this.billetera} pesos 🥳`);
    }

    public obtenerSaldo(): number {
        return this.billetera;
    }

    public RegistrarUsuario(): void {
        console.log("Ingrese su nombre completo 🪪");
        const readlineSync = require('readline-sync');
        const nombre: string = readlineSync.question("Ingrese aqui su nombre: ");
        console.log("Escriba su Alias si lo tiene (opcional) 👤");
        let alias: string = readlineSync.question("Descripcion o alias: ");
        console.log("Billetera para jugar 💵"); 
        let dineroInicio = readlineSync.questionInt('Ingrese dinero a jugar: ');
        
        if ((nombre != "") && (dineroInicio >= 0)) {
            if (alias === "") {
                               alias = "Jugador Anónimo"
                              }
            console.log("Cargando datos....");
            console.log(`Jugador: ${nombre} \n Alias: ${alias} \n Billetera: ${dineroInicio} \n`);
            this.nombre=nombre;
            this.alias=alias;
            this.billetera=dineroInicio;

        }
    }
}