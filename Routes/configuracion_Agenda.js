const express = require('express');
const router = express.Router();
const db = require('../Controllers/coneccionBD');

router.get('/configuracion_Agenda', (req, res) => {
    res.render('configuracion_Agenda'); 
});


module.exports = router;