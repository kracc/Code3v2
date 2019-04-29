const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/BasePrueba"

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  },(error) => {
    if (error) throw error;
    console.log('Base de Datos Online')
});