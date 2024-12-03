import { Casino } from "./clases/Casino";
import { Usuario } from "./clases/Usuario";

//Juegos
import { Veintiuno } from "./juegos/Veintiuno";
import { HorasEspejo } from "./juegos/HorasEspejo";
import { HorasEspejoSolitario } from "./juegos/HorasEspejoSolitario";
import { TragamonedaSports } from "./juegos/TragamonedaSports";
import { TragamonedaPremium } from "./juegos/TragamonedaPremium";

//Lectura por teclado y archivos
import * as rs from "readline-sync";
import * as path from 'path';
import * as fs from 'fs';


//___________________ Rutas reglamentos Juegos ________________________________


const rutaTragamonedasPremium = path.join(__dirname, 'instrucciones/tragamonedasPremium.txt');
const rutaTragamonedasSport = path.join(__dirname, 'instrucciones/tragamonedasSport.txt');
const rutaVeintiuno = path.join(__dirname, 'instrucciones/veintiuno.txt');
const rutaHorasEspejo = path.join(__dirname, 'instrucciones/horasEspejo.txt');
const rutaHorasEspejoSolitario = path.join(__dirname, 'instrucciones/horasEspejoSolitario.txt');


//___________________ Inicia la aplicación ________________________________

let casino1: Casino = new Casino("Juego Limpio 🎲🍀");

let usuarioActual: Usuario | undefined;

//Muestro el menu de logueo
menuLogueo();

//menuCasino();


//____________________ Menu de Logueo _______________________________________

function menuLogueo(): void {
    limpiarConsola();
    console.log("\nBienvenido al Casino Juego Limpio 🎲🍀\n");

    console.log("Opcion 1: Iniciar Sesion");
    console.log("Opcion 2: Crear Nuevo Usuario");
    console.log("Opcion 3: Salir");

    let opcion = rs.question("\nPor favor seleccione una opcion para continuar\n");

    switch (opcion) {
        case "1":
            limpiarConsola();
            gestionarUsuario('login');
            break;

        case "2":
            limpiarConsola();
            gestionarUsuario('registro')
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

function gestionarUsuario(accion: string): void {
    if (accion === 'login') {
        usuarioActual = casino1.iniciarSesion();
    } else {
        usuarioActual = casino1.registrarNuevoUsuario();
    }

    if (usuarioActual) {
        console.log('Inicio de sesion exitoso! 👤🔐');
        console.log('Presione una tecla para ingresar al Menu Principal');
        rs.question();
        menuCasino();    

    } else {
        console.log('\nSesion fallida. Intente nuevamente...');
        console.log('Presione enter para volver al menu de Logueo... ');
        rs.question();
        menuLogueo();
    }   
}

function desloguearse(): void {
    limpiarConsola();
    casino1.cerrarSesionUsuario(usuarioActual.getAlias());
    rs.question('Presione cualquier tecla para continuar...');
    menuLogueo();
}

function mostrarCabezalJuego(nombreJ: string): void {
    console.log(`═══════════════════════════════════════════════════`);
    console.log(` 💰 💰 💰 Casino ${casino1.getNombre()}💰 💰 💰 `);
    console.log(`    💰 💰 💰  ${nombreJ}  💰 💰 💰              `);
    console.log(`           Usuario: ${usuarioActual.getAlias()}    `);
    console.log(`═══════════════════════════════════════════════════\n`);
}

function mostrarReglamento(reglamento: string): void { 
    limpiarConsola();
    console.log(reglamento + `\n`);
    console.log("Presiona Enter para Continuar...");
    rs.question(); 
}

//____________________ Menu principal de juegos _____________________________

function menuCasino(): void {
    limpiarConsola();
    //console.log(`Hola ${usuarioActual.getAliasCuenta()}! Seleccione el juego que desee...! \n `);
    casino1.darBienvenida(usuarioActual.getAlias());
    console.log("Opcion 1: Tragamonedas Sports 🎰");
    console.log("Opcion 2: Tragamonedas Premiun 🎰");
    console.log("Opcion 3: Veintiuno ♣️♦️");
    console.log("Opcion 4: Horas Espejo ⚔️ (Jugador vs Máquina) 🪞");                             
    console.log("Opcion 5: Horas Espejo Solitario 🙃🪞")
    console.log("Opcion 6: Recargar Dinero 💸");
    console.log("Opcion 7: Retirar el dinero y Desloguearse");

    const opcion = rs.question("\nSelecciona una opcion: ");

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

function subMenuJuego(juego: any): void {
    limpiarConsola();

    mostrarCabezalJuego(juego.mostrarJuego());

    console.log(`Seleccione la opcion que desee.\n `);
    console.log("Opcion 1: Jugar");
    console.log("Opcion 2: Ver Reglamento");
    console.log("Opcion 3: Volver");

    const opcion = rs.question("\nSelecciona una opcion: ");

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

function returnToMainMenu(): void {
    console.log("\nPresiona Enter para regresar al Menú Principal...");
    rs.question(); 

    limpiarConsola();
    menuCasino(); 
}

// ___________________ Jugar Tragamonedas Sport _______________________________________

function juegoTragamonedaSport() {
    
    const apuMin=1000;
    const apuMax=15000;

    //console.log("\nEstás jugando la versión Sports de Tragamonedas 🎰 \n");

    let reglamento: string = leerIntruccionesArchivo(rutaTragamonedasSport);

    const tragamonedaSports = new TragamonedaSports("Tragamoneda Sports", reglamento, apuMin, apuMax, usuarioActual, 5);

    subMenuJuego(tragamonedaSports);
    
    returnToMainMenu();
}

//__________________ jugar Tragamonedas Premiun _______________________________________

function juegoTragamonedaPremiun(): void {
    const apuMin=2500;
    const apuMax=25000

    //console.log("Estas jugando la version Premium de Tragamonedas 🎰 \n");

    let reglamento: string = leerIntruccionesArchivo(rutaTragamonedasPremium);

    const tragamonedaPremium = new TragamonedaPremium("TragaMoneda Premium", reglamento, apuMin, apuMax, usuarioActual, 3);

    subMenuJuego(tragamonedaPremium);
    
    returnToMainMenu();
}

// ___________________ Jugar Veintiuno _______________________________________

function juegoVeintiuno(): void {
    const apuMin=1000;
    const apuMax=5000;

    let reglamento: string = leerIntruccionesArchivo(rutaVeintiuno);

    const veintiuno: Veintiuno = new Veintiuno("Juego Veintiuno", reglamento, apuMin, apuMax, usuarioActual);

    subMenuJuego(veintiuno);
    
    returnToMainMenu();
} 

//_________________ Jugar HorasEspejo Vs Maquina _______________________________________

function juegoHorasEspejo(): void {
    const apuMin=1000;
    const apuMax=5000;

    //console.log("**12:21***************** HORAS 00:00 ESPEJO ****************15:51** \n");

    let reglamento: string = leerIntruccionesArchivo(rutaHorasEspejo);

    const horasEspejo = new HorasEspejo("Horas Espejo", reglamento, apuMin, apuMax, usuarioActual);

    subMenuJuego(horasEspejo);
    
    returnToMainMenu();
}

//_________________ Jugar HorasEspejo Solitario _______________________________________

function juegoHorasEspejoSolitario(): void{
    const apuMin=1500;
    const apuMax=5000;

    //console.log("**12:21***************** HORAS 00:00 ESPEJO SOLITARIO****************15:51** \n");

    let reglamento: string = leerIntruccionesArchivo(rutaHorasEspejoSolitario);

    const horasEspejoSolitario = new HorasEspejoSolitario("Horas Espejo", reglamento, apuMin, apuMax, usuarioActual);

    subMenuJuego(horasEspejoSolitario);
    
    returnToMainMenu();
}


//_________________ Billetera Usuario _______________________________________

function recargarDinero(){
    limpiarConsola();

    console.log(`Ingrese dinero para recargar Billetera...💸.Su saldo actual de $: ${usuarioActual.obtenerSaldo()}`);
    
    const dineroRecarga: number = rs.questionInt("Ingrese una suma en $: ");

    usuarioActual.agregarDinero(dineroRecarga);

    returnToMainMenu();
}

//_________________ Lectura instrucciones por .txt _______________________________________


function leerIntruccionesArchivo(rutaArchivo: string): string {
    try {
          let contenido = fs.readFileSync(rutaArchivo, 'utf-8');
      
          return contenido;
    } catch (error) {
          console.error('No se ha podido leer el archivo solicitado. Verifica la ruta.');
          return ''; 
    }
}

//_________________ Consola _______________________________________

function limpiarConsola(): void {
    console.clear();
}