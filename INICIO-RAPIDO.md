# 🚀 Guía Rápida de Inicio

## Paso 1: Subir a GitHub

```bash
# Inicializa el repositorio
git init

# Agrega todos los archivos
git add .

# Primer commit
git commit -m "Tienda virtual MiTienda Yá v1.0"

# Crea la rama principal
git branch -M main

# Conecta con tu repositorio de GitHub (cambia TU-USUARIO y NOMBRE-REPO)
git remote add origin https://github.com/TU-USUARIO/NOMBRE-REPO.git

# Sube los archivos
git push -u origin main
```

## Paso 2: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Clic en **Settings** (Configuración)
3. En el menú lateral, clic en **Pages**
4. En **Source**, selecciona la rama `main`
5. Carpeta: `/ (root)`
6. Clic en **Save**
7. ¡Espera 1-2 minutos y tu sitio estará en línea!

Tu URL será: `https://TU-USUARIO.github.io/NOMBRE-REPO/`

## Paso 3: Configurar EmailJS (Opcional)

Para recibir pedidos por email:

1. Regístrate en https://www.emailjs.com/
2. Crea un servicio de email (Gmail, Outlook, etc.)
3. Crea una plantilla de email
4. Copia tu Public Key, Service ID y Template ID
5. Edita `js/carrito.js` líneas 146-156:
   ```javascript
   emailjs.init("TU_PUBLIC_KEY_AQUI");
   
   emailjs.send("TU_SERVICE_ID", "TU_TEMPLATE_ID", {
       // parámetros
   });
   ```

## Paso 4: Agregar Productos

Edita el archivo `js/productos.json` y agrega tus productos:

```json
{
  "id": "mi-nuevo-producto",
  "titulo": "Mi Nuevo Producto",
  "precio": 99000,
  "descripcion": "Descripción del producto",
  "imagenes": [
    "https://ejemplo.com/imagen1.jpg",
    "https://ejemplo.com/imagen2.jpg"
  ],
  "categoria": {
    "nombre": "Mi Categoría",
    "id": "mi-categoria"
  },
  "caracteristicas": [
    "Característica 1",
    "Característica 2"
  ],
  "stock": 20
}
```

## Paso 5: Personalizar

### Cambiar colores:
Edita `css/main.css` líneas 3-9

### Cambiar nombre de la tienda:
Busca y reemplaza "MiTienda Yá" en todos los archivos HTML

### Agregar tu logo:
Puedes reemplazar el texto del logo con una imagen en los archivos HTML

## Problemas Comunes

### Las imágenes no se ven
- Verifica que las URLs de las imágenes sean correctas
- Usa URLs completas (https://...)
- O sube las imágenes a la carpeta `img/` y usa rutas relativas: `./img/nombre.jpg`

### El carrito no guarda productos
- Verifica que JavaScript esté habilitado en el navegador
- Revisa la consola del navegador (F12) para ver errores

### No recibo emails
- Verifica la configuración de EmailJS
- Revisa que hayas copiado correctamente los IDs
- Comprueba la consola del navegador para errores

## Soporte

Si tienes problemas, abre un issue en GitHub o contacta al desarrollador.

---

¡Listo! Tu tienda ya está funcionando 🎉
