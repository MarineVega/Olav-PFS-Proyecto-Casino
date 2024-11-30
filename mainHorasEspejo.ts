function HorasEspejo():void {
    console.log(" ");
    console.log(" *****************12:21***************** HORAS 00:00 ESPEJO ****************15:51*************************");
    console.log(" ");
}

// VALIDO LAS OPCIONES INGRESADAS
function solicitarNumeroValido(mensaje: string, min: number, max: number): number {
    let numero: number;
    let entrada: string;
    do {
        entrada = rs.question(mensaje); // Leer entrada como texto
        numero = Number(entrada); // Convertir a número

        if (isNaN(numero) || !Number.isInteger(numero) || numero < min || numero > max) {
            console.error(`Error: Debe ingresar un número válido entre ${min} y ${max}.`);15
        }
    } while (isNaN(numero) || !Number.isInteger(numero)|| numero < min || numero > max);

    return numero;
}

// VERIFICAR APUESTA
function solicitarApuestaValida(min: number, max: number, jugador: Usuario): number {
    let apuesta: number;
    let entrada: string;
    let esValida: boolean;

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

// EMPIEZA LA LOGICA DEL JUEGO
let continuar: boolean = true;

while (continuar) {
    console.log("Selecciona una opción:");
    console.log("1. Horas Espejo ⚔️  (Jugador vs Máquina)");
    console.log("2. Horas Espejo Solitario 🙃");
    console.log("3. Salir");

    // Validar la opción seleccionada
    const opcion = solicitarNumeroValido("Respuesta: ", 1, 3);

    console.log(" ");

    if (opcion === 1) {
        const horasEspejo = new HorasEspejo("Horas Espejo","Apuesta mínima de $1000 y máxima $5000. ¡Gánale a la máquina! O con 00:00 multiplica tu apuesta por 10.",1000, 5000, jugador);
        console.log(`Reglamento: ${horasEspejo.getReglamento()}`);

        const apuesta = solicitarApuestaValida(1000, 5000, jugador);
        horasEspejo.apostar(apuesta);

        console.warn("Dinero disponible del usuario: " + jugador.obtenerSaldo());
        console.log(" ");
        console.error("🎮 Presione cualquier tecla para comenzar: ");
        rs.question();
        horasEspejo.iniciarPartida();
    } else if (opcion === 2) {
        const horasEspejoSolitario = new HorasEspejoSolitario("Horas Espejo Solitario","Apuesta mínima $1500 y máxima $5000. ¿Qué te dirá el azar? Saca horas espejo, suma 30 o más y gana. O con 00:00 ganas tu apuesta por 10.", 1500, 5000, jugador
        );
        console.log(`Reglamento: ${horasEspejoSolitario.getReglamento()}`);

        const apuesta = solicitarApuestaValida(1500, 5000, jugador);
        horasEspejoSolitario.apostar(apuesta);

        console.warn("Dinero disponible del usuario: " + jugador.obtenerSaldo());
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
}