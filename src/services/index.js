const challenges = require('./challenges/challenges.service');
const pledgeAdmins = require('./pledgeAdmins/pledgeAdmins.service');
const events = require('./events/events.service');

const users = require('./users/users.service.js');
const uploads = require('./uploads/uploads.service.js');
const conversionRates = require('./conversionRates/conversionRates.service.js');
const ipfsPinService = require('./ipfs-pin/ipfs-pin.service');

const conversations = require('./conversations/conversations.service.js');

module.exports = function configure() {
  const app = this;
  
  app.configure(users);

  app.configure(uploads);
  app.configure(challenges);
  app.configure(pledgeAdmins);
  
  app.configure(conversionRates);
  app.configure(events);
  app.configure(conversations);
  app.configure(ipfsPinService);
};
