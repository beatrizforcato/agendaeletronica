const mongoose = require('../db/mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
