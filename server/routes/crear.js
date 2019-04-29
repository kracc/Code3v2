const express = require('express');
const router = express.Router();

var proyectos = require('../models/proyecto')

router.get('/crear', (req, res) => {
    res.send('crear levantado');
});

//crear
router.post('/inicio/Ini.html', async(req, res) => {
    const {nombre, descripcion} = req.body;
    const errors=[];
    if(!nombre){
        errors.push({text: 'Es necesario que nombre su proyecto.'});
    }
    if(!descripcion){
        errors.push({text: 'Es necesario dar una descripcion de su proyecto'});
    }
    if(errors.length > 0){
            
    }
    else{
        const newproyectos = new proyectos({nombre , descripcion}); 
        const nuevoProyecto = await newproyectos.save();
        console.log(nuevoProyecto);
        res.redirect('../editor/editor.html');}
    });

 router.get('/inicio/Inicio.html', async (req, res) => {
        // const notes = await proyectos.find();
            console.log('miaus');      
    });

module.exports = router;