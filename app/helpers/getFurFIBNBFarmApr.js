const { model } = require("mongoose");
const Web3 = require("web3");
const addresses = require("../constants/addresses");
const DEFAULT_CHAINID = require("../constants/chainId");
const uri = require("../constants/uri");
// const FurFiBNBFarmABI = require("../abis/contracts/furFiBNBFarm.json").abi;

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(uri[DEFAULT_CHAINID]));
}

let furFiBNBFarmApr;

const getFurFiBNBFarmApr = async () => {
    // try {
    //     const furFiBNBFarmAddress = "";
    //     const furFiBNBFarmContract = new web3.eth.Contract( FurFiBNBFarmABI, furFiBNBFarmAddress);

    //     const totalDeposits = (await furFiBNBFarmContract.methods.totalDeposits().call()) / Math.pow(10, 18);
    //     const lastRoundMaskUpdateBlock = await furFiBNBFarmContract.methods.lastRoundMaskUpdateBlock().call();
    //     const additionalMintAmountIn365days = (await furFiBNBFarmContract.methods.getFurFiMintRewardsInRange(lastRoundMaskUpdateBlock, lastRoundMaskUpdateBlock + 365 * 3600 / 3).call()) / Math.pow(10, 18);

    //     const additionalMintRewardsAPR = ( additionalMintAmountIn365days == 0 || totalDeposits == 0 ) ? 0 : additionalMintAmountIn365days / totalDeposits;

    //     furFiBNBFarmApr = additionalMintRewardsAPR;                   
    //     return furFiBNBFarmApr;

    // } catch (err) {
    //     // console.log(err);
    //     return furFiBNBFarmApr;
    // }
}
module.exports = getFurFiBNBFarmApr;