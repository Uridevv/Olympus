// Local Dev

import { connectDB } from './db.js'
import app from './app.js'
import { PORT } from './config.js'

//Conectar a mongoDB.
connectDB();

//Ejecutar app Expressjs.
app.listen(PORT);
console.log(`Server on port ${PORT}`)