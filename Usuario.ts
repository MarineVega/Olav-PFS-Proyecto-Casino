import * as readlineSync from "readline-sync";
import { Casino } from "./Casino";

export  class Usuario {

    public alias: string;
    public nombre: string;
    public aliasCuenta: string;
    protected juegosGanados: number = 0;
    protected billetera: number;
    
   // protected juegoSelecionado: Juego;  // se compone de clase juego??? 

    constructor(alias: string, nombre: string, dineroInicio: number) {

        this.alias = alias;
        this.nombre = nombre;
        this.billetera = dineroInicio;
    }
    public SetAliascuenta(alias: string, nombre: string): void {
        if (alias!=""&& nombre!=""){
          this.aliasCuenta = this.nombre +" Alias " + this.alias
  
        }else if (nombre!=""){
            this.aliasCuenta = this.nombre +" Alias  Jugador Anonimo" 
        } console.log("Ingrese su Nombre para jugar..!")

        
    }

    public getjuegosGanados(): number {
        return this.juegosGanados;
    }

    public getAlias(): String {
        return this.alias;
    }
    protected setAlias(alias: string) {
        if (alias!=""){
           this.alias = alias;  
        }else{
            this.alias="Anonimo"
        }
       
    }
    public getNombre(): string {
        return this.nombre;
    }
    protected setNombre(nombre: string):void{
        if (nombre!=""){
          this.nombre = nombre;   
        }else {
            console.log("Ingrese su nombre para jugar..");
        }

    }
    protected getAliasCuenta(): string {
        return this.aliasCuenta;
    }

    
    public getBilletera(): number {
        return this.billetera;
    }

    public RegistrarUsuario(): void {
        console.log("Ingrese su nombre completo ");
        const readlineSync = require('readline-sync');
        const nombre: string = readlineSync.question("Ingrese aqui su nombre: ");
        console.log("Escriba su Alias si lo tiene(opcional)");
        let alias: string = readlineSync.question("Descripcion u alias: ");
        console.log("Billetera para jugar "); 
        let dineroInicio = readlineSync.questionInt('Ingrese dinero a jugar: ');
        
        if ((nombre != "") && (dineroInicio >= 0)) {
            if (alias === "") {
                               alias = "Jugador Anonimo"
                              }
            console.log("Cargando datos....");
            console.log(` jugador : ${nombre} \n alias : ${alias} \n Billetera  : ${dineroInicio} \n`);
            this.nombre=nombre
            this.alias=alias
            this.billetera=dineroInicio
            //const usuarioActual=new Usuario(this.alias,this.nombre,this.billetera);
             
        }
    
    }

}