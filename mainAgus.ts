import * as fs from 'fs';              
import * as path from 'path';  //-->esta linea importarla en el main junto al menu       
import { Casino } from './Casino';
import { TragamonedaPremium } from './juegos/TragamonedaPremium';
import { Usuario } from './Usuario';

// Función para leer el archivo. podria ir en el maun junto al menu
function leerIntruccionesArchivo(rutaArchivo: string): string {
  try {
        let contenido = fs.readFileSync(rutaArchivo, 'utf-8');
    
        return contenido;
  } catch (error) {
        console.error('No se ha podido leer el archivo solicitado. Verifica la ruta.');
        return ''; 
  }
}

// Llama a la función con la ruta del archivo. Tambien van en el main junto al menu
let ruta: string = path.join(__dirname, 'instrucciones/horas_espejo.txt');
let instruccionJuego: string = leerIntruccionesArchivo(ruta);

console.log(instruccionJuego);

ruta = path.join(__dirname, 'instrucciones/tragamonedas.txt');
instruccionJuego = leerIntruccionesArchivo(ruta);

console.log(instruccionJuego);

ruta = path.join(__dirname, 'instrucciones/veintiuno.txt');
instruccionJuego = leerIntruccionesArchivo(ruta);

console.log(instruccionJuego);

/////////////////////////////////////////////////////////////

let casino: Casino = new Casino('Juego Justo');

let nuevoUsuario = new Usuario("Antito", "Antonela Di Pinto", 10000);

casino.agregarUsuario(nuevoUsuario);

let nuevoJuego = new TragamonedaPremium("TragaMoneda Premium", "Reglas del juego", 2500, 25000, nuevoUsuario, 3);

casino.agregarJuego(nuevoJuego);

casino.mostrarCasino();
