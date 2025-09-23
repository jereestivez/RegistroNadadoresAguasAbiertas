// =============================================
// SIMULADOR REGISTRO DE NADADORES -
// =============================================

// ARRAYS PRINCIPALES
const nadadores = [];
const registros = [];
let contadorId = 1;

// FUNCIONES AUXILIARES
// Función flecha para validar números positivos
const esNumeroPositivo = (valor) => !isNaN(valor) && valor > 0;

// =============================================
// FUNCIONES PRINCIPALES
// =============================================

// FUNCIÓN 1: Agregar nadador
function agregarNadador() {
    const nombre = prompt("Ingrese el nombre del nadador:");
    const apellido = prompt("Ingrese el apellido del nadador:");
    
    if (!nombre || !apellido) {
        alert("❌ Debe ingresar nombre y apellido");
        return;
    }
    
    const nuevoNadador = {
        id: contadorId++,
        nombre: nombre,
        apellido: apellido
    };
    
    nadadores.push(nuevoNadador);
    alert(`✅ Nadador "${nombre} ${apellido}" agregado correctamente.`);
}

// FUNCIÓN 2: Registrar sesión de nado
function registrarSesion() {
    if (nadadores.length === 0) {
        alert("❌ Primero debe agregar al menos un nadador");
        return;
    }
    
    // Mostrar nadadores
    let listaNadadores = "Seleccione un nadador:\n";
    let index = 1;
    for (const nadador of nadadores) {
        listaNadadores += `${index}. ${nadador.nombre} ${nadador.apellido}\n`;
        index++;
    }
    
    const opcion = parseInt(prompt(listaNadadores)) - 1;
    
    if (isNaN(opcion) || opcion < 0 || opcion >= nadadores.length) {
        alert("❌ Selección inválida");
        return;
    }
    
    const nadadorSeleccionado = nadadores[opcion];
    
    const metros = parseFloat(prompt("Metros nadados:"));
    const tiempo = parseFloat(prompt("Tiempo en minutos:"));
    const lugar = prompt("Lugar de nado:");
    
    // PREGUNTAR POR TRAJE DE NEOPRENO
    let trajeNeoprenoInput = prompt("¿Usó traje de neopreno? (si/no):");
    const trajeNeopreno = trajeNeoprenoInput !== null && trajeNeoprenoInput.toLowerCase() === "si";
    
    // VALIDACIONES
    if (!esNumeroPositivo(metros) || !esNumeroPositivo(tiempo) || !lugar) {
        alert("❌ Datos inválidos. Metros y tiempo deben ser números positivos.");
        return;
    }
    
    const nuevoRegistro = {
        id: contadorId++,
        idNadador: nadadorSeleccionado.id,
        nadador: `${nadadorSeleccionado.nombre} ${nadadorSeleccionado.apellido}`,
        metros: metros,
        tiempo: tiempo,
        lugar: lugar,
        fecha: new Date().toISOString().split('T')[0],
        trajeNeopreno: trajeNeopreno
    };
    
    registros.push(nuevoRegistro);
    alert("✅ Sesión registrada correctamente!");
}

// FUNCIÓN 3: Ver registros de un nadador
function verRegistrosNadador() {
    if (nadadores.length === 0) {
        alert("❌ No hay nadadores registrados");
        return;
    }
    
    if (registros.length === 0) {
        alert("📝 No hay sesiones registradas");
        return;
    }
    
    // Mostrar nadadores 
    let listaNadadores = "Seleccione un nadador para ver sus registros:\n";
    let index = 1;
    for (const nadador of nadadores) {
        listaNadadores += `${index}. ${nadador.nombre} ${nadador.apellido}\n`;
        index++;
    }
    
    const opcion = parseInt(prompt(listaNadadores)) - 1;
    
    // Funcion flecha para validar
    if (!esNumeroPositivo(opcion + 1) || opcion < 0 || opcion >= nadadores.length) {
        alert("❌ Selección inválida");
        return;
    }
    
    const nadadorSeleccionado = nadadores[opcion];
    const registrosNadador = registros.filter(reg => reg.idNadador === nadadorSeleccionado.id);
    
    if (registrosNadador.length === 0) {
        alert(`📝 ${nadadorSeleccionado.nombre} no tiene sesiones registradas`);
        return;
    }
    
    // Mostrar registros en consola
    console.log(`=== REGISTROS DE ${nadadorSeleccionado.nombre.toUpperCase()} ===`);
    for (const registro of registrosNadador) {
        console.log(`Fecha: ${registro.fecha}`);
        console.log(`Lugar: ${registro.lugar}`);
        console.log(`Metros: ${registro.metros}m`);
        console.log(`Tiempo: ${registro.tiempo}min`);
        console.log(`Neopreno: ${registro.trajeNeopreno ? "Sí" : "No"}`);
        console.log("-------------------");
    }
    
    alert(`Registros de ${nadadorSeleccionado.nombre} mostrados en la consola`);
}

// FUNCIÓN 4: Mostrar resumen general
function mostrarResumen() {
    console.log("=== RESUMEN GENERAL ===");
    console.log(`Total nadadores: ${nadadores.length}`);
    console.log(`Total sesiones: ${registros.length}`);
    
    if (nadadores.length > 0) {
        console.log("\nNadadores registrados:");
        for (const nadador of nadadores) {
            const sesionesNadador = registros.filter(reg => reg.idNadador === nadador.id).length;
            console.log(`- ${nadador.nombre} ${nadador.apellido}: ${sesionesNadador} sesiones`);
        }
    }
    
    if (registros.length > 0) {
        console.log("\nÚltimas sesiones registradas:");
        const ultimasSesiones = registros.slice(-3).reverse();
        for (const sesion of ultimasSesiones) {
            console.log(`- ${sesion.nadador}: ${sesion.metros}m en ${sesion.lugar} - Neopreno: ${sesion.trajeNeopreno ? "Sí" : "No"}`);
        }
    }
    
    alert("Resumen general mostrado en la consola");
}

// =============================================
// MENÚ PRINCIPAL
// =============================================

function mostrarMenu() {
    let opcion;
    
    do {
        opcion = prompt(`=== SIMULADOR REGISTRO DE NADADORES ===

1. Agregar nadador
2. Registrar sesión de nado
3. Ver registros de un nadador
4. Mostrar resumen general
5. Salir

Seleccione una opción:`);

        if (opcion === null) {
            break;
        }

        if (!esNumeroPositivo(parseInt(opcion)) && opcion !== "5") {
            alert("❌ Opción inválida");
            continue;
        }

        switch (opcion) {
            case "1":
                agregarNadador();
                break;
            case "2":
                registrarSesion();
                break;
            case "3":
                verRegistrosNadador();
                break;
            case "4":
                mostrarResumen();
                break;
            case "5":
                alert("👋 ¡Hasta pronto!");
                break;
            default:
                alert("❌ Opción inválida");
        }
    } while (opcion !== "5");
}

// =============================================
// INICIAR SISTEMA
// =============================================

alert("¡Bienvenido al Simulador Registro de Nadadores!");
mostrarMenu();