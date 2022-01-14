const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const { web3 } = require('./authenticationWeb3');

const getAvaldaoRoles = require("./avaldao"); 

module.exports = function init() {
  const app = this;
  const config = app.get('authentication');

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
          //TODO: Read roles from smart contract
          return context;
        },


        async context => {
          const user = context.params.user; 
          try{
            const avaldaoRoles = await getAvaldaoRoles(user.address);
            context.params.payload = {
              ...context.params.payload,
              roles:{
                avaldao: avaldaoRoles
              } 
            }

          } catch(err){
            console.log(`Cannot get roles for user ${user.address}`)
            console.log(err);
          }
          
          return context;
        },




        
      
      
      ],
      remove: [authentication.hooks.authenticate('jwt')],
    },
  });
};
