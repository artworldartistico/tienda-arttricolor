let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })
    .catch(error => {
        console.error("Error al cargar productos:", error);
        const contenedorProductos = document.querySelector("#contenedor-productos");
        contenedorProductos.innerHTML = "<p style='text-align: center; padding: 2rem;'>Error al cargar los productos. Por favor, recarga la página.</p>";
    });

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    if (productosElegidos.length === 0) {
        contenedorProductos.innerHTML = "<p style='text-align: center; padding: 2rem; grid-column: 1/-1;'>No hay productos disponibles en esta categoría.</p>";
        return;
    }

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        
        // Usar la primera imagen del array de imágenes o la imagen única
        const imagenProducto = producto.imagenes ? producto.imagenes[0] : producto.imagen;
        
        // Determinar si es producto digital o físico
        const esDigital = producto.tipo === "digital";
        const tieneStock = esDigital || (producto.stock && producto.stock > 0);
        const stockBajo = !esDigital && producto.stock > 0 && producto.stock <= 5;
        const agotado = !esDigital && producto.stock === 0;
        
        // Badge apropiado
        let badge = '';
        if (esDigital) {
            badge = '<span class="badge-digital">Descarga instantánea</span>';
        } else if (stockBajo) {
            badge = '<span class="badge-stock-bajo">¡Últimas unidades!</span>';
        } else if (agotado) {
            badge = '<span class="badge-agotado">Agotado</span>';
        }
        
        div.innerHTML = `
            <div class="producto-imagen-container">
                <img class="producto-imagen" src="${imagenProducto}" alt="${producto.titulo}" data-producto-id="${producto.id}">
                ${badge}
            </div>
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio.toLocaleString('es-CO')}</p>
                <div class="producto-acciones-container">
                    <button class="producto-agregar" id="${producto.id}" ${!tieneStock ? 'disabled' : ''}>
                        <i class="bi bi-${esDigital ? 'download' : 'cart-plus'}"></i> ${agotado ? 'Agotado' : (esDigital ? 'Comprar' : 'Agregar')}
                    </button>
                    <button class="producto-ver-mas" data-producto-id="${producto.id}">
                        <i class="bi bi-eye"></i>
                    </button>
                </div>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
    configurarBotonesVerMas();
    configurarClickImagenes();
}

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            
            if (productoCategoria) {
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                tituloPrincipal.innerText = "Categoría";
                cargarProductos([]);
            }
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

function configurarBotonesVerMas() {
    const botonesVerMas = document.querySelectorAll(".producto-ver-mas");
    
    botonesVerMas.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoId = e.currentTarget.getAttribute("data-producto-id");
            window.location.href = `./producto.html?id=${productoId}`;
        });
    });
}

function configurarClickImagenes() {
    const imagenesProductos = document.querySelectorAll(".producto-imagen");
    
    imagenesProductos.forEach(imagen => {
        imagen.addEventListener("click", (e) => {
            const productoId = e.currentTarget.getAttribute("data-producto-id");
            window.location.href = `./producto.html?id=${productoId}`;
        });
        
        // Agregar efecto de cursor pointer
        imagen.style.cursor = "pointer";
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    
    // Verificar si es producto digital
    const esDigital = productoAgregado.tipo === "digital";
    
    // Verificar stock solo para productos físicos
    if (!esDigital && productoAgregado.stock === 0) {
        Toastify({
            text: "Producto agotado",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #961818, #c92a2a)",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            offset: {
                x: '1.5rem',
                y: '1.5rem'
            }
        }).showToast();
        return;
    }

    Toastify({
        text: esDigital ? "Producto agregado - Descarga tras pago" : "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: "linear-gradient(to right, #4b33a8, #785ce9)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem',
            y: '1.5rem'
        },
        onClick: function(){
            window.location.href = "./carrito.html";
        }
    }).showToast();

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        
        // Para productos digitales, permitir múltiples compras
        // Para productos físicos, verificar stock
        if (esDigital) {
            productosEnCarrito[index].cantidad++;
        } else if (productosEnCarrito[index].cantidad < productoAgregado.stock) {
            productosEnCarrito[index].cantidad++;
        } else {
            Toastify({
                text: "Stock máximo alcanzado",
                duration: 2000,
                gravity: "top",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #f5a623, #f76b1c)",
                    borderRadius: "2rem",
                    fontSize: ".75rem"
                },
                offset: {
                    x: '1.5rem',
                    y: '1.5rem'
                }
            }).showToast();
            return;
        }
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
