var mongoose = require("mongoose");

var carpetaSchema = new mongoose.Schema({
  //archivos: [{ type: mongoose.Schema.Types.ObjectId, ref:'Archivo'}],
  // carpetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Carpeta'}],
  proyectoPadre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Proyecto"
  },
  html: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Archivo"
  },
  css: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Archivo"
  },
  js: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Archivo"
  },
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  propietario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
//   compartidaCon: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Usuario"
//     }
//   ],
  estado: {
    type: Boolean,
    default: true
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now()
  }
  // descripcion:{
  //     type: String,
  //     required:[true,'El nombre es obligatorio']
  // }
});
module.exports = mongoose.model("Carpeta", carpetaSchema);
