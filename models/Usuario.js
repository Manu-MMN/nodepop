import mongoose, {Schema} from 'mongoose';

//definimos el esquema de usuario
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true},
    name: {type: String},
    phone: {type: Number},
    birth: {type: Date}
})

const User = mongoose.model('User', userSchema)

export default User

