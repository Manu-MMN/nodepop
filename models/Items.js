import mongoose from 'mongoose'

// definir el esquema de los items
const productSchema = mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  price: Number,
  image: String,
  tags: [String],
});

// creamos el modelo de Productos
const Product = mongoose.model('Product', productSchema)

export default Product