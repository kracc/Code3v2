const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
//ruta del modelo
const Carpeta = require('../models/carpeta');
const {verificarAutenticacion} = require('./middlewares')

router.post('/nueva-carpeta', (req, res) => {
    var nombre = req.body.nombre;
    var id = req.session._id;
    var carpeta = new Carpeta({nombre: nombre, propietario: id})

    carpeta.save((err, carpetaCreada) => {
        if (err) {
            console.log(err);
         
            return res.send({
                err
            })
        }
        console.log(carpetaCreada);
        return res.send({
            carpeta:carpetaCreada,
            mensaje: 'El carpeta se guardo Exitosamente'
        })
    })

    
});

router.get('/obtener-carpetas', async(req, res) => {
    var id = req.session._id;
    //para hacer multiples condiciones debe usarse el operador '$and + [condiciones]'
    var carpetas = await Carpeta.find({$and: [{propietario: id},{estado: true}]});

    if(carpetas.length === 0){
      return  res.send({mesaje: 'No se han encontrado capetas'})
    }
    return res.send({mensaje:'Carpetas ok', carpetas: carpetas})
})


module.exports = router;