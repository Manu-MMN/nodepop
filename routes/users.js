import { Router } from 'express'
const router = Router()
import { login, showLoginForm, logout } from '../controllers/userController.js'


//Ruta para acceder al formulario
router.get('/login', showLoginForm);

//Ruta para  manejar el login

router.post('/login', login);

//Ruta para manejar el logout
router.get("/logout", logout);


export default router