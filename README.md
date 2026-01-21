# 🛍️ ArtTricolor - Tienda Virtual

Tienda virtual moderna y responsive desarrollada con HTML, CSS y JavaScript vanilla. Sistema de carrito de compras funcional con LocalStorage y páginas de producto dinámicas.

## ✨ Características

- 🎨 Diseño moderno y responsive (móvil, tablet, desktop)
- 🖼️ Galería de imágenes con zoom
- 🛒 Sistema de carrito de compras funcional
- 📱 Plantilla dinámica para productos (sin necesidad de crear HTML manualmente)
- 💾 Persistencia de datos con LocalStorage
- 🔍 Filtrado por categorías
- 📧 Sistema de envío de pedidos por email (EmailJS)
- ⚡ Notificaciones interactivas (Toastify)
- 🎯 Badges de stock y disponibilidad

## 📁 Estructura del Proyecto

```
mitienda-ya/
│
├── index.html              # Página principal con catálogo
├── producto.html           # Plantilla dinámica para productos
├── carrito.html           # Página del carrito de compras
│
├── css/
│   ├── main.css           # Estilos principales
│   └── producto.css       # Estilos página de producto
│
├── js/
│   ├── main.js            # Lógica catálogo de productos
│   ├── producto-detalle.js # Lógica página de producto
│   ├── carrito.js         # Lógica del carrito
│   ├── menu.js            # Lógica menú móvil
│   └── productos.json     # Base de datos de productos
│
└── img/                   # Imágenes de productos
```

## 🚀 Instalación y Uso

### Opción 1: GitHub Pages (Recomendado)

1. **Sube el proyecto a GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/mitienda-ya.git
   git push -u origin main
   ```

2. **Activa GitHub Pages:**
   - Ve a Settings → Pages
   - En "Source", selecciona la rama `main`
   - Haz clic en "Save"
   - Tu sitio estará disponible en: `https://TU-USUARIO.github.io/mitienda-ya/`

### Opción 2: Local

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/mitienda-ya.git
   ```

2. Abre `index.html` en tu navegador o usa un servidor local:
   ```bash
   # Con Python 3
   python -m http.server 8000
   
   # Con Node.js (npx)
   npx serve
   ```

## 📝 Cómo Agregar Productos

No necesitas crear páginas HTML individuales para cada producto. Simplemente edita el archivo `js/productos.json`:

```json
{
  "id": "id-unico-del-producto",
  "titulo": "Nombre del Producto",
  "precio": 50000,
  "descripcion": "Descripción detallada del producto",
  "imagenes": [
    "url-imagen-1.jpg",
    "url-imagen-2.jpg",
    "url-imagen-3.jpg"
  ],
  "categoria": {
    "nombre": "Nombre Categoría",
    "id": "id-categoria"
  },
  "caracteristicas": [
    "Característica 1",
    "Característica 2"
  ],
  "stock": 10
}
```

### Campos obligatorios:
- `id`: Identificador único (sin espacios, usa guiones)
- `titulo`: Nombre del producto
- `precio`: Precio en número (sin símbolos)
- `descripcion`: Descripción del producto
- `categoria`: Objeto con nombre e id de la categoría
- `stock`: Cantidad disponible

### Campos opcionales:
- `imagenes`: Array de URLs de imágenes (si no se proporciona, usa la primera)
- `caracteristicas`: Array de características destacadas

## 🔧 Configuración EmailJS

Para que funcione el envío de pedidos por email:

1. Crea una cuenta en [EmailJS](https://www.emailjs.com/)
2. Configura un servicio de email
3. Crea una plantilla de email
4. En `carrito.js`, actualiza:
   ```javascript
   emailjs.init("TU_PUBLIC_KEY");
   
   emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
     // parámetros
   });
   ```

## 🎨 Personalización

### Colores
Edita las variables CSS en `css/main.css`:
```css
:root {
    --clr-main: #0e1623;        /* Color principal */
    --clr-main-light: #172337;  /* Color principal claro */
    --clr-white: #ececec;       /* Color blanco */
    --clr-gray: #e2e2e2;        /* Color gris */
    --clr-red: #961818;         /* Color rojo (eliminar) */
}
```

### Logo y Nombre
Busca "ArtTricolor" en los archivos HTML y reemplázalo con tu nombre.

## 📱 Funcionalidades

### Página Principal (index.html)
- Muestra todos los productos
- Filtrado por categorías
- Agregar productos al carrito
- Ver detalles del producto (clic en imagen o botón de ojo)
- Badges de stock bajo y productos agotados

### Página de Producto (producto.html)
- Galería de imágenes con miniaturas
- Zoom de imagen en modal
- Control de cantidad
- Agregar al carrito
- Comprar ahora (agrega y va al carrito)
- Información detallada del producto
- Secciones desplegables

### Carrito de Compras (carrito.html)
- Lista de productos agregados
- Modificar cantidades
- Eliminar productos
- Vaciar carrito completo
- Ver total
- Formulario de checkout con envío de email

## 🌐 Responsive Design

La tienda está optimizada para:
- 📱 Móviles (< 600px)
- 📱 Tablets (600px - 992px)
- 💻 Desktop (> 992px)

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Grid, Flexbox, Animations)
- JavaScript ES6+
- LocalStorage API
- Bootstrap Icons
- Toastify.js (notificaciones)
- SweetAlert2 (alertas)
- EmailJS (envío de emails)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

## 👨‍💻 Autor

ArtTricolor - 2025

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
