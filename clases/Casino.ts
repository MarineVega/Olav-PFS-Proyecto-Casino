import * as fs from 'fs'; 
import * as rs from "readline-sync";

//Hasheo
import bcrypt from 'bcryptjs';

import { Juego } from "../abstractas/Juego"
import { CuentaUsuario } from "./CuentaUsuario";
import { Login } from "./Login";
import { Usuario } from "./Usuario"; 


export class Casino {
    //Ruta donde se almacenan los datos de los usuarios y juegos cargados en el casino
    readonly RUTA_DATOS : string = "./data_base/casinoJuegoLimpio.json";

    private nombre: string;
    private usuarios: Usuario[] = [];
    private juegos: Juego[];
    private login: Login;

    constructor(nombre: string) {
        this.nombre = nombre;
        this.usuarios = this.cargarDesdeJSON();
        this.juegos = [];
        this.login = new Login();  
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

    public agregarUsuario(usuario: Usuario): void{
        console.log("Cargando datos....");
        console.log(`Jugador: ${usuario.getNombre()} \nAlias: ${usuario.getAlias()} \nBilletera: ${usuario.obtenerSaldo()} \n`);
        
        this.usuarios.push(usuario);
    }

    public agregarJuego(juego: Juego){
        this.juegos.push(juego);
    }

    public mostrarCasino(): string {
        return `Casino: ${this.getNombre()} \nUsuarios del Casino: ${this.listarUsuarios()} \nJuegos del Casino: ${this.listarJuegos()}`;
    }

    public listarUsuarios(): void {
        this.usuarios.forEach(u => {
            u.mostrarUsuario();
        });
    }

    public listarJuegos(): void {
        this.juegos.forEach(j => {
            j.mostrarJuego();
            console.log(`\n`);
        });
    }

    public darBienvenida(alias: string): void {
        console.log(`═══════════════════════════════════════════════════`);
        console.log(`   💰 💰 💰 💰 ...Bienvenidos... 💰 💰 💰 💰   `);
        console.log(`💰 💰 💰   Casino ${this.getNombre()}   💰 💰 💰`);
        console.log(`                Usuario ${alias}                   `);
        console.log(`═══════════════════════════════════════════════════\n`);
    }

    public despedir(alias: string): void {
        console.log(`\nGracias ${alias} por elegir ${this.getNombre()}. Volve pronto!!!`);
    }

    
    //Funciones para carga y guardado de datos en JSON

    public guardarEnJSON(): void {
        const data = {
            nombre: this.getNombre(),
            usuarios: this.getUsuarios(),
            juegos: this.getJuegos()
        };

        fs.writeFileSync(this.RUTA_DATOS, JSON.stringify(data, null, 2), "utf-8");
        
        console.log(`\nSe han guardado tus datos satisfactoriamente.`);
    }

    private cargarDesdeJSON(): Usuario[] {
        if (fs.existsSync(this.RUTA_DATOS)){
            let data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
    
            let arreglo: Usuario [] = data.usuarios.map((usu: any) => {
                return new Usuario(
                    usu.alias, 
                    usu.nombre,
                    usu.billetera,
                    usu.dni
                );
            });

            console.log(`\nUsuarios cargados satisfactoriamente.\n`);

            return arreglo;
        } else {
            console.log(`\nArchivo no encontrado en la ruta solicitada.\n`);
        }
         
    }


    // Funciones Autentificacion

    public registrarNuevoUsuario(): Usuario {     
        console.log("Cree su Alias (Obligatorio)👤"); 
        let alias: string = rs.question("");

        while(alias == ''){
            console.log("👤 Ingrese un valor valido para su Alias 👤"); 
            alias = rs.question("");    
        }
        
        let existe: boolean = this.login.verificarAlias(alias);
        
        if(!existe){
            console.log("\n👤  Ingrese su nombre si lo desea (Opcional)👤"); 
            let nombre: string = rs.question("");   
            
            if (nombre === "") {
                console.log("Ha decidido mantenerse en el anonimato\n"); 
                nombre = "Jugador Anonimo"
            } 

            console.log("\nEscriba su DNI 🪪"); 
            let dni: number = rs.questionInt("");

            console.log("\nEscriba contrasenia para su cuenta 🔐"); 
            let pass: string = rs.question('', { hideEchoBack: true });
            
            let hasheo = bcrypt.hashSync(pass, 5); //contrasenia, intensidad del hasheo
            pass = ''; //pisa la contrasenia en texto plano
        
            this.crearCuentaUsuario(nombre, alias, hasheo); //crea la cuenta del respectivo usuario

            //this.crearCuentaUsuario(nombre, alias, pass); comentado, por si no anda el bcrypt, comentar las 3 lineas de arriba si se usa esto

            console.log("\nBilletera para jugar 💵"); 
            let dineroInicio = rs.questionInt('Ingrese el dinero: $');
        
            let usuarioNue: Usuario = new Usuario(alias, nombre, dineroInicio, dni);

            this.agregarUsuario(usuarioNue); // Agrega usuario al casino si no existe

            this.guardarEnJSON(); // Guarda al usuario nuevo

            return usuarioNue;
        } else {
            console.log("\nAlias ya en uso. Pruebe un alias distinto."); 

            return undefined;
        }
    }

    public crearCuentaUsuario(nombre: string, alias: string, hasheo: string): void{  
        let nuevaCuenta: CuentaUsuario = new CuentaUsuario(nombre, alias, hasheo);
        this.login.registrarCuenta(nuevaCuenta);
    }

    public iniciarSesion(): Usuario{
        let alias: string | null = this.login.iniciarSesion();
        
        return alias != null ? this.retornaUsuarioPorAlias(alias) : undefined; // Retorna el usuario o undefined si no lo encuentra  
    }

    public retornaUsuarioPorAlias(alias: string): Usuario{
       return this.usuarios.find((usuario) => usuario.getAlias() === alias); 
    }

    public cerrarSesionUsuario(alias: string): void{
        this.guardarEnJSON();
        this.despedir(alias);
        this.login.cerrarSesion();
    }
}