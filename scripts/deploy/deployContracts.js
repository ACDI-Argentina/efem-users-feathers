const {
  DAOFactory,
  Kernel,
  ACL,
  LPVault,
  LiquidPledging,
  LPFactory,
  test
} = require('giveth-liquidpledging');
const { RecoveryVault } = test;
const { LPPCampaign, LPPCampaignFactory } = require('lpp-campaign');
const { LPPCappedMilestone, LPPCappedMilestoneFactory } = require('lpp-capped-native-milestone');

const ZERO_X_ZERO = '0x0000000000000000000000000000000000000000';
const ZERO_X_F = '0xffffffffffffffffffffffffffffffffffffffff';

module.exports = (web3, from, recoveryVaultAddress = ZERO_X_F) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('Deploying and setting up Liquid Pledging');
      const baseVault = await LPVault.new(web3, { from });
      console.log(` - BaseVault deployed`);
      const baseLP = await LiquidPledging.new(web3, { from, gas: 6700000 });
      console.log(` - Base Liquid Pledging deployed`);
      const baseACL = await ACL.new(web3, { from });
      console.log(` - ACL deployed.`);
      const baseKernel = await Kernel.new(web3, false, { from });
      console.log(` - Kernel deployed.`);
      const daoFactory = await DAOFactory.new(
        web3,
        baseKernel.$address,
        baseACL.$address,
        ZERO_X_ZERO,
        { from },
      );
      console.log(` - DAO Factory deployed.`);
      const lpFactory = await LPFactory.new(
        web3,
        daoFactory.$address,
        baseVault.$address,
        baseLP.$address,
        {
          gas: 6700000,
          from,
        },
      );
      console.log(` - Liquid Pledging Factory deployed.`);
      
      // WARNING. Se despliega RecoveryVault desde Test porque Aragon OS no acepta una EOA.
      // De otra manera, se lanza la excepción KERNEL_APP_NOT_CONTRACT.
      // Otra opción sería especificar un recoveryVault adecuado en "recoveryVaultAddress".
      const recoveryVault = await RecoveryVault.new(web3);
      const r = await lpFactory.newLP(from, recoveryVault.$address, { $extraGas: 100000, from });
      //const r = await lpFactory.newLP(from, recoveryVaultAddress, { $extraGas: 100000, from });
      console.log(` - Recovery Vault deployed`);

      const vaultAddress = r.events.DeployVault.returnValues.vault;
      const vault = new LPVault(web3, vaultAddress, { from });
      console.log(` - Vault deployed`);

      const lpAddress = r.events.DeployLiquidPledging.returnValues.liquidPledging;
      const liquidPledging = new LiquidPledging(web3, lpAddress, { from });
      console.log(` - Liquid Pledging deployed`);

      // set permissions
      const kernel = new Kernel(web3, await liquidPledging.kernel(), { from });
      const acl = new ACL(web3, await kernel.acl(), { from });

      // set autopay role on vault
      await acl.createPermission(from, vault.$address, await vault.SET_AUTOPAY_ROLE(), from, {
        $extraGas: 200000,
        from,
      });
      console.log(`   Vault autopay role set`);

      await vault.setAutopay(true, { from, $extraGas: 100000 });
      console.log(`   Vault autopay set to true`);

      // revoke autopay role from vault
      await acl.revokePermission(from, vault.$address, await vault.SET_AUTOPAY_ROLE(), {
        $extraGas: 200000,
        from,
      });
      console.log('   Vault SET_AUTOPAY_ROLE revoked');

      // burn autopay role from vault
      await acl.setPermissionManager(ZERO_X_F, vault.$address, await vault.SET_AUTOPAY_ROLE(), {
        $extraGas: 200000,
        from,
      });
      console.log('   Vault SET_AUTOPAY_ROLE burned');

      // revoke ESCAPE_HATCH_CALLER_ROLE from vault
      await acl.revokePermission(from, vault.$address, await vault.ESCAPE_HATCH_CALLER_ROLE(), {
        $extraGas: 200000,
        from,
      });
      console.log('   Vault ESCAPE_HATCH_CALLER_ROLE revoked');

      // burn ESCAPE_HATCH_CALLER_ROLE
      await acl.setPermissionManager(
        ZERO_X_F,
        vault.$address,
        await vault.ESCAPE_HATCH_CALLER_ROLE(),
        {
          $extraGas: 200000,
          from,
        },
      );
      console.log('   Vault ESCAPE_HATCH_CALLER_ROLE burned');

      // deploy campaign plugin
      console.log('Deploying and setting up Campaign factory');

      const lppCampaignFactory = await LPPCampaignFactory.new(web3, kernel.$address, {
        $extraGas: 100000,
        from,
      });
      console.log(` - LP Campaign Factory deployed`);
      await acl.grantPermission(
        lppCampaignFactory.$address,
        acl.$address,
        await acl.CREATE_PERMISSIONS_ROLE(),
        {
          $extraGas: 100000,
          from,
        },
      );
      await acl.grantPermission(
        lppCampaignFactory.$address,
        kernel.$address,
        await kernel.APP_MANAGER_ROLE(),
        { $extraGas: 100000, from },
      );
      await acl.grantPermission(
        lppCampaignFactory.$address,
        liquidPledging.$address,
        await liquidPledging.PLUGIN_MANAGER_ROLE(),
        { $extraGas: 100000, from },
      );
      console.log(` - Permissions set`);

      const campaignApp = await LPPCampaign.new(web3, { from });
      await kernel.setApp(
        await kernel.APP_BASES_NAMESPACE(),
        await lppCampaignFactory.CAMPAIGN_APP_ID(),
        campaignApp.$address,
        { $extraGas: 100000, from },
      );
      console.log(` - LP Campaign app deployed`);

      // deploy milestone plugin
      console.log('Deploying and setting up Milestone factory');
      const lppCappedMilestoneFactory = await LPPCappedMilestoneFactory.new(web3, kernel.$address, {
        $extraGas: 100000,
        from,
      });
      console.log(` - LP Milestone Factory deployed`);
      await acl.grantPermission(
        lppCappedMilestoneFactory.$address,
        acl.$address,
        await acl.CREATE_PERMISSIONS_ROLE(),
        {
          $extraGas: 100000,
          from,
        },
      );
      await acl.grantPermission(
        lppCappedMilestoneFactory.$address,
        liquidPledging.$address,
        await liquidPledging.PLUGIN_MANAGER_ROLE(),
        { $extraGas: 100000, from },
      );
      await acl.grantPermission(
        lppCappedMilestoneFactory.$address,
        kernel.$address,
        await kernel.APP_MANAGER_ROLE(),
        { $extraGas: 100000, from },
      );
      console.log(` - Permissions set`);

      const milestoneApp = await LPPCappedMilestone.new(web3, { from });
      await kernel.setApp(
        await kernel.APP_BASES_NAMESPACE(),
        await lppCappedMilestoneFactory.MILESTONE_APP_ID(),
        milestoneApp.$address,
        { $extraGas: 100000, from },
      );
      console.log(` - LP Milestone app deployed`);

      resolve({
        vault: vault.$address,
        liquidPledging: liquidPledging.$address,
        lppCampaignFactory: lppCampaignFactory.$address,
        lppCappedMilestoneFactory: lppCappedMilestoneFactory.$address,
      });
    } catch (e) {
      reject(e);
    }
  });
