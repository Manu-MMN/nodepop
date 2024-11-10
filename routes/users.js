import { Router } from 'express'
const router = Router()
import { login } from '../controllers/userController.js'

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})




//Ruta del login

router.post('/login', login);


export default router