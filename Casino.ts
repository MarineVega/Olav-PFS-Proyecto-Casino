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

    public darBienvenida(): void {
        console.log(`Bienvenido al Casino ${this.getNombre()}`);
    }

    public despedir(): string {
        return `Gracias por elegir ${this.getNombre()}, volve pronto!!!`;
    }
}

let tragamonedaSports1 : Tragamoneda = new Tragamoneda(6, 3, 5);
let tragamonedaSports2 : Tragamoneda = new Tragamoneda(4, 3, 4);

tragamonedaSports1.mostrarResultado();
tragamonedaSports2.mostrarResultado();
console.log(tragamonedaSports2);


