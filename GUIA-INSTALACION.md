# 📋 Guía Completa de Instalación - MiTienda Yá

## 📦 Contenido del Paquete

Has recibido una tienda virtual completa con:
- ✅ Sistema de catálogo de productos
- ✅ Páginas de producto dinámicas (plantilla única)
- ✅ Carrito de compras funcional
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Galería de imágenes con zoom
- ✅ Sistema de notificaciones
- ✅ Persistencia con LocalStorage

---

## 🚀 OPCIÓN 1: Publicar en GitHub Pages (RECOMENDADO)

### Paso 1: Preparar el proyecto

1. Descarga y descomprime el archivo `mitienda-ya.zip`
2. Tendrás una carpeta llamada `mitienda-ya` con esta estructura:

```
mitienda-ya/
├── index.html          ← Página principal
├── producto.html       ← Plantilla de productos
├── carrito.html        ← Carrito de compras
├── css/               
│   ├── main.css
│   └── producto.css
├── js/
│   ├── main.js
│   ├── producto-detalle.js
│   ├── carrito.js
│   ├── menu.js
│   └── productos.json  ← AQUÍ AGREGAS TUS PRODUCTOS
└── img/               ← AQUÍ AGREGAS TUS IMÁGENES
```

### Paso 2: Crear cuenta en GitHub (si no tienes)

1. Ve a https://github.com
2. Haz clic en "Sign up"
3. Completa el registro (usa tu email real)
4. Verifica tu email

### Paso 3: Crear un nuevo repositorio

1. En GitHub, haz clic en el botón verde "New" (nuevo)
2. Nombre del repositorio: `mitienda-ya` (o el que prefieras)
3. Selecciona "Public" (público)
4. NO marques "Add README"
5. Haz clic en "Create repository"

### Paso 4: Subir archivos

**Opción A - Desde la interfaz web (más fácil):**

1. En la página de tu repositorio, haz clic en "uploading an existing file"
2. Arrastra TODOS los archivos y carpetas de tu proyecto
3. Escribe un mensaje: "Primera versión de MiTienda Yá"
4. Haz clic en "Commit changes"

**Opción B - Con Git (recomendado para actualizaciones futuras):**

```bash
# Abre la terminal/línea de comandos en la carpeta del proyecto

# Inicializa git
git init

# Agrega todos los archivos
git add .

# Hace el primer commit
git commit -m "Primera versión de MiTienda Yá"

# Configura la rama principal
git branch -M main

# Conecta con GitHub (cambia TU-USUARIO y tu-repositorio)
git remote add origin https://github.com/TU-USUARIO/tu-repositorio.git

# Sube los archivos
git push -u origin main
```

### Paso 5: Activar GitHub Pages

1. En tu repositorio, ve a "Settings" (⚙️ arriba a la derecha)
2. En el menú izquierdo, busca y haz clic en "Pages"
3. En "Source", selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
4. Haz clic en "Save"
5. **¡Espera 1-2 minutos!** GitHub está preparando tu sitio
6. Refresca la página y verás un mensaje con tu URL:
   
   ```
   Your site is published at https://TU-USUARIO.github.io/tu-repositorio/
   ```

7. Haz clic en esa URL para ver tu tienda ¡EN VIVO! 🎉

---

## 💻 OPCIÓN 2: Probarlo localmente

### Para Windows:

1. Descarga XAMPP: https://www.apachefriends.org/
2. Instala XAMPP
3. Abre XAMPP Control Panel
4. Inicia "Apache"
5. Copia la carpeta `mitienda-ya` a `C:\xampp\htdocs\`
6. Abre tu navegador y ve a: `http://localhost/mitienda-ya/`

### Para Mac/Linux:

**Opción 1 - Con Python (más fácil):**
```bash
# Ve a la carpeta del proyecto
cd ruta/a/mitienda-ya

# Python 3
python3 -m http.server 8000

# Abre: http://localhost:8000
```

**Opción 2 - Con Node.js:**
```bash
# Instala el servidor
npx serve

# Abre la URL que te muestre
```

---

## ✏️ Personalizar tu Tienda

### 1. Agregar/Editar Productos

Abre el archivo `js/productos.json` y edita:

```json
[
  {
    "id": "producto-ejemplo",
    "titulo": "Nombre del Producto",
    "precio": 50000,
    "descripcion": "Descripción completa del producto",
    "imagenes": [
      "https://ejemplo.com/imagen1.jpg",
      "https://ejemplo.com/imagen2.jpg"
    ],
    "categoria": {
      "nombre": "Tecnología",
      "id": "tecnologia"
    },
    "caracteristicas": [
      "Característica 1",
      "Característica 2"
    ],
    "stock": 10
  }
]
```

**Importante:**
- `id`: debe ser único, sin espacios (usa guiones)
- `precio`: número sin símbolos ni comas
- `imagenes`: puede ser un array de URLs o una sola imagen
- `stock`: cantidad disponible (0 = agotado)

### 2. Agregar Categorías

Para agregar una nueva categoría:

1. En `index.html`, busca la sección del menú
2. Agrega un nuevo botón:

```html
<li>
    <button id="mi-categoria" class="boton-menu boton-categoria">
        <i class="bi bi-star-fill"></i> Mi Nueva Categoría
    </button>
</li>
```

3. En `productos.json`, usa ese mismo id:

```json
"categoria": {
    "nombre": "Mi Nueva Categoría",
    "id": "mi-categoria"
}
```

### 3. Cambiar Colores

Abre `css/main.css` y modifica las primeras líneas:

```css
:root {
    --clr-main: #0e1623;        /* Color principal (azul oscuro) */
    --clr-main-light: #172337;  /* Tono más claro */
    --clr-white: #ececec;       /* Color claro */
    --clr-gray: #e2e2e2;        /* Color gris */
    --clr-red: #961818;         /* Color de eliminar */
}
```

Usa herramientas como https://coolors.co/ para elegir colores.

### 4. Cambiar el Nombre

Busca "MiTienda Yá" en:
- `index.html`
- `producto.html`
- `carrito.html`

Y reemplázalo con tu nombre.

### 5. Agregar tu Logo

Reemplaza `<h1 class="logo">MiTienda Yá</h1>` con:

```html
<img src="./img/logo.png" alt="Mi Tienda" class="logo">
```

---

## 📧 Configurar Envío de Emails (Opcional)

Para recibir pedidos por email:

### Paso 1: Crear cuenta en EmailJS

1. Ve a https://www.emailjs.com/
2. Registrate gratis
3. Verifica tu email

### Paso 2: Configurar servicio

1. En EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Elige tu proveedor (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu email
5. Copia el **Service ID**

### Paso 3: Crear plantilla

1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Diseña tu plantilla con estas variables:
   - `{{to_name}}` - Nombre del destinatario
   - `{{from_name}}` - Nombre del cliente
   - `{{from_email}}` - Email del cliente
   - `{{message}}` - Detalles del pedido
4. Copia el **Template ID**

### Paso 4: Actualizar el código

1. Abre `js/carrito.js`
2. Busca la línea 146: `emailjs.init("dE5hbDtP0q7v-chkh");`
3. Reemplaza con tu Public Key:
   ```javascript
   emailjs.init("TU_PUBLIC_KEY_AQUI");
   ```

4. Busca las líneas 158 y 167 con `emailjs.send`
5. Reemplaza los IDs:
   ```javascript
   emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
       to_name: "Tu Nombre",
       to_email: "tuemail@ejemplo.com",
       from_name: nombre,
       from_email: correo,
       message: body,
   });
   ```

---

## 🔄 Actualizar tu Sitio

Cada vez que hagas cambios:

**Si usas GitHub Pages:**
```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Espera 1-2 minutos y los cambios estarán en línea.

---

## ⚠️ Solución de Problemas

### Las imágenes no se ven

**Problema:** URLs rotas o incorrectas

**Solución:**
1. Usa URLs completas: `https://ejemplo.com/imagen.jpg`
2. O sube imágenes a `/img/` y usa: `./img/imagen.jpg`
3. Verifica que las URLs funcionen en el navegador

### El carrito no funciona

**Problema:** JavaScript bloqueado

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que las rutas de los archivos JS sean correctas
4. Comprueba que no haya bloqueadores de ads/scripts

### Los productos no aparecen

**Problema:** Error en productos.json

**Solución:**
1. Valida tu JSON en: https://jsonlint.com/
2. Verifica que todos los campos estén correctos
3. Revisa que no falten comas o llaves

### GitHub Pages no se actualiza

**Problema:** Caché del navegador

**Solución:**
1. Espera 2-3 minutos después de hacer push
2. Refresca con Ctrl+F5 (Windows) o Cmd+Shift+R (Mac)
3. Prueba en modo incógnito
4. Verifica en Settings → Pages que esté activado

---

## 📱 Probar en Dispositivos Móviles

### Desde tu computadora:

1. Abre Chrome DevTools (F12)
2. Haz clic en el ícono de dispositivo (Ctrl+Shift+M)
3. Selecciona diferentes tamaños de pantalla

### En tu teléfono:

Si usas GitHub Pages, simplemente abre la URL en tu móvil.

Si es local, necesitas:
1. Conectar PC y móvil a la misma WiFi
2. Encuentra tu IP local:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`
3. En el móvil, abre: `http://TU-IP:8000`

---

## 🎨 Recursos Útiles

### Imágenes gratuitas:
- https://unsplash.com/
- https://pexels.com/
- https://pixabay.com/

### Iconos:
- https://icons.getbootstrap.com/ (ya incluido)
- https://fontawesome.com/

### Colores:
- https://coolors.co/
- https://colorhunt.co/

### Fuentes:
- https://fonts.google.com/

---

## 📞 Soporte

Si tienes problemas:

1. Revisa esta guía completa
2. Busca el error en Google
3. Revisa la consola del navegador (F12)
4. Contacta al desarrollador

---

## ✅ Checklist Final

Antes de publicar, verifica:

- [ ] Todos los productos tienen imágenes válidas
- [ ] Los precios son correctos
- [ ] Las categorías funcionan
- [ ] El carrito agrega y elimina productos
- [ ] Las páginas de producto se abren correctamente
- [ ] El diseño se ve bien en móvil
- [ ] Los colores representan tu marca
- [ ] El nombre de la tienda está actualizado
- [ ] EmailJS está configurado (si lo usas)
- [ ] Has probado hacer una compra de prueba

---

¡Felicitaciones! Tu tienda está lista para recibir clientes 🎉

**URL de tu tienda:** https://TU-USUARIO.github.io/tu-repositorio/

Comparte este enlace en:
- WhatsApp
- Instagram
- Facebook
- Tarjetas de presentación
- Firma de email

---

Desarrollado con ❤️ para tu negocio
