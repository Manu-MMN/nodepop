import mongoose from 'mongoose';

// Definimos el esquema de usuario
const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
});

// Creación del modelo
const User = mongoose.model('User', userSchema);

export default User;
