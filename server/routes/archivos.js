const express = require('express');
const router = express.Router();
const Archivo = require('../models/archivo');
const Carpeta = require("../models/carpeta")
const {verificarAutenticacion} = require('./middlewares')

router.post("/actualizrArchivos",verificarAutenticacion,async(req,res)=>{
    let id = req.body.idCarpeta
    let html = req.body.html
    let css = req.body.css
    let js = req.body.js
    let contenidohtml = req.body.contenidohtml
    let contenidocss = req.body.contenidocss
    let contenidojs = req.body.contenidojs
    let archivoHtml = await Archivo.findByIdAndUpdate(html,{contenido:contenidohtml},{new:true})
    let archivocss = await Archivo.findByIdAndUpdate(css,{contenido:contenidocss},{new:true})
    let archivojs = await Archivo.findByIdAndUpdate(js,{contenido:contenidojs},{new:true})
    let carpeta = await Carpeta.findOne({_id:id});
    return res.send({
        status:200,
        carpeta
    })

});


module.exports = router;