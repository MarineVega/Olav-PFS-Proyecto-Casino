export interface Apuesta {
    apostar(costo: number): void;
    verificarDinero(dineroDisponible: number): void;
    gastarDinero(monto: number): void;
    pagarApuesta(dinero: number): void;   
}