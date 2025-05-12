const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', error => console.error('Erro de conexão:', error));
db.once('open', () => console.log('MongoDB conectado.'));

module.exports = mongoose;
