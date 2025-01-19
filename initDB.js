import connectMongoose, {dropDatabase, closeConnection} from './lib/conect-mongoose.js'; // Importar la función de conexión
import Product from './models/Items.js';
import User from './models/Usuario.js';
import fs from 'fs/promises';

await connectMongoose()

async function initDB() {
  try {
    await dropDatabase();

    // Crear usuarios iniciales
    const users = await User.insertMany([
      { name: 'Alice', email: 'alice@example.com', password: 'password1' },
      { name: 'Bob', email: 'bob@example.com', password: 'password2' },
      { name: 'Charlie', email: 'charlie@example.com', password: 'password3' },
      { name: 'Dave', email: 'dave@example.com', password: 'password4' },
      { name: 'Eve', email: 'eve@example.com', password: 'password5' },
      { name: 'Frank', email: 'frank@example.com', password: 'password6' },
      { name: 'Grace', email: 'grace@example.com', password: 'password7' },
      { name: 'Heidi', email: 'heidi@example.com', password: 'password8' },
      { name: 'Ivan', email: 'ivan@example.com', password: 'password9' },
      { name: 'Judy', email: 'judy@example.com', password: 'password10' },
    ]);

    console.log('Usuarios creados:', users);

    const data = await fs.readFile(new URL('./data/products.json', import.meta.url));
    const productsData = JSON.parse(data);

    // Asignar un propietario a cada producto
    const products = productsData.map((product, index) => {
        const owner = users[index % users.length]._id; // Asignación circular de propietarios
        return { ...product, owner };
      });

    await Product.insertMany(products);
    console.log('Productos creados con propietarios:', products);

    console.log('Base de datos inicializada exitosamente.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    closeConnection();
  }
}

initDB();