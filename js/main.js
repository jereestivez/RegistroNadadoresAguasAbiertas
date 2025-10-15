//supermercados
const SUPERMERCADOS = [
    "Carrefour 292 - Comodoro Rivadavia",
    "Hiper Changomas 1057 - Comodoro Rivadavia", 
    "Maxiconsumo - Comodoro Rivadavia"
];

// productos y precios
let productos = [];
let precios = [];

//agregar producto y precio
function agregarProducto(nombre, marca, tamaño){
    if (!nombre){
        return alert("El nombre del producto no puede estar vacío");
    }
    let nuevoProducto = {
        nombre: nombre, 
        marca: marca || "No especificada",
        tamaño: tamaño || "No especificado"
    };
    productos.push(nuevoProducto);
    guardarDatos();
    return { exito: true, mensaje: "Producto agregado", producto: nuevoProducto };
}

//registrar precio
function registrarPrecio(nombreProducto, supermercado, precio) {
    if (!nombreProducto || !supermercado || !precio) {
        return { exito: false, mensaje: "Faltan datos" };
    }

    let producto = productos.find(p => p.nombre === nombreProducto);
    if (!producto) {
        return { exito: false, mensaje: "Producto no encontrado" };
    }

    let nuevoPrecio = {
        nombreProducto: nombreProducto,
        supermercado: supermercado,
        precio: parseFloat(precio),
        fecha: new Date().toLocaleDateString()
    };

    precios.push(nuevoPrecio);
    guardarDatos();
    return { exito: true, mensaje: "Precio registrado", registro: nuevoPrecio };
}

//listar productos
function listarProductos() {
    if (productos.length === 0) {
        return { exito: false, mensaje: "No hay productos cargados", productos: [] };
    }
    return { exito: true, mensaje: `Se encontraron ${productos.length} productos`, productos };
}

//ver historial de precios
function verHistorialPrecios(nombreProducto) {
    if (!nombreProducto) {
        return { exito: false, mensaje: "Debe ingresar un nombre de producto", precios: [] };
    }
    let producto = productos.find(p => p.nombre === nombreProducto);
    if (!producto) {
        return { exito: false, mensaje: "Producto no encontrado", precios: [] };
    }

    let preciosProducto = precios.filter(p => p.nombreProducto === nombreProducto);
    if (preciosProducto.length === 0) {
        return { exito: true, mensaje: `El producto "${nombreProducto}" no tiene precios registrados`, precios: [] };
    }

    return {
        exito: true,
        mensaje: `Se encontraron ${preciosProducto.length} registros de precios para "${nombreProducto}"`,
        producto,
        precios: preciosProducto
    };
}

//filtros
function filtrarProductos(criterio) {
    return productos.filter(criterio);
}
function productosporMarca(marca) {
    return filtrarProductos(productos => productos.marca.includes(marca));
}
function buscarProductos(texto) {
    return filtrarProductos(producto => producto.nombre.toLowerCase().includes(texto.toLowerCase()));
}

//LocalStorage
function guardarDatos() {
    localStorage.setItem('productosSupermercado', JSON.stringify(productos));
    localStorage.setItem('preciosSupermercado', JSON.stringify(precios));
}
function cargarDatos() {
    let productosGuardados = localStorage.getItem('productosSupermercado');
    let preciosGuardados = localStorage.getItem('preciosSupermercado');
    if (productosGuardados) productos = JSON.parse(productosGuardados);
    if (preciosGuardados) precios = JSON.parse(preciosGuardados);
}

//cargar supermercados
const cargarSupermercados = () => {
    const select = document.getElementById('select-supermercado');
    select.innerHTML = '<option value="">Seleccionar supermercado</option>';
    SUPERMERCADOS.forEach(supermercado => {
        const option = document.createElement('option');
        option.value = supermercado;
        option.textContent = supermercado;
        select.appendChild(option);
    });
};

//formulario agregar producto
function manejarAgregarProducto(event) {
    event.preventDefault();
    const nombre = document.getElementById('input-nombre').value;
    const marca = document.getElementById('input-marca').value;
    const tamaño = document.getElementById('input-tamaño').value;

    const resultado = agregarProducto(nombre, marca, tamaño);
    const mensajeElement = document.getElementById('mensaje-producto');
    mensajeElement.textContent = resultado.mensaje;
    mensajeElement.className = resultado.exito ? 'mensaje exito' : 'mensaje error';

    if (resultado.exito) document.getElementById('formulario-producto').reset();
}
document.getElementById('formulario-producto').addEventListener('submit', manejarAgregarProducto);

//eliminar producto
const eliminarProducto = (nombreProducto) => {
    if (!nombreProducto) return { exito: false, mensaje: "Debe ingresar un nombre de producto" };

    const productoIndex = productos.findIndex(p => p.nombre === nombreProducto);
    if (productoIndex === -1) return { exito: false, mensaje: "Producto no encontrado" };

    const productoEliminado = productos.splice(productoIndex, 1)[0];
    const preciosEliminados = precios.filter(p => p.nombreProducto === nombreProducto);
    precios = precios.filter(p => p.nombreProducto !== nombreProducto);
    guardarDatos();

    return { exito: true, mensaje: `Producto "${nombreProducto}" eliminado exitosamente`, productoEliminado, preciosEliminados: preciosEliminados.length };
};

//mostrar interfaz eliminar
const mostrarInterfazEliminar = () => {
    const contenedor = document.getElementById('resultados-consulta');
    contenedor.innerHTML = `
        <div class="formulario-eliminar">
            <h3>Eliminar Producto</h3>
            <input type="text" id="input-eliminar-producto" placeholder="Nombre del producto a eliminar">
            <button id="btn-confirmar-eliminar">Eliminar Producto</button>
            <div id="mensaje-eliminar"></div>
        </div>
    `;

    const btnConfirmar = document.getElementById('btn-confirmar-eliminar');
    btnConfirmar.addEventListener('click', manejarEliminarProducto);
};

//manejar eliminación
const manejarEliminarProducto = () => {
    const nombreProducto = document.getElementById('input-eliminar-producto').value;
    const mensajeElement = document.getElementById('mensaje-eliminar');
    const resultado = eliminarProducto(nombreProducto);

    mensajeElement.textContent = resultado.mensaje;
    mensajeElement.className = resultado.exito ? 'mensaje exito' : 'mensaje error';
    if (resultado.exito) document.getElementById('input-eliminar-producto').value = '';
};

//formulario precios
function manejarRegistrarPrecio(event) {
    event.preventDefault();
    const nombreProducto = document.getElementById('input-producto-precio').value;
    const supermercado = document.getElementById('select-supermercado').value;
    const precio = document.getElementById('input-precio').value;

    const resultado = registrarPrecio(nombreProducto, supermercado, precio);
    const mensajeElement = document.getElementById('mensaje-precio');
    mensajeElement.textContent = resultado.mensaje;
    mensajeElement.className = resultado.exito ? 'mensaje exito' : 'mensaje error';

    if (resultado.exito) document.getElementById('formulario-precio').reset();
}

//mostrar productos
function mostrarProductosEnPantalla(){
    const contenedor = document.getElementById('resultados-consulta');
    const resultado = listarProductos();
    contenedor.innerHTML = '';

    if (!resultado.exito) {
        contenedor.innerHTML = `<p class="mensaje info">${resultado.mensaje}</p>`;
        return;
    }

    const titulo = document.createElement('h3');
    titulo.textContent = `Productos Cargados (${resultado.productos.length})`;
    contenedor.appendChild(titulo);

    const lista = document.createElement('div');
    lista.className = 'lista-productos';
    resultado.productos.forEach((producto, index) => {
        const item = document.createElement('div');
        item.className = 'item-producto';
        item.innerHTML = `
            <strong>${index + 1}. ${producto.nombre}</strong>
            ${producto.marca ? `- ${producto.marca}` : ''}
            ${producto.tamaño ? `- ${producto.tamaño}` : ''}
        `;
        lista.appendChild(item);
    });
    contenedor.appendChild(lista);
}

//mostrar historial
function mostrarFormularioHistorial(){
    const contenedor = document.getElementById('resultados-consulta');
    contenedor.innerHTML = `
        <div class="formulario-historial">
            <h3>Ver Historial de Precios</h3>
            <input type="text" id="input-buscar-producto" placeholder="Nombre del producto">
            <button id="btn-buscar-historial">Buscar Precios</button>
        </div>
        <div id="resultado-historial"></div>
    `;

    const btnBuscar = document.getElementById('btn-buscar-historial');
    btnBuscar.addEventListener('click', buscarYMostrarHistorial);
}

function buscarYMostrarHistorial() {
    const nombreProducto = document.getElementById('input-buscar-producto').value;
    const resultadoContenedor = document.getElementById('resultado-historial');
    const resultado = verHistorialPrecios(nombreProducto);

    resultadoContenedor.innerHTML = '';
    if (!resultado.exito) {
        resultadoContenedor.innerHTML = `<p class="mensaje error">${resultado.mensaje}</p>`;
        return;
    }

    if (resultado.precios.length === 0) {
        resultadoContenedor.innerHTML = `<p class="mensaje info">${resultado.mensaje}</p>`;
        return;
    }

    const infoProducto = document.createElement('div');
    infoProducto.className = 'info-producto';
    infoProducto.innerHTML = `<h4>${resultado.producto.nombre}</h4><p>${resultado.producto.marca} - ${resultado.producto.tamaño}</p>`;
    resultadoContenedor.appendChild(infoProducto);

    const tabla = document.createElement('table');
    tabla.className = 'tabla-precios';
    tabla.innerHTML = `
        <thead><tr><th>Fecha</th><th>Supermercado</th><th>Precio</th></tr></thead>
        <tbody>
            ${resultado.precios.map(precio => `
                <tr>
                    <td>${precio.fecha}</td>
                    <td>${precio.supermercado}</td>
                    <td>$${precio.precio.toFixed(2)}</td>
                </tr>`).join('')}
        </tbody>
    `;
    resultadoContenedor.appendChild(tabla);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarSupermercados();
    cargarDatos();

    const formPrecio = document.getElementById('formulario-precio');
    if (formPrecio) formPrecio.addEventListener('submit', manejarRegistrarPrecio);

    const btnVerProductos = document.getElementById('btn-ver-productos');
    const btnVerHistorial = document.getElementById('btn-ver-historial');
    const btnEliminarProducto = document.getElementById('btn-eliminar-producto');

    if (btnVerProductos) btnVerProductos.addEventListener('click', mostrarProductosEnPantalla);
    if (btnVerHistorial) btnVerHistorial.addEventListener('click', mostrarFormularioHistorial);
    if (btnEliminarProducto) btnEliminarProducto.addEventListener('click', mostrarInterfazEliminar);
});
