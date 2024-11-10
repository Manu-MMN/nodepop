import { Router } from 'express'
const router = Router()
import { login } from '../controllers/userController.js'


//Ruta del login

router.post('/login', login);


export default router