import { Router } from 'express'
const router = Router()
import { login, showLoginForm } from '../controllers/userController.js'


//Ruta para acceder al formulario
router.get('/login', showLoginForm);

//Ruta para  manejar el login

router.post('/login', login);


export default router