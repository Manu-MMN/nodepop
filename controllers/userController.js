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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Contraseña incorrecta');
        }

        // Guardar el usuario en la sesión (si estás usando sesiones)
        req.session.user = user;
        res.redirect('/'); // Redirigir a la página principal o la deseada
    } catch (error) {
        next(error);
    }
};
