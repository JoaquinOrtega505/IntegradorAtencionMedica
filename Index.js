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





app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
//app.set ('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Para poder leer el cuerpo de las solicitudes POST como JSON


app.use(express.urlencoded({ extended: true }));
//app.use(router);




const secret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secret, 
    resave: false,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 30 * 60 * 1000 
    }
}));




app.get('/', (req, res) => {
    res.render('index');  // Renderiza la vista index.pug
});

/*app.get('/agenda', (req, res) => {
  res.render('agenda'); // Renderiza la vista agenda.pug
});*/

/*app.get('/login', (req, res) => {
    res.render('login'); 
  });*/

app.use('/', loginRoutes); // Usar las rutas de login
app.use('/', agendaRoutes); // Usar las rutas de agenda
app.use('/', configuracionAgendaRoutes);
app.use('/', atenciionMedicaRoutes);
app.use('/', alergiasRoutes);
app.use('/', hceRoutes);
app.use ('/', turnosRoutes);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    app.use('/', hceRoutes);

app.listen(3000, ()=>{
    console.log('app en puerto 3000');
});