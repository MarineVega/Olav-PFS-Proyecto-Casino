"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Usuario_1 = require("./Usuario");
var jugador = new Usuario_1.Usuario("ganador", "juan", 100000);
console.log(jugador);
console.log("Mostrar mas");
jugador.crearAliascuenta(jugador.alias, jugador.nombre);
console.log(jugador.aliasCuenta);
