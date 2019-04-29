var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var archivoSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio'],
        },
        direccionArchivo:{
           type:  String,
            required:true
        },
        carpeta:{
            type:Schema.Types.ObjectId, ref :'Carpeta',
             default:""
        },
        propietario:{
            type: Schema.Types.ObjectId, ref :'Usuario'
        },
        estado:{
            type:Boolean,
            default:true
        },
        compartidoCon:[{
            type: Schema.Types.ObjectId, ref :'Usuario'
        }],
        fechaActualizacion:{
            type: Date,
            default: Date.now()
        }
    }
);

module.exports = mongoose.model('Archivo', archivoSchema);