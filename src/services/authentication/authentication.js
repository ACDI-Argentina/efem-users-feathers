const logger = require("winston");
const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const { web3 } = require('./authenticationWeb3');
const envConfig = require("../../../config/authentication");

const getRoles = require("../../lib/admin/getRoles");

module.exports = function init() {
  const app = this;
  const config = app.get('authentication');

  if(envConfig.secret){
    config.secret = envConfig.secret;
  }
  if(envConfig.audience){
    config.jwt.audience = envConfig.audience;
  }
  if(envConfig.issuer){
    config.jwt.issuer = envConfig.issuer;
  }

  logger.info(`JWT tokens: { issuer:"${config.jwt.issuer}", audience:"${config.jwt.audience}" }`)
  

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(web3());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies),

        context => {
          const user = context.params.user;
          // make sure params.payload exists
          context.params.payload = {
            ...context.params.payload,
            name: user.name,
            email: user.email, //check validation 
          }
          return context;
        },

        async context => {
          const user = context.params.user;
          try {
            const roles = await getRoles(user.address);
            context.params.payload = {
              ...context.params.payload,
              roles: roles
            }
          } catch (err) {
            console.error(`[Authentication] Error obteniendo roles de usuario ${user.address}.`, err);
          }

          return context;
        },
      ],
      remove: [authentication.hooks.authenticate('jwt')],
    },
  });
};