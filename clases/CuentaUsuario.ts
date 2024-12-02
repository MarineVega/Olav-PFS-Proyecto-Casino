import bcrypt from 'bcryptjs';

export class CuentaUsuario {
    private nombre: string;
    private alias: string;
    private contrasenia: string;
    private dni: number;

    constructor(nombre: string, alias: string, contrasenia: string, dni: number) {
        this.nombre = nombre;
        this.alias = alias;
        this.contrasenia = contrasenia;
        this.dni = dni;
    }

    public getContrasenia(): string {
        return this.contrasenia;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getAlias(): string {
        return this.alias;
    }

    public setAlias(alias: string): void {
        this.alias = alias;
    }

    public getDni(): number {
        return this.dni;
    }

    //Compara la contrasenia guardada con la ingresada usando compareSync, version sincrona
    public verificarContrasenia(passIngresada: string): boolean {
        try {
            return bcrypt.compareSync(passIngresada, this.getContrasenia());
            //return passIngresada == this.getContrasenia(); sin encriptado, x si no anda
            
        } catch (err) {
            console.error('Error al verificar la contraseña:', err);
            return false;
        }
    }
}