const challenges = require('./challenges/challenges.service'); //? its used?
const users = require('./users/users.service.js');
const ipfsPinService = require('./ipfs-pin/ipfs-pin.service');

module.exports = function configure() {
  const app = this;
  
  app.configure(challenges);
  app.configure(users);
  app.configure(ipfsPinService);
};
