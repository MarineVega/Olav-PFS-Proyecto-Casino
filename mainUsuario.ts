import { Usuario } from "./Usuario";

const jugador:Usuario=new Usuario("ganador", "juan", 100000);

console.log(jugador);

console.log("Mostrar mas");
jugador.crearAliascuenta(jugador.alias,jugador.nombre)
console.log(jugador.aliasCuenta);


