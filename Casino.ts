import { Juego } from "./Juego"
import { Tragamoneda } from "./Tragamoneda";
import { Usuario } from "./Usuario";

//Imports lectura desde .txt
import * as fs from 'fs';              

export class Casino {

    private nombre: string;
    private usuarios: Usuario[];
    private juegos: Juego[];

    constructor(nombre: string) {
        this.nombre = nombre;
        this.usuarios = [];
        this.juegos = [];
    }

    getNombre(): string {
        return this.nombre;
    }

    getUsuarios(): Usuario[] {
        return this.usuarios;
    }

    getJuegos(): Juego[] {
        return this.juegos;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public mostrarCasino(): string {
        return `Casino: ${this.getNombre()} \n Usuarios del Casino: ${this.getUsuarios()} \n Juegos del Casino: ${this.getJuegos()}`;
    }

    public listarNombres(arreglo: Usuario[] | Juego[]): String {
        let cadena: string = ' ';
        arreglo.forEach(a => cadena += `\n ${a.getNombre()}`)
        return cadena;
    }

    public darBienvenida(usuario:Usuario): void {
        console.log(`╔═════════════════════════════════════════╗`)
        console.log(`║💰 💰 💰 💰 ...Bienvenidos... 💰 💰 💰 💰║`);
        console.log(`║💰 💰 💰  Casino ${this.getNombre()}    💰 💰 💰║`);
        console.log(`╚═════════════════════════════════════════╝\n`)
    }

    public despedir(): string {
        return `Gracias por elegir ${this.getNombre()}, volve pronto!!!`;
    }

    //Leer instrucciones desde txt
    public leerArchivo(rutaArchivo: string): string {
        try {
              let contenido = fs.readFileSync(rutaArchivo, 'utf-8');
          
              return contenido;
        } catch (error) {
              console.error('No se ha podido leer el archivo solicitado. Verifica la ruta.');
              return ''; 
        }
    }
}