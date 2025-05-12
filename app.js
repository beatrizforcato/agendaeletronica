const express = require('express');
const path = require('path');
const AgendaService = require('./services/AgendaService');
require('dotenv').config();
require('./db/mongoose');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/eventos', async (req, res) => {
  try {
    const eventos = await AgendaService.buscarEventos();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar eventos.' });
  }
});

app.post('/eventos', async (req, res) => {
  const { titulo, descricao, data, usuarioEmail, categoria } = req.body;
  if (!titulo || !data || !usuarioEmail || !categoria) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
  }

  try {
    const novoEvento = await AgendaService.adicionarEvento({
      titulo, descricao, data, usuarioEmail, categoria
    });
    res.status(201).json(novoEvento);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao adicionar evento.' });
  }
});

app.delete('/eventos/:id', async (req, res) => {
  try {
    await AgendaService.removerEvento(req.params.id);
    res.json({ mensagem: 'Evento removido com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover evento.' });
  }
});

const http = require('http');
const server = http.createServer(app);
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;

function tentarIniciarServidor(porta) {
  server.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
  });

  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Porta ${porta} em uso. Tentando a próxima...`);
      tentarIniciarServidor(porta + 1); // tenta a próxima porta
    } else {
      console.error('Erro ao iniciar servidor:', err);
    }
  });
}

tentarIniciarServidor(DEFAULT_PORT);
