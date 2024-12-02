"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Casino_1 = require("./clases/Casino");
//Juegos
var Veintiuno_1 = require("./juegos/Veintiuno");
var HorasEspejo_1 = require("./juegos/HorasEspejo");
var HorasEspejoSolitario_1 = require("./juegos/HorasEspejoSolitario");
var TragamonedaSports_1 = require("./juegos/TragamonedaSports");
var TragamonedaPremium_1 = require("./juegos/TragamonedaPremium");
//Lectura por teclado y archivos
var rs = require("readline-sync");
var path = require("path");
var fs = require("fs");
//___________________ Rutas reglamentos Juegos ________________________________
var rutaTragamonedasPremium = path.join(__dirname, 'instrucciones/tragamonedasPremium.txt');
var rutaTragamonedasSport = path.join(__dirname, 'instrucciones/tragamonedasSport.txt');
var rutaVeintiuno = path.join(__dirname, 'instrucciones/veintiuno.txt');
var rutaHorasEspejo = path.join(__dirname, 'instrucciones/horasEspejo.txt');
var rutaHorasEspejoSolitario = path.join(__dirname, 'instrucciones/horasEspejoSolitario.txt');
//___________________ Inicia la aplicación ________________________________
var casino1 = new Casino_1.Casino("Juego Limpio 🎲🍀");
var usuarioActual;
//Muestro el menu de logueo
menuLogueo();
//menuCasino();
//____________________ Menu de Logueo _______________________________________
function menuLogueo() {
    limpiarConsola();
    console.log("\nBienvenido al Casino Juego Limpio 🎲🍀\n");
    console.log("Opcion 1: Iniciar Sesion");
    console.log("Opcion 2: Crear Nuevo Usuario");
    console.log("Opcion 3: Salir");
    var opcion = rs.question("\nPor favor seleccione una opcion para continuar\n");
    switch (opcion) {
        case "1":
            limpiarConsola();
            gestionarUsuario('login');
            break;
        case "2":
            limpiarConsola();
            gestionarUsuario('registro');
            break;
        case "3":
            limpiarConsola();
            console.log("Saliendo del Casino. ¡Hasta pronto!👋");
            break;
        default:
            limpiarConsola();
            console.log("Opción no válida❗Intentalo de nuevo.\nPresione Enter para continuar...");
            rs.question();
            menuLogueo();
            break;
    }
}
function gestionarUsuario(accion) {
    if (accion === 'login') {
        usuarioActual = casino1.iniciarSesion();
    }
    else {
        usuarioActual = casino1.registrarNuevoUsuario();
    }
    if (usuarioActual) {
        console.log('Inicio de sesion exitoso! 👤🔐');
        console.log('Presione una tecla para volver al menu de logueo...');
        rs.question();
        menuCasino();
    }
    else {
        console.log('\nAlias o Contrasenia Invalida.');
        console.log('Presione una tecla para volver al menu de logueo...');
        rs.question();
        menuLogueo();
    }
}
function desloguearse() {
    limpiarConsola();
    casino1.guardarEnJSON();
    casino1.despedir(usuarioActual.getAlias());
    casino1.cerrarSesionUsuario();
    rs.question('Presione cualquier tecla para continuar...');
    menuLogueo();
}
function mostrarCabezalJuego(nombreJ) {
    console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
    console.log(" \uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0 Casino ".concat(casino1.getNombre(), "\uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0 "));
    console.log("    \uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0  ".concat(nombreJ, "  \uD83D\uDCB0 \uD83D\uDCB0 \uD83D\uDCB0              "));
    console.log("           Usuario: ".concat(usuarioActual.getAlias(), "    "));
    console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n");
}
function mostrarReglamento(reglamento) {
    limpiarConsola();
    console.log(reglamento + "\n");
    console.log("Presiona Enter para Continuar...");
    rs.question();
}
//____________________ Menu principal de juegos _____________________________
function menuCasino() {
    limpiarConsola();
    //console.log(`Hola ${usuarioActual.getAliasCuenta()}! Seleccione el juego que desee...! \n `);
    casino1.darBienvenida(usuarioActual.getAlias());
    console.log("Opcion 1: Tragamonedas Sports 🎰");
    console.log("Opcion 2: Tragamonedas Premiun 🎰");
    console.log("Opcion 3: Veintiuno ♣️♦️");
    console.log("Opcion 4: Horas Espejo ⚔️ (Jugador vs Máquina) 🪞");
    console.log("Opcion 5: Horas Espejo Solitario 🙃🪞");
    console.log("Opcion 6: Recargar Dinero 💸");
    console.log("Opcion 7: Retirar el dinero y Desloguearse");
    var opcion = rs.question("\nSelecciona una opcion: ");
    switch (opcion) {
        case "1":
            juegoTragamonedaSport();
            break;
        case "2":
            juegoTragamonedaPremiun();
            break;
        case "3":
            juegoVeintiuno();
            break;
        case "4":
            juegoHorasEspejo();
            break;
        case "5":
            juegoHorasEspejoSolitario();
            break;
        case "6":
            recargarDinero();
            break;
        case "7":
            desloguearse();
            break;
        default:
            limpiarConsola();
            console.log("Opción no válida❗Intentalo de nuevo.\nPresione Enter para continuar...");
            rs.question();
            menuCasino();
            break;
    }
}
//____________________ Submenu Juego _______________________________________
function subMenuJuego(juego) {
    limpiarConsola();
    mostrarCabezalJuego(juego.mostrarJuego());
    console.log("Seleccione la opcion que desee.\n ");
    console.log("Opcion 1: Jugar");
    console.log("Opcion 2: Ver Reglamento");
    console.log("Opcion 3: Volver");
    var opcion = rs.question("\nSelecciona una opcion: ");
    switch (opcion) {
        case "1":
            limpiarConsola();
            juego.jugar();
            break;
        case "2":
            mostrarReglamento(juego.getReglamento());
            subMenuJuego(juego);
            break;
        case "3":
            menuCasino();
            break;
        default:
            limpiarConsola();
            console.log("Opción no válida❗Intentalo de nuevo.\nPresione Enter para continuar...");
            rs.question();
            subMenuJuego(juego);
            break;
    }
}
//____________________ Volver al Menu Principal _______________________________________
function returnToMainMenu() {
    console.log("\nPresiona Enter para regresar al Menú Principal...");
    rs.question();
    limpiarConsola();
    menuCasino();
}
// ___________________ Jugar Tragamonedas Sport _______________________________________
function juegoTragamonedaSport() {
    var apuMin = 1000;
    var apuMax = 15000;
    //console.log("\nEstás jugando la versión Sports de Tragamonedas 🎰 \n");
    var reglamento = leerIntruccionesArchivo(rutaTragamonedasSport);
    var tragamonedaSports = new TragamonedaSports_1.TragamonedaSports("Tragamoneda Sports", reglamento, apuMin, apuMax, usuarioActual, 5);
    subMenuJuego(tragamonedaSports);
    returnToMainMenu();
}
//__________________ jugar Tragamonedas Premiun _______________________________________
function juegoTragamonedaPremiun() {
    var apuMin = 2500;
    var apuMax = 25000;
    //console.log("Estas jugando la version Premium de Tragamonedas 🎰 \n");
    var reglamento = leerIntruccionesArchivo(rutaTragamonedasPremium);
    var tragamonedaPremium = new TragamonedaPremium_1.TragamonedaPremium("TragaMoneda Premium", reglamento, apuMin, apuMax, usuarioActual, 3);
    subMenuJuego(tragamonedaPremium);
    returnToMainMenu();
}
// ___________________ Jugar Veintiuno _______________________________________
/* PLANTILLA. VER METODOS mostrarInfoComienzoJuego Y mostrarInfoCobroEntrada EN CLASE JUEGO
como se usan en horas espejo o en tragamonedas
function juegoVeintiuno(): void {
    const apuMin=2500;
    const apuMax=25000

    let reglamento: string = leerIntruccionesArchivo(rutaVeintiuno);

    const veintiuno: Veintiuno = new Veintiuno("Juego Veintiuno", reglamento, 1000, 5000, usuarioActual);

    subMenuJuego(tragamonedaPremium);
    
    returnToMainMenu();
}
*/
function juegoVeintiuno() {
    var continuar = "S";
    var apuesta;
    var apuestaValida;
    var reglamento = leerIntruccionesArchivo(rutaVeintiuno);
    var partida1 = new Veintiuno_1.Veintiuno("Juego Veintiuno", reglamento, 1000, 5000, usuarioActual);
    console.log(" ");
    console.warn("Dinero disponible del usuario: " + usuarioActual.obtenerSaldo());
    console.log(" ");
    console.error(partida1.mostrarDatosVeintiuno());
    console.log(" ");
    do {
        apuesta = rs.questionInt("Ingrese el dinero de la apuesta: ");
        apuestaValida = partida1.apostar();
        if (!apuestaValida && usuarioActual.obtenerSaldo() < apuesta && partida1.validarMinimosMaximos(apuesta)) {
            returnToMainMenu();
        }
    } while (!apuestaValida);
    console.warn("💸 Dinero disponible del usuario: " + usuarioActual.obtenerSaldo());
    if (apuestaValida) {
        console.log("  ");
        console.error("Presione cualquier tecla para comenzar: ");
        rs.question();
        do {
            partida1.jugar();
            if (!partida1.getFinalizoPartida()) {
                console.warn(partida1.mostrarPartida());
            }
            if (!partida1.getFinalizoPartida()) {
                do { //COPIADO A JUEGO, (preguntarSiContinua()) GRACIAS MARI :D
                    continuar = rs.question("Desea tirar nuevamente: S/N? ");
                    // chequeo que ingrese una opción válida
                } while (!["s", "n"].includes(continuar.toLowerCase()));
            }
        } while ((continuar.toLowerCase() == "s") && !partida1.getFinalizoPartida());
        // chequeo si salió porque el usuario no quiso continuar
        if (continuar.toLowerCase() == "n") {
            partida1.detenerPartida(1);
        }
        console.warn("Dinero disponible del usuario: " + usuarioActual.obtenerSaldo());
        console.log(" ");
        console.error("🎮 Presione cualquier tecla para comenzar: ");
        rs.question();
    }
    returnToMainMenu();
}
//_________________ Jugar HorasEspejo Vs Maquina _______________________________________
function juegoHorasEspejo() {
    var apuMin = 1000;
    var apuMax = 5000;
    //console.log("**12:21***************** HORAS 00:00 ESPEJO ****************15:51** \n");
    var reglamento = leerIntruccionesArchivo(rutaHorasEspejo);
    var horasEspejo = new HorasEspejo_1.HorasEspejo("Horas Espejo", reglamento, apuMin, apuMax, usuarioActual);
    subMenuJuego(horasEspejo);
    returnToMainMenu();
}
//_________________ Jugar HorasEspejo Solitario _______________________________________
function juegoHorasEspejoSolitario() {
    var apuMin = 1500;
    var apuMax = 5000;
    //console.log("**12:21***************** HORAS 00:00 ESPEJO SOLITARIO****************15:51** \n");
    var reglamento = leerIntruccionesArchivo(rutaHorasEspejoSolitario);
    var horasEspejoSolitario = new HorasEspejoSolitario_1.HorasEspejoSolitario("Horas Espejo", reglamento, apuMin, apuMax, usuarioActual);
    subMenuJuego(horasEspejoSolitario);
    returnToMainMenu();
}
//_________________ Billetera Usuario _______________________________________
function recargarDinero() {
    limpiarConsola();
    console.log("Ingrese dinero para recargar Billetera...\uD83D\uDCB8.Su saldo actual de $: ".concat(usuarioActual.obtenerSaldo()));
    var dineroRecarga = rs.questionInt("Ingrese una suma en $: ");
    usuarioActual.agregarDinero(dineroRecarga);
    console.log("Su saldo actual recargado es de $: ".concat(usuarioActual.obtenerSaldo()));
    returnToMainMenu();
}
//_________________ Lectura instrucciones por .txt _______________________________________
function leerIntruccionesArchivo(rutaArchivo) {
    try {
        var contenido = fs.readFileSync(rutaArchivo, 'utf-8');
        return contenido;
    }
    catch (error) {
        console.error('No se ha podido leer el archivo solicitado. Verifica la ruta.');
        return '';
    }
}
//_________________ Consola _______________________________________
function limpiarConsola() {
    console.clear();
}
