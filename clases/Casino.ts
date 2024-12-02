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
        console.log(`Gracias ${alias} por elegir ${this.getNombre()}. Volve pronto!!!`);
    }

    //Funciones para carga y guardado de datos en JSON

    public guardarEnJSON(): void {
        const data = {
            nombre: this.getNombre(),
            usuarios: this.getUsuarios(),
            juegos: this.getJuegos()
        };

        fs.writeFileSync(this.RUTA_DATOS, JSON.stringify(data, null, 2), "utf-8");
        
        console.log(`Datos guardados satisfactoriamente.\n`);
    }

    private cargarDesdeJSON(): Usuario[] {
        if (fs.existsSync(this.RUTA_DATOS)){
            let data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
    
            // Cargar Usuarios
            let arreglo: Usuario [] = data.usuarios.map((usu: any) => {
                return new Usuario(
                    usu.alias, 
                    usu.nombre,
                    usu.billetera,
                    usu.dni
                );
            });

            console.log(`Usuarios cargados satisfactoriamente.\n`);

            return arreglo;
        } else {
            console.log(`Archivo no encontrado en la ruta solicitada.\n`);
        }
         
    }

    public registrarNuevoUsuario(): Usuario {     
        console.log("Cree su Alias (Obligatorio)👤"); 
        let alias: string = rs.question("");

        while(alias == ''){
            console.log("👤 Ingrese un valor valido para su Alias 👤"); 
            alias = rs.question("");    
        }
        
        console.log("\n👤  Ingrese su nombre si lo desea (Opcional)👤"); 
        let nombre: string = rs.question("");   
        
        if (nombre === "") {
            console.log("Ha decidido mantenerse en el anonimato\n"); 
            nombre = "Jugador Anonimo"
        } 

        let existe: boolean = this.login.verificarSiExiste(nombre, alias);
        
        if(!existe){
            console.log("\n🪪  Escriba su DNI 🪪"); 
            let dni: number = rs.questionInt("");

            console.log("\n🔐 Escriba contrasenia para su cuenta 🔐"); 
            let pass: string = rs.question('', { hideEchoBack: true });
            
            let hasheo = bcrypt.hashSync(pass, 5); //contrasenia, intensidad del hasheo
            pass = ''; //piso la contrasenia en texto plano
        
            this.crearCuentaUsuario(nombre, alias, hasheo, dni); //creo la cuenta del respectivo usuario

            //this.crearCuentaUsuario(nombre, alias, pass, dni); comentado, por si no anda el bcrypt, comentar tambien lineas 151, 149 y 148 si se usa esto

            console.log("\n💵 Billetera para jugar 💵"); 
            let dineroInicio = rs.questionInt('Ingrese el dinero a ingresar: $');
        
            let usuarioNue: Usuario = new Usuario(alias, nombre, dineroInicio, dni);

            this.agregarUsuario(usuarioNue); //agrego usuario al casino si no existe

            this.guardarEnJSON();

            return usuarioNue;
        } else {
            console.log("Intente ingresar sus datos con un Alias distinto.\n"); 

            return undefined;
        }
    }

    public crearCuentaUsuario(nombre: string, alias: string, hasheo: string, dni: number): void{  
        let nuevaCuenta = new CuentaUsuario(nombre, alias, hasheo, dni);
        this.login.registrarCuenta(nuevaCuenta);
    }

    public iniciarSesion(): Usuario{
        let dni: number = this.login.iniciarSesion();
        
        return dni != -1 ? this.buscarUsuarioPorDni(dni) : undefined; //retorna el usuario o undefined si no lo encuentra  
    }

    public buscarUsuarioPorDni(dni: number): Usuario{
       return this.usuarios.find((usuario) => usuario.getDni() === dni); 
    }

    public cerrarSesionUsuario(): void{
        this.login.cerrarSesion();
    }


}