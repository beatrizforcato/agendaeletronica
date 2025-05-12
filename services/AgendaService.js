const Evento = require('../models/Evento');
const Logger = require('./LoggerService');

class AgendaService {
  static async adicionarEvento(dados) {
    try {
      const evento = new Evento(dados);
      return await evento.save();
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async buscarEventos() {
    try {
      return await Evento.find();
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }

  static async removerEvento(id) {
    try {
      return await Evento.findByIdAndDelete(id);
    } catch (error) {
      Logger.logError(error);
      throw error;
    }
  }
}

module.exports = AgendaService;
