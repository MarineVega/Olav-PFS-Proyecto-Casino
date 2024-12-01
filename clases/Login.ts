import * as rs from "readline-sync";
import * as fs from 'fs'; 

import { Usuario } from "./Usuario";
import { CuentaUsuario } from "./CuentaUsuario";

export class Login {
    readonly RUTA_DATOS : string = "./data_base/loging.json";

    private cuentas: CuentaUsuario[];
    private sesionActual: CuentaUsuario;

    //Carga los usuarios presentes en Casino
    constructor() {
        this.cuentas = this.cargarDesdeJSON();
        this.sesionActual = undefined;
    }

    public iniciarSesion(): number {
        console.log("\nEscriba su Alias 👤"); 
        let alias: string = rs.question("");

        console.log("\nEscriba su contrasenia 👤"); 
        let pass: string = rs.question("", { hideEchoBack: true });

        let usuario = this.buscarUsuarioPorAlias(alias);
        
        if (usuario && usuario.verificarContrasenia(pass)) { //si lo encuentra y si coincide su contrasenia, se loguea

            this.loguearse(usuario);

            return usuario.getDni(); // Sesión exitosa, devuelve el dni del usuario
        }

        return -1; // Sesión fallida
    }

    // Buscar usuario por Alias
    public buscarUsuarioPorAlias(alias: string): CuentaUsuario | null {
        let usuario = this.cuentas.find(user => user.getAlias() === alias);
        return usuario ? usuario : null;
    }

    // Verifica contraseña si coincide, para el inicio de sesion
    public verificarContrasenia(alias: string, contrasenia: string): boolean {
        let usuario = this.buscarUsuarioPorAlias(alias);
        return usuario ? usuario.getContrasenia() === contrasenia : false;
    }

    // Registra un nuevo usuario si no existe
    public registrarCuenta(nueU: CuentaUsuario): boolean {
        if (!this.verificarSiExiste(nueU.getNombre(), nueU.getAlias())) {
            this.cuentas.push(nueU);

            this.loguearse(nueU); //Al registrar nuevo usuario, lo dejo logueado

            this.guardarEnJSON(); //guardo los nuevos datos

            return true;
        } 

        return false;
    }

    // Verifica si el usuario ya existe. Some busca hasta encontrarlo o terminarse el array
    public verificarSiExiste(nombre: string, alias: string): boolean {
        return this.cuentas.some(c => c.getNombre() === nombre && c.getAlias() === alias);
    }

    public loguearse(usuario: CuentaUsuario): void {
        this.sesionActual = usuario;
    }

    public cerrarSesion(): void {
        this.sesionActual = undefined;
    }

    private getCuentas(): CuentaUsuario[] {
        return this.cuentas;
    }

    //Funciones para carga y guardado de datos en JSON

    public guardarEnJSON(): void {
        const data = {
            usuarios: this.getCuentas()
        };

        fs.writeFileSync(this.RUTA_DATOS, JSON.stringify(data, null, 2), "utf-8");
        
        console.log(`Datos guardados satisfactoriamente.\n`);
    }

    private cargarDesdeJSON(): CuentaUsuario[] {
        if (fs.existsSync(this.RUTA_DATOS)){
            let data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
    
            let arreglo: CuentaUsuario [] = data.usuarios.map((cuenta: any) => {
                return new CuentaUsuario(
                    cuenta.nombre,
                    cuenta.alias,
                    cuenta.contrasenia,
                    cuenta.dni     
                );
            });

            console.log(`Cuentas cargadas satisfactoriamente.`);

            return arreglo;
        } else {

            console.log(`Archivo cuentas no encontrado en la ruta solicitada.`);
        }  
    }
}