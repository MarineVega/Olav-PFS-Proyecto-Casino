import { Juego } from "../abstractas/Juego"
import { Usuario } from "./Usuario";     
import * as fs from 'fs';        

export class Casino {
    //Ruta donde se almacenan los datos de los usuarios y juegos cargados en el casino
    readonly RUTA_DATOS : string = "./data_base/casinoJuegoLimpio.json";

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
        this.juegos.push(juego);
    }

    public mostrarCasino(): string {
        return `Casino: ${this.getNombre()} \n Usuarios del Casino: ${this.listarUsuarios()} \n Juegos del Casino: ${this.listarJuegos()}`;
    }

    public listarUsuarios(): void {
        this.usuarios.forEach(u => {
            u.mostrarUsuario();
            console.log(`\n`);
        });
    }

    public listarJuegos(): void {
        this.juegos.forEach(j => {
            j.mostrarJuego();
            console.log(`\n`);
        });
    }

    // public listarNombres(arreglo: Usuario[] | Juego[]): String {
    //     let cadena: string = ' ';
    //     arreglo.forEach(a => cadena += `\n ${a.getNombre()}`)
    //     return cadena;
    // }

    public darBienvenida(alias: string): void {
        console.log(`═══════════════════════════════════════════════════`);
        console.log(`   💰 💰 💰 💰 ...Bienvenidos... 💰 💰 💰 💰   `);
        console.log(`💰 💰 💰   Casino ${this.getNombre()}   💰 💰 💰`);
        console.log(`                Usuario ${alias}                   `);
        console.log(`═══════════════════════════════════════════════════\n`);
    }

    public despedir(alias: string): string {
        return `Gracias ${alias} por elegir ${this.getNombre()}. Volve pronto!!!`;
    }

    //Funciones para carga y guardado de datos en JSON

    public guardarEnJSON(ruta: string): void {
        const data = {
            nombre: this.getNombre(),
            usuarios: this.getUsuarios(),
            juegos: this.getJuegos()
        };

        fs.writeFileSync(ruta, JSON.stringify(data, null, 2), "utf-8");
        
        console.log(`Datos guardados en ${ruta}`);
    }

    public cargarDesdeJSON(): void {
        if (fs.existsSync(this.RUTA_DATOS)){
            let data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
    
            // Cargar Usuarios
            this.usuarios = data.usuarios.map((usu: any) => {
                return new Usuario(
                    usu.alias, 
                    usu.nombre,
                    usu.billetera
                );
            });

            // this.juegos = data.juegos.map((jue: any) => {
            //     return new Juego(
            //         jue.nombre, 
            //         jue.reglamento,
            //         jue.apuestaMinima,
            //         jue.apuestaMaxima,
            //         jue.jugador
            //     );
            // });

            console.log(`Datos cargados desde ${this.RUTA_DATOS}`);
        } else {
            console.log(`Archivo no encontrado: ${this.RUTA_DATOS}`);
        }
         
    }

    public registrarUsuario(): Usuario {
        //PUEDE que las lecturas por teclado se hagan desde afuera desde el main en un metodo, y que este los reciba por parametro
        const readlineSync = require('readline-sync');
        
        console.log("Ingrese su nombre completo 🪪");
        let nombre: string = readlineSync.question("Ingrese aqui su nombre: ");

        console.log("Escriba su Alias si lo tiene (opcional) 👤");
        let alias: string = readlineSync.question("Descripcion o alias: ");
        
        console.log("Billetera para jugar 💵"); 
        
        let dineroInicio = readlineSync.questionInt('Ingrese dinero a jugar: ');
        
        if (nombre === "") {
            nombre = "Anónimo"
        }
        
        if (alias === "") {
            alias = "Jugador Anónimo"
        }    

        console.log("Cargando datos....");
        console.log(`Jugador: ${nombre} \n Alias: ${alias} \n Billetera: ${dineroInicio} \n`);
    
        return new Usuario(alias, nombre, dineroInicio);

    }
    

}