const fs = require('fs');
const path = require('path');
require('dotenv').config();

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
const crowdfundingContractAddress = process.env.CROWDFUNDING_CONTRACT_ADDRESS || cfg.crowdfundingContractAddress;

const roles = [
  {
    value: "ADMIN_ROLE",
    hash: "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775",
    label: "Admin",
    app: adminContractAddress
  },

  {
    value: "AVALDAO_ROLE",
    hash: "0x6fe48ba75814b08c0dddc279841efe9da58be3efa246107d47304a151682bb53",
    label: "Avaldao",
    app: avaldaoContractAddress
  },
  {
    value: "SOLICITANTE_ROLE",
    hash: "0xfb35233533db5c7fd0b9bddd918dc9ee7dc650bcb29116685e303e733d8351bb",
    label: "Solicitante",
    app: avaldaoContractAddress
  },
  {
    value: "COMERCIANTE_ROLE",
    hash: "0xf95d0e1c3ba95ce4614532f244d16b0981be4cfc6964c018cf3b9e6d860c5c6e",
    label: "Comerciante",
    app: avaldaoContractAddress
  },
  {
    value: "AVALADO_ROLE",
    hash: "0x780a0ec41e5ee507f458f09f4a20097a58d10125acb87277c67891025e16cef6",
    label: "Avalado",
    app: avaldaoContractAddress
  },

  {
    value: "DELEGATE_ROLE",
    hash: "0x1a82baf2b928242f69f7147fb92490c6288d044f7257b88817e6284f1eec0f15",
    label: "Delegate",
    app: crowdfundingContractAddress
  },
  {
    value: "CAMPAIGN_MANAGER_ROLE",
    hash: "0x5022544358ee0bece556b72ae8983c7f24341bd5b9483ce8a19bff5efbb2de92",
    label: "Campaign Manager",
    app: crowdfundingContractAddress
  },
  {
    value: "CAMPAIGN_REVIEWER_ROLE",
    hash: "0x634e3ca2e6368700bbf08d9508419cd87488d87c36c701a117b27ea1e3efb94e",
    label: "Campaign Reviewer",
    app: crowdfundingContractAddress
  },
  {
    value: "MILESTONE_MANAGER_ROLE",
    hash: "0xa3a2c0788fca84104c8a174fd5021fe337cdd81ef2dab39dfed0f397582c2efb",
    label: "Milestone Manager",
    app: crowdfundingContractAddress
  },
  {
    value: "MILESTONE_REVIEWER_ROLE",
    hash: "0x4d6e65593aeec72da9930817128ec8271cfd271f40a90712d7163837a7835ede",
    label: "Milestone Reviewer",
    app: crowdfundingContractAddress
  },
  {
    value: "RECIPIENT_ROLE",
    hash: "0x8b42d4fd5c2527b7732a4b075ccb928f88ffc087de1e4c401c8fc7ab80ea882e",
    label: "Recipient",
    app: crowdfundingContractAddress
  }
];

module.exports = {
  mongodb: process.env.USERS_MONGO_DB || process.env.MONGO_DB,
  ADMIN_CONTRACT_ADDRESS: adminContractAddress,
  AVALDAO_CONTRACT_ADDRESS: avaldaoContractAddress,
  CROWDFUNDING_CONTRACT_ADDRESS: crowdfundingContractAddress,
  network: network,
  roles: roles
};