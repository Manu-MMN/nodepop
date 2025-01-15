import User from '../models/Usuario.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//funcion para mostrar el formulario de login

export const showLoginForm = (req, res) => {
    const email = req.body.email || req.body.username;
    res.render('login', { email, error: null }); 
    console.log("primer email", email)
};

// Función de autenticación
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    console.log("body recibido", req.body)
    try {
        console.log("EMAIL", email)
        console.log("PASSWORD", password)

        // Buscar al usuario en la base de datos
        const user = await User.findOne({ email });
        console.log("Usuario encontrado:", user);
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }

        // Comparar la contraseña
        const isMatch = password === user.password;
        console.log("Email", email)
        console.log("Password", password)

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
