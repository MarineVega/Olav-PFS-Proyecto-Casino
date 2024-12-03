import bcrypt from 'bcryptjs';

export class CuentaUsuario {
    private nombre: string;
    private alias: string; //cada alias es unico
    private contrasenia: string;

    constructor(nombre: string, alias: string, contrasenia: string) {
        this.nombre = nombre;
        this.alias = alias;
        this.contrasenia = contrasenia;
    }

    public getContrasenia(): string {
        return this.contrasenia;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getAlias(): string {
        return this.alias;
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