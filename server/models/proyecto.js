var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        nombre : String,
        descripcion : String,
        caratula:String,
        compartido:Boolean,
        calificacion: Boolean,
        js: String,
        html: String,
        css: String,
        autores:String,
        autor: String,
    }
);

module.exports = mongoose.model('proyectos', esquema);