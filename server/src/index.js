// Local Dev

import { connectDB } from './db.js'
import app from './app.js'
import { PORT } from './config.js'
import { revertExpiredOffers } from './libs/offerExpiration.js'

//Conectar a mongoDB.
connectDB();

//Ejecutar app Expressjs.
app.listen(PORT);
console.log(`Server on port ${PORT}`)

// Revisar periódicamente si alguna oferta expiró para restaurar el precio original de los productos.
setInterval(() => {
    revertExpiredOffers().catch(err => console.error('Error revirtiendo ofertas expiradas:', err));
}, 60 * 1000);