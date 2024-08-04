class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto, cantidad) {
        for (let i = 0; i < cantidad; i++) {
            this.productos.push(producto);
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    mostrarDetalles() {
        return this.productos.map(producto => `${producto.nombre} - $${producto.precio}`).join('\n');
    }

    finalizarCompra() {
        const total = this.calcularTotal();
        alert(`Compra finalizada. Total: $${total}`);
        console.log(`Compra finalizada. Total: $${total}`);
        this.productos = [];
        return total;
    }
}

// Lista de productos disponibles con precios reales
const productosDisponibles = [
    new Producto('Manzana', 1200),
    new Producto('Pan Integral', 2500),
    new Producto('Leche Descremada', 900),
    new Producto('Arroz Blanco', 1000),
    new Producto('Huevos (docena)', 2800),
    new Producto('Pollo (1 kg)', 2850),
    new Producto('Tomate', 1550),
    new Producto('Cereal', 1290),
    new Producto('Zanahoria', 1000),
    new Producto('Jugo de Naranja', 950)
];

const carrito = new Carrito();

function mostrarProductos() {
    let mensaje = 'Productos disponibles:\n';
    productosDisponibles.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
    });
    mensaje += 'Ingrese el número del producto para agregar al carrito o 0 para finalizar la compra.';
    return mensaje;
}

function solicitarProducto() {
    const productosTexto = mostrarProductos();
    let seleccion = parseInt(prompt(productosTexto), 10);

    while (isNaN(seleccion) || seleccion < 0 || seleccion > productosDisponibles.length) {
        alert('Selección inválida. Inténtalo de nuevo.');
        seleccion = parseInt(prompt(productosTexto), 10);
    }

    if (seleccion === 0) {
        carrito.finalizarCompra();
    } else {
        const productoSeleccionado = productosDisponibles[seleccion - 1];
        let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productoSeleccionado.nombre} que desea agregar:`), 10);

        while (isNaN(cantidad) || cantidad <= 0) {
            alert('Cantidad inválida. Ingrese un número positivo.');
            cantidad = parseInt(prompt(`Ingrese la cantidad de ${productoSeleccionado.nombre} que desea agregar:`), 10);
        }

        carrito.agregarProducto(productoSeleccionado, cantidad);
        alert(`${cantidad} ${productoSeleccionado.nombre}(s) agregado(s) al carrito.`);
        console.log(`Producto(s) agregado(s): ${productoSeleccionado.nombre} - $${productoSeleccionado.precio} (${cantidad} unidades)`);

        const seguirAgregando = prompt('¿Desea seguir agregando productos? (s/n)').toLowerCase();
        if (seguirAgregando === 's') {
            solicitarProducto();
        } else {
            carrito.finalizarCompra();
        }
    }
}

alert('Bienvenido al Super mercado Baratin.');
setTimeout(solicitarProducto, 100); // Utilizamos setTimeout para permitir que la página se renderice primero
