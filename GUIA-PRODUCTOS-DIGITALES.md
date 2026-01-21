# 📥 Guía Completa: Productos Digitales Descargables

## 🎯 ¿Cómo funciona?

Tu tienda ahora soporta **dos tipos de productos**:

### 1. **Productos Físicos** (con stock)
- Muestran cantidad disponible
- Control de inventario
- Se agotan cuando el stock llega a 0

### 2. **Productos Digitales** (sin stock)
- ✨ **Descarga instantánea**
- Sin límite de inventario
- Siempre disponibles
- Badge especial: "Descarga instantánea"

---

## 📋 Estructura de Productos Digitales

### Campos del JSON para Productos Digitales:

```json
{
  "id": "ebook-marketing-digital",
  "titulo": "eBook: Guía Completa de Marketing Digital 2025",
  "precio": 49900,
  "descripcion": "Descarga inmediata. Aprende las estrategias...",
  "imagenes": [
    "url-imagen-1.jpg",
    "url-imagen-2.jpg"
  ],
  "categoria": {
    "nombre": "Productos Digitales",
    "id": "productos-digitales"
  },
  "caracteristicas": [
    "Descarga inmediata en PDF",
    "200+ páginas de contenido",
    "Acceso de por vida"
  ],
  "tipo": "digital",                    // ⬅️ CAMPO CLAVE
  "archivoDescarga": "https://...",     // URL del archivo
  "tamanoArchivo": "25 MB",             // Tamaño (opcional)
  "formato": "PDF"                      // Formato (opcional)
}
```

### Campos del JSON para Productos Físicos:

```json
{
  "id": "producto-fisico",
  "titulo": "Producto Físico",
  "precio": 50000,
  "descripcion": "Descripción...",
  "imagenes": ["..."],
  "categoria": {...},
  "caracteristicas": [...],
  "tipo": "fisico",        // ⬅️ CAMPO CLAVE
  "stock": 25              // Cantidad disponible
}
```

---

## 🔑 Campos Importantes

### Campos Obligatorios (Todos los productos):
- `id` - Identificador único
- `titulo` - Nombre del producto
- `precio` - Precio en número
- `descripcion` - Descripción
- `categoria` - Objeto con nombre e id
- `tipo` - "digital" o "fisico"

### Campos Adicionales para Productos Digitales:
- `archivoDescarga` - URL del archivo (Google Drive, Dropbox, etc.)
- `tamanoArchivo` - Ej: "25 MB", "1.5 GB" (opcional)
- `formato` - Ej: "PDF", "ZIP", "MP4" (opcional)

### Campos Adicionales para Productos Físicos:
- `stock` - Cantidad disponible (número)

---

## 🎨 Diferencias Visuales

### En la Página Principal:

**Producto Físico:**
```
[IMAGEN]
Producto Físico
$50.000
[🛒 Agregar] [👁️]
```

**Producto Digital:**
```
[IMAGEN] 📥 Descarga instantánea
eBook Marketing Digital
$49.900
[💾 Comprar] [👁️]
```

### En la Página de Producto:

**Producto Físico:**
- Muestra stock disponible
- Control de cantidad
- Botón: "Agregar al carrito"

**Producto Digital:**
- Muestra: "Descarga instantánea"
- Sin control de cantidad (siempre 1 licencia)
- Botón: "Agregar al carrito"
- Información adicional: formato, tamaño, garantía

---

## 💻 Implementación Técnica

### 1. Actualizar index.html

Agrega la nueva categoría en el menú:

```html
<li>
    <button id="productos-digitales" class="boton-menu boton-categoria">
        <i class="bi bi-download"></i> Productos Digitales
    </button>
</li>
```

### 2. Actualizar CSS

Agrega al final de `css/main.css`:

```css
.badge-digital {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.4rem 0.8rem;
    border-radius: 2rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.disponible-digital {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.info-producto-digital {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 2rem;
    border-radius: 1rem;
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background-color: white;
    border-radius: 0.75rem;
}

.info-item i {
    font-size: 1.5rem;
    color: #667eea;
}

.info-item strong {
    display: block;
    color: var(--clr-main);
}

.info-item p {
    color: #666;
    font-size: 0.875rem;
}
```

### 3. Reemplazar JavaScript

**Reemplaza estos archivos:**
- `js/main.js` → con el nuevo que incluye lógica digital
- `js/producto-detalle.js` → con el nuevo que soporta digitales

---

## 🔄 Flujo de Compra de Productos Digitales

### 1. Usuario ve el catálogo
- Productos digitales tienen badge "Descarga instantánea"
- Botón dice "Comprar" en lugar de "Agregar"

### 2. Usuario ve detalles del producto
- Información sobre descarga inmediata
- Formato del archivo
- Tamaño del archivo
- Garantía de devolución

### 3. Usuario agrega al carrito
- Se agrega 1 licencia (no se puede aumentar cantidad)
- Notificación: "Producto digital agregado - Descarga tras pago"

### 4. Usuario procede al checkout
- Completa el formulario con sus datos
- Recibe email de confirmación

### 5. Entrega del producto
Tienes **3 opciones** para entregar el producto digital:

---

## 📦 Opciones de Entrega para Productos Digitales

### Opción 1: Envío por Email (Recomendado)

**Pros:**
- Automático
- Seguro
- Rastreable

**Implementación:**

En `carrito.js`, después de una compra exitosa, envía un email con el enlace de descarga:

```javascript
// Email al cliente con enlace de descarga
let emailBody = `Gracias por tu compra, ${nombre}!\n\n`;

// Verificar si hay productos digitales
const productosDigitales = carrito.filter(item => item.tipo === "digital");

if (productosDigitales.length > 0) {
    emailBody += "Enlaces de descarga:\n\n";
    productosDigitales.forEach(item => {
        emailBody += `${item.titulo}:\n`;
        emailBody += `Descarga: ${item.archivoDescarga}\n\n`;
    });
}

emailjs.send("service_id", "template_id", {
    to_email: correo,
    subject: "Tu compra - Enlaces de descarga",
    message: emailBody
});
```

### Opción 2: Google Drive / Dropbox

**Pasos:**

1. Sube tu archivo a Google Drive o Dropbox
2. Obtén el enlace compartible
3. Configura los permisos: "Cualquiera con el enlace puede ver"
4. Usa ese enlace en `archivoDescarga`

**Ejemplo Google Drive:**
```json
"archivoDescarga": "https://drive.google.com/file/d/1ABC123xyz/view?usp=sharing"
```

**Ejemplo Dropbox:**
```json
"archivoDescarga": "https://www.dropbox.com/s/abc123/archivo.zip?dl=1"
```

### Opción 3: Plataforma de Hosting

Usa servicios como:
- **Gumroad** (recomendado para productos digitales)
- **SendOwl**
- **Payhip**
- **Sellfy**

Estos servicios:
- Alojan tus archivos
- Procesan pagos
- Entregan automáticamente
- Protegen contra piratería

---

## 🔐 Seguridad y Protección

### Para Proteger tus Productos Digitales:

1. **Enlaces temporales:**
   - Usa servicios que generen enlaces que expiren
   - Google Drive con permisos temporales

2. **Marca de agua:**
   - Agrega marca de agua con el nombre del comprador
   - Previene compartir no autorizado

3. **Licencias:**
   - Incluye número de licencia único en cada venta
   - Rastrea uso indebido

4. **DRM (opcional):**
   - Para eBooks: usa formatos con DRM como .mobi con Amazon
   - Para software: usa sistemas de activación

---

## 📧 Configurar Email con Enlaces de Descarga

### Plantilla de EmailJS para Productos Digitales:

```
Asunto: Tu compra - Enlaces de descarga ✅

Hola {{to_name}},

¡Gracias por tu compra!

{{#if_digital}}
Puedes descargar tus productos digitales aquí:

{{productos_digitales}}

Importante:
- Los enlaces están disponibles por 7 días
- Descarga los archivos a tu dispositivo
- Si tienes problemas, contáctanos

{{/if_digital}}

{{#if_fisico}}
Tus productos físicos serán enviados a:
{{direccion}}
Tiempo estimado: 3-5 días hábiles
{{/if_fisico}}

Total pagado: {{total}}

¿Necesitas ayuda? Responde este email.

Saludos,
{{from_name}}
```

---

## 🎯 Ejemplos de Productos Digitales

### eBooks:
```json
{
  "id": "ebook-ejemplo",
  "tipo": "digital",
  "formato": "PDF + EPUB",
  "tamanoArchivo": "5 MB",
  "archivoDescarga": "link-a-archivo"
}
```

### Cursos Online:
```json
{
  "id": "curso-ejemplo",
  "tipo": "digital",
  "formato": "Acceso a plataforma",
  "archivoDescarga": "https://tuescuela.com/curso/acceso?token=xxx"
}
```

### Plantillas/Templates:
```json
{
  "id": "plantillas-ejemplo",
  "tipo": "digital",
  "formato": "ZIP (Canva + PSD)",
  "tamanoArchivo": "450 MB",
  "archivoDescarga": "link-a-zip"
}
```

### Software/Plugins:
```json
{
  "id": "plugin-ejemplo",
  "tipo": "digital",
  "formato": "ZIP con instalador",
  "tamanoArchivo": "100 MB",
  "archivoDescarga": "link-a-plugin",
  "caracteristicas": [
    "Incluye clave de licencia",
    "Actualizaciones por 1 año",
    "Soporte técnico incluido"
  ]
}
```

### Música/Audio:
```json
{
  "id": "album-ejemplo",
  "tipo": "digital",
  "formato": "MP3 320kbps + FLAC",
  "tamanoArchivo": "250 MB",
  "archivoDescarga": "link-a-album"
}
```

---

## ✅ Checklist de Implementación

- [ ] Actualizar `index.html` con categoría "Productos Digitales"
- [ ] Agregar estilos CSS para productos digitales
- [ ] Reemplazar `js/main.js`
- [ ] Reemplazar `js/producto-detalle.js`
- [ ] Actualizar `js/productos.json` con productos digitales
- [ ] Subir archivos digitales a hosting (Drive, Dropbox, etc.)
- [ ] Configurar plantilla de email con enlaces de descarga
- [ ] Probar el flujo completo de compra
- [ ] Verificar que los enlaces de descarga funcionen

---

## 🚨 Preguntas Frecuentes

### ¿Puedo mezclar productos físicos y digitales?
✅ Sí, la tienda soporta ambos tipos simultáneamente.

### ¿Los productos digitales se pueden agregar múltiples veces?
✅ Sí, cada vez que se agregan cuenta como una licencia adicional.

### ¿Necesito pagar hosting para los archivos?
Google Drive y Dropbox son gratuitos hasta cierto límite. Para ventas grandes, considera Gumroad o servicios especializados.

### ¿Cómo evito que compartan mis productos?
- Usa enlaces temporales
- Agrega marcas de agua personalizadas
- Incluye términos de uso en la compra
- Monitorea sitios de intercambio de archivos

### ¿Puedo ofrecer actualizaciones?
✅ Sí, actualiza el archivo en el hosting y el mismo enlace tendrá la versión nueva.

---

## 📊 Ventajas de Productos Digitales

✅ Sin inventario físico
✅ Entrega instantánea
✅ Márgenes de ganancia altos
✅ Sin costos de envío
✅ Escalable infinitamente
✅ Automatizable 100%
✅ Alcance global inmediato

---

## 💡 Próximos Pasos

1. Crea tus productos digitales
2. Súbelos a un hosting confiable
3. Actualiza el `productos.json`
4. Configura los emails automáticos
5. ¡Empieza a vender!

---

**Versión:** 2.0 - Soporte Productos Digitales
**Última actualización:** Diciembre 24, 2025

¿Necesitas ayuda? Revisa la documentación o contacta al soporte.
