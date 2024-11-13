const express = require('express');
const router = express.Router();
const db = require('../Controllers/coneccionBD');
const hce = require('../Controllers/hce');

/*router.get('/hce', (req, res) => {
    res.render('hce'); 
});*/

router.get('/hce/:id_paciente', hce.verHistoriaClinica);


module.exports = router;