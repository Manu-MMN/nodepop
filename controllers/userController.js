import User from '../models/Usuario.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//funcion para mostrar el formulario de login

export const showLoginForm = (req, res) => {
    const email = req.body.email || req.body.username;
    res.render('login', { email, error: null }); 
};

// Función de autenticación
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {


        // Buscar al usuario en la base de datos
        const user = await User.findOne({ email });
        console.log("Usuario encontrado:", user);
        if (!user) {
            return res.status(401).send('Usuario no encontrado');
        }

        // Comparar la contraseña
        const isMatch = password === user.password;


        if (!isMatch) {
            return res.status(401).send('Contraseña incorrecta');
         
        }

        req.session.userId = user._id; // <-- Aquí se establece la sesión

        // Guardar el usuario en la sesión (si estás usando sesiones)

        const tokenJWT = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: "4d"})
        // establecemos una cookie con el token JWT

        //revisamos si el cliente espera JSON
        if (req.headers["accept"] === "application/json") {
            return res.status(200).json({ token: tokenJWT})
        }

        res.cookie("token", tokenJWT, { httpOnly: true, secure: false});

        res.redirect("/");

    } catch(error){
        next(error)
    }
};

export const logout = (req, res) => {
    req.session.destroy((err) =>{
        if (err) {
            console.error("Error al cerrar sesión:", err);
            return res.status(500).send("No se pudo derrar la sesión")
        }
        res.redirect("/"); 
    })
}
