
export  class Usuario {

    public alias: string;
    public nombre: string;
    public aliasCuenta: string;
    protected rankin: number = 0;
    protected dineroInicio: number;
    protected dineroDisponible: number = 0;
   // protected juegoSelecionado: Juego;  // se compone de clase juego??? 

    constructor(alias: string, nombre: string, dineroInicio: number) {

        this.alias = alias;
        this.nombre = nombre;
        this.dineroInicio = dineroInicio;

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
}