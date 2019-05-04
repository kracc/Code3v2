var mongoose = require("mongoose");

var esquema = new mongoose.Schema({
  // archivos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Archivo" }],
  // carpetas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Carpeta" }],
  // proyectos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Proyecto" }],
  proyectoPadre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto"
  },
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  estado: {
    type: Boolean,
    default: true
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Proyecto", esquema);
