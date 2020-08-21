const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Conectado a la DB');

    } catch (error) {

        console.log(error);
        throw new Error('Error al conectar con DB');

    }

};

module.exports = {
    dbConnection
};


// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));