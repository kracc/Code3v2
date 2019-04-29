var mongoose = require("mongoose");

var esquema = new mongoose.Schema(
    {
        valor : Number,
        estado: Boolean,
    }
);
module.exports = mongoose.model('cuentas',esquema);