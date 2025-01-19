import 'dotenv/config'
import { join } from 'node:path'
import express from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import session from 'express-session'

import indexrouter from './routes/index.js'
import usersRouter from './routes/users.js'
import productRouter from './routes/products.js'
import connectMongoose from './lib/conect-mongoose.js'; // Importar la función de conexión
import i18n from "./lib/i18nConfigure.js"
import * as languageController from "./controllers/languageController.js"


// Importar el modelo de producto
await connectMongoose()
console.log("conectado a mongoDB")

const app = express()




// view engine setup
app.set('views', join(import.meta.dirname, 'views'))
app.set('view engine', 'ejs')

// middlewares

// morgan logger for http requests logs
app.use(logger('dev'))
// transforms json objects into js objects
app.use(express.json())
// cookie parser to get cookies from client
app.use(cookieParser())
// transforms data sent by a form to a js object
app.use(express.urlencoded({ extended: true }))
// set the folder where statis resources will be served
app.use(express.static(join(import.meta.dirname, 'public')))

app.use(i18n.init)
app.get("/change-locale/:locale", languageController.changeLocale)
//configuración de sesiones

app.use(session({
  secret: 'mi_clave_secreta',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// middleware para las variables globales en vistas

app.use((req, res, next)=>{
  res.locals.appName = "Nodepop";
  res.locals.session = req.session;  // así session estará disponible en las vistas
  next();
})

// Routing

// homepage


app.use('/', indexrouter)
// user page
app.use('/', usersRouter)

app.use('/products', productRouter)
app.use('/products/new', productRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app;
