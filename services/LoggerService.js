const fs = require('fs');
const path = require('path');

class LoggerService {
  static logError(error) {
    const logPath = path.join(__dirname, '../logs/erros.log');
    const msg = `[${new Date().toISOString()}] ${error.stack || error}\n`;
    fs.appendFileSync(logPath, msg, 'utf8');
  }
}

module.exports = LoggerService;
