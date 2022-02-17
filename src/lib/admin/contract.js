const Web3 = require("web3");
const { AdminAbi } = require("@acdi/avaldao-contract"); 
const { network, ADMIN_CONTRACT_ADDRESS, AVALDAO_CONTRACT_ADDRESS } = require("../../../config/config");

const provider = new Web3.providers.HttpProvider(network.url);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(AdminAbi, ADMIN_CONTRACT_ADDRESS);
console.log(`[Admin Contract] Using contract on network ${network.url} at ${ADMIN_CONTRACT_ADDRESS}`);
console.log(`[Avaldao] address ${AVALDAO_CONTRACT_ADDRESS}`);


module.exports = contract;