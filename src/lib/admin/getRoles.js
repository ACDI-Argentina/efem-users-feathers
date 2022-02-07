const contract = require("./contract");
const { roles } = require("./roles");

async function getRoles(address) { //Needs contract
  const userRoles = [];

  for (const rol of roles) {
    const hasUserRole = await contract.methods.hasUserRole(
      address,
      rol.app,
      rol.hash).call();
    if (hasUserRole) {
      userRoles.push(rol.value);
    }
  }

  return userRoles;
}//returns array of roles

module.exports = getRoles;
