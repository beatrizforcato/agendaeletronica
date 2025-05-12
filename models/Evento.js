const mongoose = require('../db/mongoose');

const EventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: String,
  data: { type: Date, required: true },
  usuarioEmail: { type: String, required: true },
  categoria: { type: String, required: true }
});

module.exports = mongoose.model('Evento', EventoSchema);
