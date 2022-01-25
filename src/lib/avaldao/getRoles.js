const contract = require("./contract");
const { roles } = require("./roles");

async function getAvaldaoRoles(address) { //Needs contract
  const userRoles = [];

  for (const rol of roles) {
    //console.log(`Checking ${rol.label} for ${address}`)
    const canPerform = await contract.methods.canPerform(address, rol.hash, []).call();
    if (canPerform) {
      userRoles.push(rol.value);
    }
  }

  return userRoles;
}//returns array of roles

module.exports = getAvaldaoRoles;
