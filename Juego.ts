export abstract class Juego {
    protected nombre: string;
    protected reglamento: string;
    protected apuestaMinima: number;
    protected apuestaMaxima: number;
    protected creditos: number;
    protected equivalenciaCredito: number;

    constructor(nombre: string, reglamento: string){
        this.nombre = nombre;
        this.reglamento = reglamento;
        this.apuestaMinima = 0;
        this.apuestaMaxima = 0;
        this.creditos = 0;
        this.equivalenciaCredito = 0;
    }

    protected iniciarJuego(apuMin: number, apuMax: number, equivCred: number): void{
        this.setApuestaMinima(apuMin);    
        this.setApuestaMaxima(apuMax);
        this.setEquivalenciaCredito(equivCred);
    }

    protected abstract finalizarJuego(): void;

    protected mostrarJuego(): string {
        return `Juego: ${this.getNombre()}\nReglamento: ${this.getReglamento()}`
    }

    protected cargarCredito(cantCreditos: number): void {
        this.creditos += cantCreditos;
    }

    protected usarCredito(): void {
        this.creditos--;
    }

    //Getter and setters

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getReglamento(): string {
        return this.reglamento;
    }

    public setReglamento(reglamento: string): void {
        this.reglamento = reglamento;
    }

    public getApuestaMinima(): number {
        return this.apuestaMinima;
    }

    public setApuestaMinima(apuestaMinima: number): void {
        this.apuestaMinima = apuestaMinima;
    }

    public getApuestaMaxima(): number {
        return this.apuestaMaxima;
    }

    public setApuestaMaxima(apuestaMaxima: number): void {
        this.apuestaMaxima = apuestaMaxima;
    }

    public getCreditos(): number {
        return this.creditos;
    }

    public setCreditos(creditos: number): void {
        this.creditos = creditos;
    }

    public getEquivalenciaCredito(): number {
        return this.equivalenciaCredito;
    }

    public setEquivalenciaCredito(equivalenciaCredito: number): void {
        this.equivalenciaCredito = equivalenciaCredito;
    }

}
