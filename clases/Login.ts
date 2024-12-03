import * as rs from "readline-sync";
import * as fs from 'fs'; 

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

    public iniciarSesion(): string | null{
        console.log("\nEscriba su Alias 👤"); 
        let alias: string = rs.question("");

        console.log("\nEscriba su contrasenia 🔐"); 
        let pass: string = rs.question("", { hideEchoBack: true });

        console.clear();

        let usuario: CuentaUsuario | null = this.buscarUsuarioPorAlias(alias);
        
        if (usuario && usuario.verificarContrasenia(pass)) { //si lo encuentra y si coincide su contrasenia, se loguea

            this.loguearse(usuario);

            return usuario.getAlias(); // Sesión exitosa, devuelve el alias del usuario
        }

        return null; // Sesión fallida por contrasenia invalida o no se encontro usuario
    }

    // Buscar usuario por Alias, para Iniciar sesion
    public buscarUsuarioPorAlias(alias: string): CuentaUsuario | null {
        let usuario = this.cuentas.find(user => user.getAlias() === alias);
        return usuario ? usuario : null;
    }

    // Registra un nuevo usuario si no existe
    public registrarCuenta(nueU: CuentaUsuario): void { 
            this.cuentas.push(nueU);

            this.loguearse(nueU); //Al registrar nuevo usuario, lo dejo logueado

            this.guardarEnJSON(); //guardo los nuevos datos
    }

    //Verifica si ya existe el alias, para crear cuenta nueva. Some busca hasta encontrarlo o terminarse el array y devuelve un boolean
    public verificarAlias(alias: string): boolean {
        return this.cuentas.some(c => c.getAlias() === alias);
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
        
        console.log(`\nDatos guardados satisfactoriamente.\n`);
    }

    private cargarDesdeJSON(): CuentaUsuario[] {
        if (fs.existsSync(this.RUTA_DATOS)){
            let data = JSON.parse(fs.readFileSync(this.RUTA_DATOS, "utf-8"));
    
            let arreglo: CuentaUsuario [] = data.usuarios.map((cuenta: any) => {
                return new CuentaUsuario(
                    cuenta.nombre,
                    cuenta.alias,
                    cuenta.contrasenia     
                );
            });

            console.log(`\nCuentas cargadas satisfactoriamente.\n`);

            return arreglo;
        } else {

            console.log(`\nArchivo cuentas no encontrado en la ruta solicitada.\n`);
        }  
    }
}