const mongoose = require('mongoose');

// const url = "mongodb://localhost:27017/BasePrueba"

const url = "mongodb+srv://kim:asd.123@cluster0-wpgk5.mongodb.net/test?retryWrites=true"

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  },(error) => {
    if (error) throw error;
    console.log('Base de Datos Online')
});