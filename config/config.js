const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const configPath = path.resolve(__dirname, `./.env`)
dotenv.config({ path: configPath });

let env = process.env.NODE_ENV || "development";
console.log(`ENV:`, env);


let cfg;
let networks = [];

try {
  const jsonCfg = fs.readFileSync(path.join(__dirname, "default.json"), { encoding: 'utf-8' });
  cfg = JSON.parse(jsonCfg);
  networks = cfg.networks;

} catch (err) {
  console.log(`Cannot read config`);
  console.log(err)
}

let network = undefined;
switch (env.toLowerCase()) {
  case "development": {
    network = networks.find(network => network.chainId === 33);
    break;
  }
  case "testing": {
    network = networks.find(network => network.chainId === 31);
    break;
  }
  case "production": {
    network = networks.find(network => network.chainId === 30);
    break;
  }
}

const adminContractAddress = process.env.ADMIN_CONTRACT_ADDRESS || cfg.adminContractAddress;
const avaldaoContractAddress = process.env.AVALDAO_CONTRACT_ADDRESS || cfg.avaldaoContractAddress;

module.exports = {
  mongodb: process.env.USERS_MONGO_DB || process.env.MONGO_DB,
  ADMIN_CONTRACT_ADDRESS: adminContractAddress,
  AVALDAO_CONTRACT_ADDRESS: avaldaoContractAddress,
  network: network
};
