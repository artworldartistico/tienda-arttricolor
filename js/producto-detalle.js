// Obtener el ID del producto desde la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

let productoActual = null;
let productos = [];

// Elementos del DOM
const productoLoading = document.getElementById("producto-loading");
const productoNoEncontrado = document.getElementById("producto-no-encontrado");
const productoContenido = document.getElementById("producto-contenido");
const imagenPrincipal = document.getElementById("imagen-principal");
const imagenesMiniaturas = document.getElementById("imagenes-miniaturas");
const inputQuantity = document.getElementById("input-quantity");
const btnIncrement = document.getElementById("btn-increment");
const btnDecrement = document.getElementById("btn-decrement");
const btnAgregarCarrito = document.getElementById("btn-agregar-carrito");
const btnComprarAhora = document.getElementById("btn-comprar-ahora");
const btnZoom = document.getElementById("btn-zoom");
const modalZoom = document.getElementById("modal-zoom");
const modalClose = document.getElementById("modal-close");
const modalImagen = document.getElementById("modal-imagen");
const numerito = document.getElementById("numerito");

// Cargar productos y mostrar el producto específico
async function cargarProducto() {
    try {
        const response = await fetch("./js/productos.json");
        productos = await response.json();
        
        productoActual = productos.find(p => p.id === productId);
        
        if (productoActual) {
            mostrarProducto();
            actualizarNumerito();
        } else {
            mostrarProductoNoEncontrado();
        }
    } catch (error) {
        console.error("Error al cargar el producto:", error);
        mostrarProductoNoEncontrado();
    }
}

function mostrarProducto() {
    productoLoading.classList.add("hidden");
    productoContenido.classList.remove("hidden");
    
    const esDigital = productoActual.tipo === "digital";
    
    // Actualizar título de la página
    document.getElementById("page-title").textContent = `${productoActual.titulo} | ArtTricolor`;
    
    // Actualizar información básica
    document.getElementById("producto-titulo").textContent = productoActual.titulo;
    document.getElementById("producto-precio").textContent = `$${productoActual.precio.toLocaleString('es-CO')}`;
    
    // Convertir saltos de línea \n a <br> para HTML
    document.getElementById("producto-descripcion").innerHTML = productoActual.descripcion.replace(/\n/g, '<br>');
    document.getElementById("descripcion-texto").innerHTML = productoActual.descripcion.replace(/\n/g, '<br>');
    
    document.getElementById("producto-categoria").textContent = productoActual.categoria.nombre;
    
    // Stock (diferente para productos digitales)
    const stockElement = document.getElementById("producto-stock");
    if (esDigital) {
        stockElement.innerHTML = `<i class="bi bi-download"></i> Descarga instantánea`;
        stockElement.classList.add("disponible-digital");
        
        // Ocultar control de cantidad para productos digitales
        document.querySelector(".cantidad-container").style.display = "none";
        
        // Cambiar texto de botones
        btnAgregarCarrito.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar al carrito';
        btnComprarAhora.innerHTML = '<i class="bi bi-lightning-fill"></i> Comprar ahora';
        
    } else {
        // Producto físico - mostrar stock normal
        if (productoActual.stock > 0) {
            stockElement.innerHTML = `<i class="bi bi-check-circle-fill"></i> Disponible (${productoActual.stock} unidades)`;
            stockElement.classList.add("en-stock");
        } else {
            stockElement.innerHTML = `<i class="bi bi-x-circle-fill"></i> Agotado`;
            stockElement.classList.add("sin-stock");
            btnAgregarCarrito.disabled = true;
            btnComprarAhora.disabled = true;
        }
    }
    
    // Configurar galería de imágenes
    configurarGaleria();
    
    // Mostrar características
    if (productoActual.caracteristicas && productoActual.caracteristicas.length > 0) {
        const listaCaracteristicas = document.getElementById("lista-caracteristicas");
        listaCaracteristicas.innerHTML = "";
        productoActual.caracteristicas.forEach(caracteristica => {
            const li = document.createElement("li");
            li.innerHTML = `<i class="bi bi-check2"></i> ${caracteristica}`;
            listaCaracteristicas.appendChild(li);
        });
    } else {
        document.getElementById("producto-caracteristicas").style.display = "none";
    }
    
    // ============================================================
    // MOSTRAR CAMPOS ADICIONALES DINÁMICOS
    // ============================================================
    mostrarCamposAdicionales();
    
    // Agregar información específica de producto digital
    if (esDigital) {
        agregarInfoDigital();
    }
    
    // Inicializar toggles después de que todo esté cargado
    inicializarToggles();
}

function mostrarCamposAdicionales() {
    // Verificar si el producto tiene campos adicionales
    if (!productoActual.camposAdicionales || productoActual.camposAdicionales.length === 0) {
        return; // No mostrar nada si no hay campos adicionales
    }
    
    // Obtener la primera sección desplegable (Descripción completa)
    const descripcionSeccion = document.querySelector(".producto-detalles-extra .detalle-seccion");
    
    if (!descripcionSeccion) {
        console.error("No se encontró la sección de descripción");
        return;
    }
    
    // Crear HTML para cada campo adicional con la misma estructura
    productoActual.camposAdicionales.forEach((campo, index) => {
        const campoId = `campo-adicional-${index}`;
        
        // Convertir items array a párrafos <p> (igual que las secciones nativas)
        const itemsHTML = campo.items.map(item => `<p>${item}</p>`).join('');
        
        const campoHTML = `
            <div class="detalle-seccion">
                <button class="detalle-toggle" data-target="${campoId}">
                    <span>${campo.titulo}</span>
                    <i class="bi bi-chevron-down"></i>
                </button>
                <div class="detalle-contenido" id="${campoId}">
                    ${itemsHTML}
                </div>
            </div>
        `;
        
        // Insertar DESPUÉS de la descripción completa (afterend)
        descripcionSeccion.insertAdjacentHTML('beforeend', campoHTML);
    });
}

function inicializarToggles() {
    document.querySelectorAll(".detalle-toggle").forEach(toggle => {
        // Remover eventos anteriores para evitar duplicados
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        newToggle.addEventListener("click", () => {
            const targetId = newToggle.getAttribute("data-target");
            const contenido = document.getElementById(targetId);
            const icon = newToggle.querySelector("i");
            
            newToggle.classList.toggle("active");
            contenido.classList.toggle("show");
            
            if (contenido.classList.contains("show")) {
                icon.style.transform = "rotate(180deg)";
            } else {
                icon.style.transform = "rotate(0deg)";
            }
        });
    });
}

function agregarInfoDigital() {
    const infoDigitalHTML = `
        <div class="info-producto-digital">
            <div class="info-item">
                <i class="bi bi-download"></i>
                <div>
                    <strong>Descarga instantánea</strong>
                    <p>Accede al producto inmediatamente después del pago</p>
                </div>
            </div>
            ${productoActual.formato ? `
            <div class="info-item">
                <i class="bi bi-file-earmark"></i>
                <div>
                    <strong>Formato</strong>
                    <p>${productoActual.formato}</p>
                </div>
            </div>
            ` : ''}
            ${productoActual.tamanoArchivo ? `
            <div class="info-item">
                <i class="bi bi-hdd"></i>
                <div>
                    <strong>Tamaño</strong>
                    <p>${productoActual.tamanoArchivo}</p>
                </div>
            </div>
            ` : ''}
            <div class="info-item">
                <i class="bi bi-shield-check"></i>
                <div>
                    <strong>Garantía</strong>
                    <p>Devolución de dinero en 30 días si no estás satisfecho</p>
                </div>
            </div>
        </div>
    `;
    
    // Insertar después de las características
    const caracteristicasDiv = document.getElementById("producto-caracteristicas");
    if (caracteristicasDiv) {
        caracteristicasDiv.insertAdjacentHTML('afterend', infoDigitalHTML);
    }
}

function configurarGaleria() {
    const imagenes = productoActual.imagenes || [productoActual.imagen];
    
    // Mostrar imagen principal
    imagenPrincipal.src = imagenes[0];
    imagenPrincipal.alt = productoActual.titulo;
    
    // Crear miniaturas
    imagenesMiniaturas.innerHTML = "";
    imagenes.forEach((imagen, index) => {
        const miniatura = document.createElement("img");
        miniatura.src = imagen;
        miniatura.alt = `${productoActual.titulo} - Imagen ${index + 1}`;
        miniatura.classList.add("miniatura");
        if (index === 0) miniatura.classList.add("active");
        
        miniatura.addEventListener("click", () => {
            imagenPrincipal.src = imagen;
            document.querySelectorAll(".miniatura").forEach(m => m.classList.remove("active"));
            miniatura.classList.add("active");
        });
        
        imagenesMiniaturas.appendChild(miniatura);
    });
}

function mostrarProductoNoEncontrado() {
    productoLoading.classList.add("hidden");
    productoNoEncontrado.classList.remove("hidden");
}

// Control de cantidad
let cantidad = 1;

btnIncrement.addEventListener("click", () => {
    const esDigital = productoActual && productoActual.tipo === "digital";
    if (esDigital) {
        cantidad = 1;
        inputQuantity.value = 1;
        return;
    }
    
    if (productoActual && cantidad < productoActual.stock) {
        cantidad++;
        inputQuantity.value = cantidad;
    }
});

btnDecrement.addEventListener("click", () => {
    if (cantidad > 1) {
        cantidad--;
        inputQuantity.value = cantidad;
    }
});

inputQuantity.addEventListener("change", (e) => {
    const esDigital = productoActual && productoActual.tipo === "digital";
    if (esDigital) {
        cantidad = 1;
        inputQuantity.value = 1;
        return;
    }
    
    let valor = parseInt(e.target.value);
    if (isNaN(valor) || valor < 1) {
        valor = 1;
    } else if (productoActual && valor > productoActual.stock) {
        valor = productoActual.stock;
    }
    cantidad = valor;
    inputQuantity.value = cantidad;
});

// Agregar al carrito
btnAgregarCarrito.addEventListener("click", () => {
    agregarAlCarrito();
});

function agregarAlCarrito() {
    if (!productoActual) return;
    
    const esDigital = productoActual.tipo === "digital";
    
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    
    const productoExistente = productosEnCarrito.find(p => p.id === productoActual.id);
    
    if (productoExistente) {
        if (esDigital) {
            productoExistente.cantidad = 1;
        } else {
            productoExistente.cantidad += cantidad;
        }
    } else {
        productosEnCarrito.push({
            ...productoActual,
            cantidad: esDigital ? 1 : cantidad
        });
    }
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    actualizarNumerito();
    
    Toastify({
        text: esDigital ? 'Producto digital agregado - Descarga tras pago' : `${cantidad} ${cantidad === 1 ? 'producto agregado' : 'productos agregados'} al carrito`,
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
        }
    }).showToast();
    
    if (!esDigital) {
        cantidad = 1;
        inputQuantity.value = 1;
    }
}

// Comprar ahora
btnComprarAhora.addEventListener("click", () => {
    agregarAlCarrito();
    setTimeout(() => {
        window.location.href = "./carrito.html";
    }, 500);
});

// Actualizar número del carrito
function actualizarNumerito() {
    const productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    const total = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.textContent = total;
}

// Modal de zoom
btnZoom.addEventListener("click", () => {
    modalImagen.src = imagenPrincipal.src;
    modalZoom.classList.remove("hidden");
    document.body.style.overflow = "hidden";
});

modalClose.addEventListener("click", cerrarModal);
modalZoom.addEventListener("click", (e) => {
    if (e.target === modalZoom) {
        cerrarModal();
    }
});

function cerrarModal() {
    modalZoom.classList.add("hidden");
    document.body.style.overflow = "auto";
}

// Inicializar
cargarProducto();
