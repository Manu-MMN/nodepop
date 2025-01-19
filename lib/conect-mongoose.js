import mongoose from 'mongoose'

mongoose.connection.on('error', err => {
    console.log('Error de conexión', err)
  })
  export default function connectMongoose() {
    return mongoose.connect('mongodb://127.0.0.1:27017/entrega-practica-nodepop')
    .then(mongoose => mongoose.connection)
  }


  export async function dropDatabase() {
    try {
      await mongoose.connection.dropDatabase();
      console.log('Base de datos eliminada');
    } catch (err) {
      console.error('Error al eliminar la base de datos:', err);
    }
  }

  export async function closeConnection() {
    try {
      await mongoose.disconnect();
      console.log('Conexión a MongoDB cerrada');
    } catch (error) {
      console.error('Error al cerrar la conexión a MongoDB:', error);
    }
  }