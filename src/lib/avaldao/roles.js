const web3 = require("web3");

//Leer roles desde el config?
const AVALDAO_ROLE = "AVALDAO_ROLE";
const SOLICITANTE_ROLE = "SOLICITANTE_ROLE";
const COMERCIANTE_ROLE = "COMERCIANTE_ROLE";
const AVALADO_ROLE = "AVALADO_ROLE";

const roles = [
  {
    value: AVALDAO_ROLE,
    hash: web3.utils.keccak256(AVALDAO_ROLE),
    label: 'Avaldao'
  },
  {
    value: SOLICITANTE_ROLE,
    hash: web3.utils.keccak256(SOLICITANTE_ROLE),
    label: 'Solicitante'
  },
  {
    value: COMERCIANTE_ROLE,
    hash: web3.utils.keccak256(COMERCIANTE_ROLE),
    label: 'Comerciante'
  },
  {
    value: AVALADO_ROLE,
    hash: web3.utils.keccak256(AVALADO_ROLE),
    label: 'Avalado'
  }
]


module.exports = {
  AVALDAO_ROLE,
  SOLICITANTE_ROLE,
  COMERCIANTE_ROLE,
  AVALADO_ROLE,
  roles
}