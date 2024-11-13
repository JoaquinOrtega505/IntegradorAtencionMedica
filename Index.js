const express = require('express');
const app = express();
const session = require('express-session');
const crypto = require ('crypto');
const path = require('path');
const pug = require('pug');
const mysql = require('mysql2');
const db = require('./Controllers/coneccionBD');
const loginRoutes = require('./Routes/login'); // Importar rutas de login
const agendaRoutes = require('./Routes/agenda'); // Importar rutas de agenda
const configuracionAgendaRoutes = require('./Routes/configuracion_Agenda');
const atenciionMedicaRoutes = require('./Routes/atencionMedica');
const hceRoutes = require('./Routes/hce');
const alergiasRoutes = require('./Routes/alergias');
const turnosRoutes = require('./Routes/turnos');
require('dotenv').config();
const RedisStore = require('connect-redis').default(session);
const redis = require('redis');








app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')




app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para poder leer el cuerpo de las solicitudes POST como JSON


app.use(express.urlencoded({ extended: true }));
//app.use(router);

const redisClient = redis.createClient({
    host: 'localhost', // Cambia esto según la configuración de tu Redis
    port: 6379
  });


const secret = crypto.randomBytes(64).toString('hex');

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: secret, 
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 30 * 60 * 1000 
    }
}));




app.get('/index', (req, res) => {
    res.render('index');  // Renderiza la vista index.pug
});



app.use('/', loginRoutes); // Usar las rutas de login
app.use('/', agendaRoutes); // Usar las rutas de agenda
app.use('/', configuracionAgendaRoutes);
app.use('/', atenciionMedicaRoutes);
app.use('/', alergiasRoutes);
app.use('/', hceRoutes);
app.use ('/', turnosRoutes);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    app.use('/', hceRoutes);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
//app.listen(3000, ()=>{
//    console.log('app en puerto 3000');
//});