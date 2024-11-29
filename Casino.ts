import { Juego } from "./Juego"
import { Tragamoneda } from "./Tragamoneda";
import { Usuario } from "./Usuario";             

export class Casino {

    private nombre: string;
    private usuarios: Usuario[];
    private juegos: Juego[];

    constructor(nombre: string) {
        this.nombre = nombre;
        this.usuarios = [];
        this.juegos = [];
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getUsuarios(): Usuario[] {
        return this.usuarios;
    }

    public getJuegos(): Juego[] {
        return this.juegos;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public agregarUsuario(usuario: Usuario){
        this.usuarios.push(usuario);
    }

    public agregarJuego(juego: Juego){
        this.usuarios.push(juego);
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

}