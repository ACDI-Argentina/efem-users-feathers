const web3 = require("web3");
const config = require("../../../config/config");

//Leer roles desde el config?
const ADMIN_ROLE = "ADMIN_ROLE";
const AVALDAO_ROLE = "AVALDAO_ROLE";
const SOLICITANTE_ROLE = "SOLICITANTE_ROLE";
const COMERCIANTE_ROLE = "COMERCIANTE_ROLE";
const AVALADO_ROLE = "AVALADO_ROLE";

const roles = [
  {
    value: ADMIN_ROLE,
    hash: web3.utils.keccak256(ADMIN_ROLE),
    label: 'Admin',
    app: config.ADMIN_CONTRACT_ADDRESS
  },
  {
    value: AVALDAO_ROLE,
    hash: web3.utils.keccak256(AVALDAO_ROLE),
    label: 'Avaldao',
    app: config.AVALDAO_CONTRACT_ADDRESS
  },
  {
    value: SOLICITANTE_ROLE,
    hash: web3.utils.keccak256(SOLICITANTE_ROLE),
    label: 'Solicitante',
    app: config.AVALDAO_CONTRACT_ADDRESS
  },
  {
    value: COMERCIANTE_ROLE,
    hash: web3.utils.keccak256(COMERCIANTE_ROLE),
    label: 'Comerciante',
    app: config.AVALDAO_CONTRACT_ADDRESS
  },
  {
    value: AVALADO_ROLE,
    hash: web3.utils.keccak256(AVALADO_ROLE),
    label: 'Avalado',
    app: config.AVALDAO_CONTRACT_ADDRESS
  }
]

module.exports = {
  AVALDAO_ROLE,
  SOLICITANTE_ROLE,
  COMERCIANTE_ROLE,
  AVALADO_ROLE,
  roles
}