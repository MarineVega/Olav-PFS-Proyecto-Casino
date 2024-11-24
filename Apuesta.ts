/*
export interface Apuesta {

    apostar(): void;
    pagarApuesta(): void;
    duplicarApuesta(): void;
    determinarGanador(): void;
    verificarJugada(): void;
    verificarCredito(): void;
    
}
*/
export interface Apuesta {

    apostar(costo: number): void;
    verificarDinero(dineroDisponible: number): void;
    gastarDinero(monto: number): void;
    pagarApuesta(dinero: number): void;
    duplicarApuesta(monto: number): void;
    
}