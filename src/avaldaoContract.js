const Web3 = require("web3");
const { AvaldaoAbi } = require("@acdi/avaldao-contract"); 
const networkURL = process.env.NETWORK_URL || "http://localhost:4444"; //TODO: leer desde el config
const AVALDAO_ADDRESS = "0x05A55E87d40572ea0F9e9D37079FB9cA11bdCc67"; //TODO: leer desde el config

const provider = new Web3.providers.HttpProvider(networkURL);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(AvaldaoAbi, AVALDAO_ADDRESS);
//Si se puede inicializar el contrato, comprobar que funcione con al menos una llamada, asi podemos loguear si esta bien configurado

module.exports = contract;