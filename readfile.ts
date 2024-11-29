import * as fs from 'fs';              
import * as path from 'path';  //-->esta linea importarla en el main junto al menu       

// Función para leer el archivo --> agregada en Casino
function leerArchivo(rutaArchivo: string): string {
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
let instruccionJuego: string = leerArchivo(ruta);

console.log(instruccionJuego);

ruta = path.join(__dirname, 'instrucciones/veintiuno.txt');
instruccionJuego = leerArchivo(ruta);

console.log(instruccionJuego);
