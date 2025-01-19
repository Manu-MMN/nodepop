# Nodepop

Nodepop es una aplicación de compraventa de artículos de segunda mano. Utiliza Node.js con Express y MongoDB para gestionar productos y usuarios, permitiendo listar, crear, eliminar y ver productos.

## Requisitos
- Node.js (v20 o superior)
- MongoDB (corriendo en localhost:27017)

## Configuración del Proyecto
1. Instala las dependencias ejecutando `npm install`.
2. Configura la conexión a MongoDB. Asegúrate de que MongoDB está corriendo en `mongodb://127.0.0.1:27017/entrega-practica-nodepop` o actualiza la URL en el archivo `lib/connectMongoose.js` si es necesario.
3. Inicializa la base de datos ejecutando el script `initDB.js` con el comando `node initDB.js`. Este paso cargará datos iniciales en la base de datos, incluyendo algunos usuarios y productos de prueba.

## Arrancar el Proyecto
1. Inicia el servidor en modo desarrollo ejecutando `npm run start:dev` o, en modo producción, ejecuta `npm start`.
2. Abre el navegador o Postman y dirígete a `http://localhost:4444/`.

## Funcionalidades destacadas

### Autenticación con JWT
- **POST /login**  
  Los usuarios pueden iniciar sesión enviando sus credenciales. En la respuesta exitosa, el servidor devuelve un token JWT que debe incluirse en las cabeceras para acceder a los endpoints protegidos.
  - **Body JSON:**
    ```json
    { "email": "user@example.com", "password": "password" }
    ```
  - **Respuesta exitosa:**
    ```json
    { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
    ```
  - El token debe enviarse en las cabeceras de las solicitudes protegidas como:
    ```
    Authorization: Bearer <token>
    ```

### Subida de imágenes
La aplicación permite subir imágenes para los productos a través de un formulario o mediante un campo de texto donde se especifica la URL de la imagen.  
- **Endpoint de creación de producto:**  
  - Si se utiliza un archivo, se debe enviar la imagen como parte del `form-data`.
  - La imagen se guarda en el servidor y se genera una URL pública para acceder a ella.

### Internacionalización (i18n)
- La aplicación soporta múltiples idiomas (actualmente **español** e **inglés**).
- Los textos se traducen dinámicamente según el idioma configurado en las cabeceras de la solicitud (`Accept-Language`).
- Archivos de traducción se encuentran en la carpeta `/locales` y pueden ser extendidos para soportar más idiomas.
- Ejemplo:
  - Solicitud con `Accept-Language: es` devuelve textos en español.
  - Solicitud con `Accept-Language: en` devuelve textos en inglés.

## Endpoints

### Autenticación
- **POST /login**  
  Inicia sesión y devuelve un token JWT.
  - **Body JSON:**
    ```json
    { "email": "user@example.com", "password": "password" }
    ```

### Productos
- **GET /products**  
  Lista los productos del usuario autenticado, con opciones de filtros, paginación y ordenación.
  - **Query Params Opcionales:**
    - `tag` (string): Filtra por tag (work, lifestyle, motor, mobile).
    - `price` (string): Rango de precio (por ejemplo, 10-50, 10-, -50, 50).
    - `name` (string): Filtra productos cuyo nombre empieza con el valor especificado.
    - `skip` (number): Número de productos a omitir para paginación.
    - `limit` (number): Número de productos a mostrar.
    - `sort` (string): Campo por el que ordenar los productos (por ejemplo, price, name).

- **POST /products**  
  Crea un nuevo producto para el usuario autenticado.
  Al usar postman, para introducir los tags en el form dara, tendrá que ser separados por coma y sin espacio

  - **Body JSON:**
    ```json
    { "name": "Laptop", "price": 500, "image": "laptop.jpg", "tags": ["work", "mobile"] }
    ```
  - Si se sube una imagen, utiliza `form-data` con los campos:
    - `name`: Nombre del producto.
    - `price`: Precio del producto.
    - `tags`: Tags del producto.
    - `image`: Archivo de imagen.
  - **Respuesta exitosa:**
    ```json
    { "message": "Producto creado exitosamente", "product": { "_id": "601a1f8e8f1b2a0017a6a8f1", "name": "Laptop", "price": 500, "image": "/uploads/laptop.jpg", "tags": ["work", "mobile"] } }
    ```

- **DELETE /products/:id**  
  Elimina un producto específico del usuario autenticado.
  - **Parámetro de ruta:** `id` (ID del producto).

- **GET /products/:id**  
  Muestra los detalles de un producto específico si el usuario autenticado es el propietario.
  - **Parámetro de ruta:** `id` (ID del producto).

- **GET /products/page/ui**  
  Muestra la página de inicio con la lista de productos renderizada con EJS. Se pueden aplicar filtros, paginación y ordenación usando query params.

## Notas
- La aplicación utiliza **JWT** para el manejo de autenticación.
- Las imágenes subidas se almacenan en la carpeta `/uploads`, que debe ser creada si no existe.
- Se incluyen traducciones dinámicas para mejorar la experiencia del usuario.
- ESLint está configurado para mantener un estilo de código consistente y evitar errores comunes.
