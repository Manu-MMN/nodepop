import User from '../models/Usuario.js'; // Asegúrate de que la ruta sea correcta
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
        req.session.userId = user._id;
        res.json({ message: 'Inicio de sesión exitoso' }); // Redirigir a la página principal o la deseada
    } catch (error) {
        next(error);
    }
};
