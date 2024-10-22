const logger = require('winston');
const mongoose = require('mongoose');
const mongoConfig = require('../config/config');

// mongoose query hook function that will
// remove the key from the doc if the value is undefined
function unsetUndefined(next) {
  const query = this;
  if (this.op === 'update') {
    Object.keys(this._update).forEach(k => {
      if (query._update[k] === undefined) {
        delete query._update[k];
        if (!query._update.$unset) query._update.$unset = {};
        query._update.$unset[k] = true;
      }
    });
  } else {
    logger.warn('mongoose hook ignoring unhandled `op`:', this.op, '\n', this);
  }
  next();
}

module.exports = function mongooseFactory() {
  const app = this;
  const {mongodb: mongoUrl} = mongoConfig;
  if(!mongoUrl){ 
    throw new Error("Missing required param: mongoUrl. Please set it using USERS_MONGO_DB env variable");
  }

  //Don't print sensitive information in logs
  const [part1,part2] = mongoUrl.split("@");
  let maskedUrl = part1;
  if(part2){
    maskedUrl = `${part1.split(":").slice(0,-1).concat("*****").join(":")}@${part2}`
  }
  logger.info('Using mongo url', maskedUrl); 


  const connectionOptions = { 
    useNewUrlParser: true, 
  };

  mongoose.set('strictQuery', true);
  mongoose.connect(mongoUrl, connectionOptions);

  const db = mongoose.connection;
  db.on('error', err => logger.error('Could not connect to Mongo', err));
  db.once('open', () => logger.info('Connected to Mongo'));

  mongoose.plugin(schema => {
    // feathers-mongoose only uses the following 2 calls
    schema.pre('update', unsetUndefined);
    schema.pre('findOneAndUpdate', unsetUndefined);
  });

  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};
