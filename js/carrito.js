let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Variable global para el comprobante
let comprobanteArchivo = null;

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            const imagenProducto = producto.imagenes ? producto.imagenes[0] : producto.imagen;
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${imagenProducto}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio.toLocaleString('es-CO')}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${(producto.precio * producto.cantidad).toLocaleString('es-CO')}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        })
    
    actualizarBotonesEliminar();
    actualizarTotal();
	
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

}

cargarProductosCarrito();

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
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
        onClick: function(){}
      }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado.toLocaleString('es-CO')}`;
}

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    
    // Generar resumen de productos
    let resumenProductos = '';
    productosEnCarrito.forEach(producto => {
        resumenProductos += `
            <div class="producto-resumen">
                <span>${producto.titulo}</span>
                <span>x${producto.cantidad}</span>
                <span>$${(producto.precio * producto.cantidad).toLocaleString('es-CO')}</span>
            </div>
        `;
    });

    // Generar detalles completos para copiar (Nequi/Daviplata)
    let detallesParaCopiar = '';
    productosEnCarrito.forEach((producto, index) => {
        detallesParaCopiar += `${index + 1}. ${producto.titulo} x${producto.cantidad} = $${(producto.precio * producto.cantidad).toLocaleString('es-CO')}`;
        if (index < productosEnCarrito.length - 1) {
            detallesParaCopiar += ' | ';
        }
    });

    Swal.fire({
        title: '<i class="bi bi-cart-check"></i> Finalizar Compra',
        html: `
            <div class="checkout-modal">
                <!-- Formulario de datos -->
                <div class="form-section">
                    <h3><i class="bi bi-person-fill"></i> Datos del Cliente</h3>
                    <input id="name" class="swal2-input" placeholder="Nombre y Apellido" required>
                    <input id="phone" class="swal2-input" placeholder="Número de teléfono" required>
                    <input id="email" class="swal2-input" placeholder="Correo electrónico" required>
                    <input id="company" class="swal2-input" placeholder="Ciudad" required>
                    <input id="profession" class="swal2-input" placeholder="País" required>
                </div>

                <!-- Resumen de Compra -->
                <div class="resumen-section">
                    <h3><i class="bi bi-bag-check-fill"></i> Resumen de tu Pedido</h3>
                    <div class="productos-lista">
                        ${resumenProductos}
                    </div>
                    <div class="total-section">
                        <strong>Total a Pagar:</strong>
                        <strong class="total-amount">$${totalCalculado.toLocaleString('es-CO')}</strong>
                    </div>
                </div>

                <!-- Métodos de Pago -->
                <div class="payment-section">
                    <h3><i class="bi bi-credit-card-fill"></i> Método de Pago</h3>
                    
                    <!-- Nequi -->
                    <div class="payment-method">
                        <input type="radio" name="payment" id="nequi" value="nequi">
                        <label for="nequi" class="payment-label">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlFtGAiosL7q0Uh44M4gl8ZWrM8J8DEfQ_EA&s" alt="Nequi">
                            <span>Nequi</span>
                        </label>
                        <div class="payment-details" id="nequi-details" style="display: none;">
                            <div class="payment-info">
                                <div class="info-row">
                                    <span>Número de Nequi:</span>
                                    <div class="copy-group">
                                        <strong id="nequi-number">3213900071</strong>
                                        <button class="copy-btn" onclick="copiarTexto('3213900071', 'Número copiado')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <span>Valor a transferir:</span>
                                    <div class="copy-group">
                                        <strong id="nequi-amount">$${totalCalculado.toLocaleString('es-CO')}</strong>
                                        <button class="copy-btn" onclick="copiarTexto('${totalCalculado}', 'Valor copiado')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <span>Detalles del pedido:</span>
                                    <div class="copy-group">
                                        <strong id="nequi-details-text" style="font-size: 0.85rem; line-height: 1.4;">${detallesParaCopiar}</strong>
                                        <button class="copy-btn" onclick="copiarTexto('${detallesParaCopiar.replace(/'/g, "\\'")}', 'Detalles copiados')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="open-app-btn nequi-btn" onclick="abrirNequi()">
                                <i class="bi bi-phone-fill"></i> Abrir App Nequi
                            </button>
                        </div>
                    </div>

                    <!-- Daviplata -->
                    <div class="payment-method">
                        <input type="radio" name="payment" id="daviplata" value="daviplata">
                        <label for="daviplata" class="payment-label">
                            <img src="https://files.lafm.com.co/assets/public/2022-03/daviplata.jpg?w=1200" alt="Daviplata">
                            <span>Daviplata</span>
                        </label>
                        <div class="payment-details" id="daviplata-details" style="display: none;">
                            <div class="payment-info">
                                <div class="info-row">
                                    <span>Número Daviplata:</span>
                                    <div class="copy-group">
                                        <strong id="daviplata-number">3213900071</strong>
                                        <button class="copy-btn" onclick="copiarTexto('3213900071', 'Número copiado')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <span>Valor a transferir:</span>
                                    <div class="copy-group">
                                        <strong id="daviplata-amount">$${totalCalculado.toLocaleString('es-CO')}</strong>
                                        <button class="copy-btn" onclick="copiarTexto('${totalCalculado}', 'Valor copiado')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <span>Detalles del pedido:</span>
                                    <div class="copy-group">
                                        <strong id="daviplata-details-text" style="font-size: 0.85rem; line-height: 1.4;">${detallesParaCopiar}</strong>
                                        <button class="copy-btn" onclick="copiarTexto('${detallesParaCopiar.replace(/'/g, "\\'")}', 'Detalles copiados')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button class="open-app-btn daviplata-btn" onclick="abrirDaviplata()">
                                <i class="bi bi-phone-fill"></i> Abrir App Daviplata
                            </button>
                        </div>
                    </div>

                    <!-- Banco Falabella -->
                    <div class="payment-method">
                        <input type="radio" name="payment" id="banco-falabella" value="banco-falabella">
                        <label for="banco-falabella" class="payment-label">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsuKuWUvzxa_lLY_D6t8jDGmkEKsV7oTC4lw&s" alt="Banco Falabella">
                            <span>banco-falabella</span>
                        </label>
                        <div class="payment-details" id="banco-falabella-details" style="display: none;">
                            <div class="payment-info">
                                <div class="info-row">
                                    <span>Tipo de cuenta:</span>
                                    <strong>Ahorros</strong>
                                </div>
                                <div class="info-row">
                                    <span>Número de cuenta:</span>
                                    <div class="copy-group">
                                        <strong>111210232389</strong>
                                        <button class="copy-btn" onclick="copiarTexto('12345678901', 'Cuenta copiada')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="info-row">
                                    <span>Titular:</span>
                                    <strong>Andrés Felipe Rodríguez Barbosa</strong>
                                </div>
                                <div class="info-row">
                                    <span>Valor a transferir:</span>
                                    <div class="copy-group">
                                        <strong>$${totalCalculado.toLocaleString('es-CO')}</strong>
                                        <button class="copy-btn" onclick="copiarTexto('${totalCalculado}', 'Valor copiado')">
                                            <i class="bi bi-clipboard"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upload de Comprobante -->
                <div class="upload-section">
                    <h3><i class="bi bi-file-earmark-arrow-up-fill"></i> Comprobante de Pago</h3>
                    <div class="upload-area" id="upload-area">
                        <i class="bi bi-cloud-upload"></i>
                        <p>Arrastra tu comprobante aquí o haz clic para seleccionar</p>
                        <input type="file" id="comprobante-input" accept="image/*,.pdf" style="display: none;">
                        <div id="file-preview" style="display: none;">
                            <i class="bi bi-file-check"></i>
                            <span id="file-name"></span>
                            <button class="remove-file" onclick="removerArchivo()">
                                <i class="bi bi-x-circle"></i>
                            </button>
                        </div>
                    </div>
                    <small style="color: #666;">Formatos aceptados: JPG, PNG, PDF (Máx. 5MB)</small>
                </div>
            </div>
        `,
        width: '800px',
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-check-circle"></i> Enviar Pedido',
        cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
        customClass: {
            popup: 'checkout-popup',
            confirmButton: 'btn-confirmar',
            cancelButton: 'btn-cancelar'
        },
        didOpen: () => {
            inicializarMetodosPago();
            inicializarUpload();
        },
        preConfirm: () => {
            return procesarPedido(totalCalculado);
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Vaciar carrito
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            
            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.remove("disabled");
        }
    });
}

function inicializarMetodosPago() {
    const radios = document.querySelectorAll('input[name="payment"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            document.querySelectorAll('.payment-details').forEach(detail => {
                detail.style.display = 'none';
            });
            if (this.checked) {
                document.getElementById(this.value + '-details').style.display = 'block';
            }
        });
    });
}

function inicializarUpload() {
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('comprobante-input');
    const filePreview = document.getElementById('file-preview');
    const fileName = document.getElementById('file-name');

    uploadArea.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-file') && !e.target.closest('.remove-file')) {
            fileInput.click();
        }
    });

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            manejarArchivo(e.target.files[0]);
        }
    });

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            manejarArchivo(e.dataTransfer.files[0]);
        }
    });

    function manejarArchivo(file) {
        if (file.size > 5 * 1024 * 1024) {
            Toastify({
                text: "El archivo no debe superar 5MB",
                duration: 3000,
                style: { background: "linear-gradient(to right, #ff6b6b, #ee5a6f)" }
            }).showToast();
            return;
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            Toastify({
                text: "Formato no válido. Usa JPG, PNG o PDF",
                duration: 3000,
                style: { background: "linear-gradient(to right, #ff6b6b, #ee5a6f)" }
            }).showToast();
            return;
        }

        comprobanteArchivo = file;
        fileName.textContent = file.name;
        uploadArea.querySelector('p').style.display = 'none';
        uploadArea.querySelector('i.bi-cloud-upload').style.display = 'none';
        filePreview.style.display = 'flex';
    }
}

function removerArchivo() {
    comprobanteArchivo = null;
    document.getElementById('comprobante-input').value = '';
    document.getElementById('file-preview').style.display = 'none';
    document.querySelector('#upload-area p').style.display = 'block';
    document.querySelector('#upload-area i.bi-cloud-upload').style.display = 'block';
}

function copiarTexto(texto, mensaje) {
    navigator.clipboard.writeText(texto).then(() => {
        Toastify({
            text: mensaje || "Copiado al portapapeles",
            duration: 2000,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
                borderRadius: "2rem",
                fontSize: ".75rem"
            }
        }).showToast();
    });
}

function abrirNequi() {
    const nequiUrl = 'nequi://';
    const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.nequi.MobileApp';
    
    window.location.href = nequiUrl;
    
    setTimeout(() => {
        if (document.hasFocus()) {
            if (confirm('¿No tienes Nequi instalado? ¿Quieres descargar la app?')) {
                window.open(fallbackUrl, '_blank');
            }
        }
    }, 2000);
}

function abrirDaviplata() {
    const daviplataUrl = 'daviplata://';
    const fallbackUrl = 'https://play.google.com/store/apps/details?id=com.ioBuilders.daviplata';
    
    window.location.href = daviplataUrl;
    
    setTimeout(() => {
        if (document.hasFocus()) {
            if (confirm('¿No tienes Daviplata instalado? ¿Quieres descargar la app?')) {
                window.open(fallbackUrl, '_blank');
            }
        }
    }, 2000);
}

function procesarPedido(total) {
    const nombre = document.getElementById('name').value;
    const telefono = document.getElementById('phone').value;
    const correo = document.getElementById('email').value;
    const ciudad = document.getElementById('company').value;
    const pais = document.getElementById('profession').value;
    
    // Validaciones
    if (!nombre || !telefono || !correo || !ciudad || !pais) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return false;
    }

    const metodoPago = document.querySelector('input[name="payment"]:checked');
    if (!metodoPago) {
        Swal.showValidationMessage('Selecciona un método de pago');
        return false;
    }

    if (!comprobanteArchivo) {
        Swal.showValidationMessage('Debes subir el comprobante de pago');
        return false;
    }

    // Verificar si hay productos digitales
    const productosDigitales = productosEnCarrito.filter(p => p.tipo === "digital");
    const hayProductosDigitales = productosDigitales.length > 0;

    // ============================================================
// SUBIR COMPROBANTE A GOOGLE DRIVE
// ============================================================

// TU URL DE GOOGLE APPS SCRIPT
const API_URL = "https://script.google.com/macros/s/AKfycbzT1hm0kpdbvN0cgEcTj1DE9Bf5doIbSW4baw3zi0TQPLy0ptwWA1LK_4r8xYfzxGa9/exec";

// Convertir archivo a base64
const reader = new FileReader();
reader.readAsDataURL(comprobanteArchivo);
reader.onload = function() {
    const base64File = reader.result;
    
    // Preparar datos
    const dataToSend = {
        nombre: nombre,
        correo: correo,
        total: total,
        productos: body, // El detalle completo
        comprobante: base64File,
        nombreArchivo: comprobanteArchivo.name,
        tipoArchivo: comprobanteArchivo.type
    };
    
    // Enviar a Google Apps Script
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(dataToSend)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            console.log("✅ Comprobante subido a Drive:", result.url);
            // El vendedor recibirá email con el enlace
        } else {
            console.error("❌ Error al subir comprobante:", result.error);
        }
    })
    .catch(error => {
        console.error("❌ Error de conexión:", error);
    });
};

    // Construir mensajes
    // Construir email para el VENDEDOR
    let body = `NUEVO PEDIDO - ArtTricolor\n\n`;
    body += `═══════════════════════════════════════\n`;
    body += `DATOS DEL CLIENTE:\n`;
    body += `═══════════════════════════════════════\n`;
    body += `Nombre: ${nombre}\n`;
    body += `Teléfono: ${telefono}\n`;
    body += `Email: ${correo}\n`;
    body += `Ciudad: ${ciudad}\n`;
    body += `País: ${pais}\n\n`;
    
    body += `═══════════════════════════════════════\n`;
    body += `MÉTODO DE PAGO: ${metodoPago.value.toUpperCase()}\n`;
    body += `═══════════════════════════════════════\n\n`;
    
    body += `PRODUCTOS COMPRADOS:\n`;
    body += `───────────────────────────────────────\n`;
    productosEnCarrito.forEach((item, index) => {
        body += `${index + 1}. ${item.titulo}\n`;
        body += `   Cantidad: ${item.cantidad}\n`;
        body += `   Precio unitario: $${item.precio.toLocaleString('es-CO')}\n`;
        body += `   Subtotal: $${(item.precio * item.cantidad).toLocaleString('es-CO')}\n`;
        
        // Si es producto digital, incluir enlace de descarga
        if (item.tipo === "digital" && item.archivoDescarga) {
            body += `   📥 DESCARGA: ${item.archivoDescarga}\n`;
        }
        body += `\n`;
    });
    body += `───────────────────────────────────────\n`;
    body += `TOTAL: $${total.toLocaleString('es-CO')}\n\n`;
    body += `Comprobante adjunto: ${comprobanteArchivo.name}\n\n`;
    
    if (hayProductosDigitales) {
        body += `⚠️ IMPORTANTE: Este pedido incluye productos digitales.\n`;
        body += `Verifica el pago y envía los enlaces de descarga al cliente.\n`;
    }

    // Construir email para el CLIENTE
    let confirmacionBody = `¡Gracias por tu compra, ${nombre}!\n\n`;
    confirmacionBody += `Hemos recibido tu pedido correctamente.\n\n`;
    
    confirmacionBody += `═══════════════════════════════════════\n`;
    confirmacionBody += `RESUMEN DE TU PEDIDO:\n`;
    confirmacionBody += `═══════════════════════════════════════\n\n`;
    
    productosEnCarrito.forEach((item, index) => {
        confirmacionBody += `${index + 1}. ${item.titulo}\n`;
        confirmacionBody += `   Cantidad: ${item.cantidad}\n`;
        confirmacionBody += `   Precio: $${(item.precio * item.cantidad).toLocaleString('es-CO')}\n`;
        
        // Si es producto digital, incluir enlace de descarga para el cliente
        if (item.tipo === "digital" && item.archivoDescarga) {
            confirmacionBody += `\n   🎁 ¡Tu producto digital está listo!\n`;
            confirmacionBody += `   📥 DESCARGA AQUÍ: ${item.archivoDescarga}\n`;
            confirmacionBody += `   Puedes descargar este producto las veces que necesites.\n`;
        }
        confirmacionBody += `\n`;
    });
    
    confirmacionBody += `───────────────────────────────────────\n`;
    confirmacionBody += `TOTAL PAGADO: $${total.toLocaleString('es-CO')}\n`;
    confirmacionBody += `Método de pago: ${metodoPago.value.toUpperCase()}\n\n`;
    
    if (hayProductosDigitales) {
        confirmacionBody += `═══════════════════════════════════════\n`;
        confirmacionBody += `PRODUCTOS DIGITALES:\n`;
        confirmacionBody += `═══════════════════════════════════════\n`;
        confirmacionBody += `Los enlaces de descarga están incluidos arriba.\n`;
        confirmacionBody += `Si tienes problemas para descargar, responde este email.\n`;
        confirmacionBody += `Tienes acceso ilimitado a tus descargas.\n\n`;
    }
    
    confirmacionBody += `Procesaremos tu pedido en las próximas 24 horas.\n`;
    confirmacionBody += `Te contactaremos al ${telefono} para confirmar.\n\n`;
    confirmacionBody += `Si tienes alguna pregunta, responde este email.\n\n`;
    confirmacionBody += `¡Gracias por confiar en ArtTricolor!\n`;

    // ============================================================================
    // CONFIGURACIÓN DE EMAILJS - REEMPLAZA CON TUS DATOS
    // ============================================================================
    
    // 1. REEMPLAZA ESTO con tu Public Key (de Account en EmailJS)
    emailjs.init("dE5hbDtP0q7v-chkh");
    // Ejemplo: emailjs.init("user_abc123xyz");
    
    // 2. Email al VENDEDOR (TÚ)
    emailjs.send(
        "default_service",              // Service ID (de Email Services)
        "template_9wtvduj",    // Template ID para vendedor
        {
            to_name: "Andrés Rodríguez",              // Tu nombre
            to_email: "artworldartistico@gmail.com",  // Tu email
            from_name: nombre,                         // Nombre del cliente
            from_email: correo,                        // Email del cliente
            message: body,                             // Mensaje completo
        }
    ).then((response) => {
        console.log("✅ Email al vendedor enviado:", response);
    }).catch((error) => {
        console.error("❌ Error al enviar email al vendedor:", error);
    });

    // 3. Email al CLIENTE
    emailjs.send(
        "default_service",              // Service ID (el mismo de arriba)
        "template_0km5fgk",     // Template ID para cliente
        {
            to_name: nombre,                           // Nombre del cliente
            to_email: correo,                          // Email del cliente
            from_name: "ArtTricolor",                 // Tu tienda
            message: confirmacionBody,                 // Mensaje de confirmación
        }
    ).then((response) => {
        console.log("✅ Email al cliente enviado:", response);
        if (response.status === 200) {
            Swal.fire({
                icon: 'success',
                title: '¡Pedido Exitoso!',
                html: `
                    <p>Tu pedido ha sido recibido correctamente.</p>
                    <p>Recibirás un email de confirmación en <strong>${correo}</strong></p>
                    <p>Te contactaremos pronto para confirmar el envío.</p>
                `,
                confirmButtonText: 'Aceptar'
            });
        }
    }).catch((error) => {
        console.error("❌ Error al enviar email al cliente:", error);
        Swal.fire('Error', 'Hubo un problema al procesar tu pedido. Por favor revisa la consola del navegador.', 'error');
    });

    return true;
}
