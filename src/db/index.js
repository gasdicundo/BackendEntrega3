const mongoose = require('mongoose');
const { dbUser, dbPassword, dbHost, dbName } = require('../configs/server.config');

const mongoConnect = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('La base de datos está conectada');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

module.exports = mongoConnect;
