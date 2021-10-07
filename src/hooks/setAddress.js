const errors = require('@feathersjs/errors');
const { setByDot } = require('feathers-hooks-common');

module.exports = field => context => {
  if (context.params.provider === undefined) {
    if (context.method !== 'patch' && !context.data[field]) {
      throw new errors.GeneralError(
        `must provide ${field} when calling create or update internally`,
      );
    }

    return context;
  }

  
  const address = context.params.user ? context.params.user.address : undefined;
  setByDot(context.data, field, address);
  return context;
};
