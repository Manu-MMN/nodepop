import User from '../models/Usuario.js'; // Asegúrate de que la ruta sea correcta
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';

// Función de autenticación
export const login = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        // Buscar al usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }

        // Comparar la contraseña
        const isMatch = password === user.password;
        if (!isMatch) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Guardar el usuario en la sesión (si estás usando sesiones)
        const jwtSecret = process.env.JWT_SECRET
        console.log(jwtSecret)
        jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "4d"
        }, (err, tokenJWT) => {    //con este callback lo hacemos asíncrono
            if (err) {
                next(err)
                return
            }
            res.json({ tokenJWT })
        })
    } catch (error) {
        next(error);
    }
};
