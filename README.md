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

## Endpoints

### Autenticación
- **POST /login**  
  Permite que los usuarios inicien sesión enviando sus credenciales.
  - **Body JSON:**
    ```json
    { "email": "user@example.com", "password": "password" }
    ```
  - **Respuesta exitosa:**
    ```json
    { "message": "Inicio de sesión exitoso" }
    ```

- **GET /logout**  
  Cierra la sesión actual del usuario.

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
  - **Body JSON:**
    ```json
    { "name": "Laptop", "price": 500, "image": "laptop.jpg", "tags": ["work", "mobile"] }
    ```
  - **Respuesta exitosa:**
    ```json
    { "message": "Producto creado exitosamente", "product": { "_id": "601a1f8e8f1b2a0017a6a8f1", "name": "Laptop", "owner": "6730cbec6f6c53c14b842ffa", "price": 500, "image": "laptop.jpg", "tags": ["work", "mobile"] } }
    ```

- **DELETE /products/:id**  
  Elimina un producto específico del usuario autenticado.
  - **Parámetro de ruta:** `id` (ID del producto)

- **GET /products/:id**  
  Muestra los detalles de un producto específico si el usuario autenticado es el propietario.
  - **Parámetro de ruta:** `id` (ID del producto)

- **GET /products/page/ui**  
  Muestra la página de inicio con la lista de productos renderizada con EJS. Se pueden aplicar filtros, paginación y ordenación usando query params.

## Notas
- La aplicación utiliza sesiones (sessions) para el manejo de autenticación.
- ESLint está configurado para mantener un estilo de código consistente y evitar errores comunes.
