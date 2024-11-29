"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(alias, nombre, billetera) {
        this.juegosGanados = 0;
        this.alias = alias;
        this.nombre = nombre;
        this.billetera = billetera;
    }
    Usuario.prototype.crearAliascuenta = function (alias, Nombre) {
        this.aliasCuenta = this.nombre + " Alias " + this.alias;
    };
    Usuario.prototype.getalias = function () {
        return this.alias;
    };
    Usuario.prototype.setalias = function (alias) {
        if (alias != "") {
            this.alias = alias;
        }
        else {
            this.alias = "Anonimo";
        }
    };
    Usuario.prototype.getnombre = function () {
        return this.nombre;
    };
    Usuario.prototype.setnombre = function (nombre) {
        if (nombre != "") {
            this.nombre = nombre;
        }
        else {
            console.log("Ingrese su nombre para jugar..");
        }
    };
    Usuario.prototype.getaliasCuenta = function () {
        return this.aliasCuenta;
    };
    /*
        public getBilletera(): number {
            return this.billetera;
        }
    */
    Usuario.prototype.setBilletera = function (billetera) {
        this.billetera = billetera;
    };
    Usuario.prototype.getJuegosGanados = function () {
        return this.juegosGanados;
    };
    Usuario.prototype.setJuegosGanados = function (juegosGanados) {
        this.juegosGanados = juegosGanados;
    };
    /***********************************************************************************************************************************/
    // Tomada del archivo de José
    //Este método nos permite agregar dinero a la billetera del usuario en caso de que gane por ejemplo en el Tragamonedas
    Usuario.prototype.agregarDinero = function (monto) {
        this.billetera += monto;
        console.log("Has recibido ".concat(monto, " pesos \uD83D\uDCB5. Tu saldo actual es:\uD83D\uDCB2").concat(this.billetera, " pesos \uD83E\uDD73"));
    };
    Usuario.prototype.obtenerSaldo = function () {
        return this.billetera;
    };
    Usuario.prototype.RegistrarUsuario = function () {
        console.log("Ingrese su nombre completo ");
        var readlineSync = require('readline-sync');
        var nombre = readlineSync.question("Ingrese aqui su nombre: ");
        console.log("Escriba su Alias si lo tiene(opcional)");
        var alias = readlineSync.question("Descripcion u alias: ");
        console.log("Billetera para jugar ");
        var dineroInicio = readlineSync.questionInt('Ingrese dinero a jugar: ');
        if ((nombre != "") && (dineroInicio >= 0)) {
            if (alias === "") {
                alias = "Jugador Anonimo";
            }
            console.log("Cargando datos....");
            console.log(" jugador : ".concat(nombre, " \n alias : ").concat(alias, " \n Billetera  : ").concat(dineroInicio, " \n"));
            this.nombre = nombre;
            this.alias = alias;
            this.billetera = dineroInicio;
        }
    };
    return Usuario;
}());
exports.Usuario = Usuario;
