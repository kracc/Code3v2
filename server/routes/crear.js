const express = require('express');
const router = express.Router();

var proyectos = require('../models/carpeta');

router.get('/nueva-carpeta', (req, res) => {
    res.render(Ini);
    
})


module.exports = router;