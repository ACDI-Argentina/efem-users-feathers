const contract = require("./admin-contract");
const { roles } = require("./roles");

async function getRoles(address) { //Needs contract
  const userRoles = [];

  for (const rol of roles) {

    console.log(`Consultando rol ${rol.value} de usuario ${address}. Admin: ${contract.options.address}`)

    const hasUserRole = await contract.methods.hasUserRole(
      address,
      rol.app,
      rol.hash).call();

    console.log(`Rol ${rol.value} de usuario ${address}: ${hasUserRole}.`);

    if (hasUserRole) {
      userRoles.push(rol.value);
    }
  }

  return userRoles;
}//returns array of roles

module.exports = getRoles;
