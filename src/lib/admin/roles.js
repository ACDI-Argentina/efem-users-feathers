const web3 = require("web3");
const config = require("../../../config/config");

//Leer roles desde el config?
const ADMIN_ROLE = "ADMIN_ROLE";
const AVALDAO_ROLE = "AVALDAO_ROLE";
const SOLICITANTE_ROLE = "SOLICITANTE_ROLE";
const COMERCIANTE_ROLE = "COMERCIANTE_ROLE";
const AVALADO_ROLE = "AVALADO_ROLE";

const roles = config.roles;

module.exports = {
  AVALDAO_ROLE,
  SOLICITANTE_ROLE,
  COMERCIANTE_ROLE,
  AVALADO_ROLE,
  roles
}