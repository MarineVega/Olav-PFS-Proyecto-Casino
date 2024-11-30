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
console.log("\nBienvenido al Casino Juego Limpio 🎲🍀. Por favor registrese para seguir...\n");
// Crear un nuevo objeto de Usuario vacio
// Se crea un usuario (jugador) para probar los Tragamonedas Sports y Premium

let usuario: Usuario = casino1.registrarUsuario();

//let usuario2: Usuario = casino1.registrarUsuario();
//let usuario3: Usuario = casino1.registrarUsuario();

//casino1.cargarDesdeJSON()

// casino1.agregarUsuario(usuario);
// casino1.agregarUsuario(usuario2);
// casino1.agregarUsuario(usuario3);

casino1.listarUsuarios();

console.log("Presiona Enter para Continuar...");
rs.question();

//casino1.darBienvenida(usuario.getAlias());

//casino1.guardarEnJSON();

//Muestro el menu del casino
menuCasino();


//____________________ Menu principal de juegos _____________________________

function menuCasino(): void {
    limpiarConsola();

    console.log(`${usuario.getAlias()} seleccione el juego que desee...! \n `);
    console.log("Opcion 1: Tragamonedas Sports 🎰");
    console.log("Opcion 2: Tragamonedas Premiun 🎰");
    console.log("Opcion 3: Veintiuno ♣️♦️");
    console.log("Opcion 4: Horas Espejo ⚔️ (Jugador vs Máquina) 🪞");                             
    console.log("Opcion 5: Horas Espejo Solitario 🙃🪞")
    console.log("Opcion 6: Recargar Dinero 💸");
    console.log("Opcion 7: Retirar el dinero y salir del Casino");

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
            limpiarConsola();
            console.log("Saliendo del Casino. ¡Hasta pronto!👋");
            break;

        default:
            limpiarConsola();
            console.log("Opción no válida❗Intentalo de nuevo.\nPresione Enter para continuar...");
            rs.question();
            menuCasino(); 
            break;
    }
}

//____________________ submenu Juego ____________________________

function subMenuJuego(juego: any): void {
    limpiarConsola();

    console.log(`${usuario.getAlias()} seleccione la opcion que desee. \n `);
    console.log("Opcion 1: Jugar");
    console.log("Opcion 2: Ver Reglamento");
    console.log("Opcion 3: Volver");

    const opcion = rs.question("\nSelecciona una opcion: \n");

    switch (opcion) {
        case "1":
            limpiarConsola();
            juego.jugar();
            break;

        case "2":
            limpiarConsola();
            console.log(juego.getReglamento() + `\n`);
            console.log("Presiona Enter para Continuar...");
            rs.question(); 
            subMenuJuego(juego);
            break;

        case "3":
            //limpiarConsola()
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

//____________________ retorno para jugar ____________________________

function returnToMenu(): void {
    console.log("\nPresiona Enter para regresar al Menú Principal...");
    rs.question(); 

    limpiarConsola();
    menuCasino(); 
}

// ___________________ jugar Tragamonedas Sport ________________________

function juegoTragamonedaSport() {
    
    const apuMin=1000;
    const apuMax=15000;

    console.log("\nEstás jugando la versión Sports de Tragamonedas 🎰 \n");

    let reglamento: string = leerIntruccionesArchivo(rutaTragamonedasSport);

    const tragamonedaSports = new TragamonedaSports("Tragamoneda Sports", reglamento, apuMin, apuMax, usuario, 5);

    subMenuJuego(tragamonedaSports);
    
    returnToMenu();
}

//__________________ jugar Tragamonedas Premiun ______________________

function juegoTragamonedaPremiun(): void {
    const apuMin=2500;
    const apuMax=25000

    console.log("Estas jugando la version Premium de Tragamonedas 🎰 \n");

    let reglamento: string = leerIntruccionesArchivo(rutaTragamonedasPremium);

    const tragamonedaPremium = new TragamonedaPremium("TragaMoneda Premium", reglamento, apuMin, apuMax, usuario, 3);

    subMenuJuego(tragamonedaPremium);
    
    returnToMenu();
}

// ___________________ jugar Veintiuno _____________________________

function juegoVeintiuno(): void {
    let continuar: string = "S";
    let apuesta: number;
    let apuestaValida: boolean;

    let reglamento: string = leerIntruccionesArchivo(rutaVeintiuno);

    const partida1: Veintiuno = new Veintiuno("Juego Veintiuno", reglamento, 1000, 5000, usuario);

    console.log(" ")
    console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
    console.log(" ")
    console.error(partida1.mostrarDatosVeintiuno());
    console.log(" ")
    
    do {
        apuesta = rs.questionInt("Ingrese el dinero de la apuesta: ");
        apuestaValida = partida1.apostar();
        
        if(!apuestaValida && usuario.obtenerSaldo() < apuesta && partida1.validarMinimosMaximos(apuesta)){
            returnToMenu();
        }
        
    } while (!apuestaValida);

    console.warn("💸 Dinero disponible del usuario: " + usuario.obtenerSaldo());

    if (apuestaValida) {
        console.log("  ")
        console.error("Presione cualquier tecla para comenzar: ");
        rs.question();            
        
        do {    
            partida1.jugar();
            if (!partida1.getFinalizoPartida()) {
                console.warn(partida1.mostrarPartida());
            }
        
            if (!partida1.getFinalizoPartida()) {
                do {
                    continuar = rs.question("Desea tirar nuevamente: S/N? ");
                    // chequeo que ingrese una opción válida
                } while (!["s", "n"].includes(continuar.toLowerCase()))        
            }  
        } while ((continuar.toLowerCase() == "s") && !partida1.getFinalizoPartida())
            
            
        // chequeo si salió porque el usuario no quiso continuar
        if (continuar.toLowerCase() == "n") {    
            partida1.detenerPartida(1);
        }
        
        console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
        console.log(" ");
        console.error("🎮 Presione cualquier tecla para comenzar: ");
        rs.question();
    }
    
    returnToMenu();
}


//_________________ Jugar HorasEspejo Vs Maquina _______________________________

function juegoHorasEspejo(): void {
    const apuMin=1000;
    const apuMax=5000;

    console.log("**12:21***************** HORAS 00:00 ESPEJO ****************15:51** \n");

    let reglamento: string = leerIntruccionesArchivo(rutaHorasEspejo);

    const horasEspejo = new HorasEspejo("Horas Espejo", reglamento, apuMin, apuMax, usuario);

    subMenuJuego(horasEspejo);
    
    returnToMenu();
}

//_________________ Jugar HorasEspejo Solitario _______________________________

function juegoHorasEspejoSolitario(): void{
    const apuMin=1500;
    const apuMax=5000;

    console.log("**12:21***************** HORAS 00:00 ESPEJO SOLITARIO****************15:51** \n");

    let reglamento: string = leerIntruccionesArchivo(rutaHorasEspejoSolitario);

    const horasEspejoSolitario = new HorasEspejoSolitario("Horas Espejo", reglamento, apuMin, apuMax, usuario);

    subMenuJuego(horasEspejoSolitario);
    
    returnToMenu();
}
/*
        } else if (opcion === 2) {

            let reglamento: string = leerIntruccionesArchivo(rutaHorasEspejoSolitario);

            const horasEspejoSolitario = new HorasEspejoSolitario("Horas Espejo Solitario", reglamento, 1500, 5000, usuario);

            console.log(`Reglamento: ${horasEspejoSolitario.getReglamento()}`);

            const apuesta = solicitarApuestaValida(1500, 5000, usuario);
            horasEspejoSolitario.apostar();

            console.warn("Dinero disponible del usuario: " + usuario.obtenerSaldo());
            console.log(" ");
            console.error("🎮 Presione cualquier tecla para comenzar: ");
            rs.question();
            horasEspejoSolitario.iniciarPartida();

        } else if (opcion === 3) {
            console.log("Gracias por jugar. ¡Hasta la próxima!");
            continuar = false;
        }

        // Preguntar si desea jugar nuevamente
        if (continuar) {
            console.log("¿Desea jugar otra vez? (1: Sí, 2: No)");
            continuar = solicitarNumeroValido("Respuesta: ", 1, 2) === 1;
        }
    }
        
    returnToMenu();

}*/

// VALIDO LAS OPCIONES INGRESADAS
function solicitarNumeroValido(mensaje: string, min: number, max: number): number {
    let numero: number;
    let entrada: string;
    do {
        entrada = rs.question(mensaje); // Leer entrada como texto
        numero = Number(entrada); // Convertir a número

        if (isNaN(numero) || !Number.isInteger(numero) || numero < min || numero > max) {
            console.error(`Error: Debe ingresar un número válido entre ${min} y ${max}.`);
        }
    } while (isNaN(numero) || !Number.isInteger(numero)|| numero < min || numero > max);

    return numero;
}

// VERIFICAR APUESTA
function solicitarApuestaValida(min: number, max: number, jugador: Usuario): number {
    let apuesta: number;
    let entrada: string;
    let esValida: boolean;

    // entrada = rs.question("Ingrese el dinero de la apuesta: "); // Leer como texto
    // apuesta = Number(entrada); // Convertir a número

    do {
        entrada = rs.question("Ingrese el dinero de la apuesta: "); // Leer como texto
        apuesta = Number(entrada); // Convertir a número

        if (isNaN(apuesta) || apuesta <= 0) {
            console.error("Error: La apuesta debe ser un número positivo.");
            esValida = false;
        } else {
            esValida = apuesta >= min && apuesta <= max && apuesta <= jugador.obtenerSaldo();
            if (!esValida) {
                console.error(`Error: La apuesta debe estar entre $${min} y $${max}, y no superar tu saldo disponible.`);
            }
        }
    } while (!esValida);

    return apuesta;
}




//_________________ Billetera Usuario _______________________________

function recargarDinero(){
    limpiarConsola();

    console.log(`Ingrese dinero para recargar Billetera...💸.Su saldo actual de $: ${usuario.obtenerSaldo()}`);
    
    const dineroRecarga: number = rs.questionInt("Ingrese una suma en $: ");

    usuario.agregarDinero(dineroRecarga);
    console.log(`Su saldo actual recargado es de $: ${usuario.obtenerSaldo()}`);

    returnToMenu();
}

//_________________ Lectura instrucciones por .txt _______________________________


function leerIntruccionesArchivo(rutaArchivo: string): string {
    try {
          let contenido = fs.readFileSync(rutaArchivo, 'utf-8');
      
          return contenido;
    } catch (error) {
          console.error('No se ha podido leer el archivo solicitado. Verifica la ruta.');
          return ''; 
    }
}

//_________________ Consola _______________________________

function limpiarConsola(): void {
    console.clear();
}