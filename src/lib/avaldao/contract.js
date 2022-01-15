const Web3 = require("web3");
const { AvaldaoAbi } = require("@acdi/avaldao-contract"); 
const { network, AVALDAO_ADDRESS } = require("../../../config/config");

const provider = new Web3.providers.HttpProvider(network.url);
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(AvaldaoAbi, AVALDAO_ADDRESS);
console.log(`[Avaldao Contract] Using contract on network ${network.url} at ${AVALDAO_ADDRESS}`);


module.exports = contract;