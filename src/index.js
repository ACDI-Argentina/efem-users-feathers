const { queryConversionRates } = require('./services/conversionRates/getConversionRatesService');

const logger = require('winston');
const app = require('./app');

const port = process.env.FEATHERS_USERS_SERVICE_PORT || app.get('port');
const server = app.listen(port);

server.on('listening', () => {
  logger.info(`Feathers application started on ${app.get('host')}:${port}`);
  logger.info(`Using DappMailer url ${app.get('dappMailerUrl')}`);
});

queryConversionRates(app);
