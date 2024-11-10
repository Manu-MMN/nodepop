import mongoose from 'mongoose';

//definimos el esquema de usuario
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

const User = mongoose.model('User', userSchema)

export default User

