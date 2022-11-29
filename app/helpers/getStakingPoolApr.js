const { model } = require("mongoose");
const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const {ChainIDs} = require("../constants/chainId");
const getURI = require("../constants/uri");
const StakingPoolContract = require("../abis/contracts/stakingPool.json").abi;
const tokenPrices = require("./getTokenPrices");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCtestnet)));
}

let stakingPoolApr = 0;

const get_stakingPoolApr = async () => {
    try {
        const addresses = getAddresses(ChainIDs.BSCtestnet);
        const stakingPoolAddress = addresses.STAKINGPOOL_ADDRESS;

        const stakingPoolContract = new web3.eth.Contract( StakingPoolContract, stakingPoolAddress);

        const furFiPrice = await tokenPrices.get_FurFi_Price();
        const bnb_furfi_lp_Price = await tokenPrices.get_bnb_furfi_lp_Price();

        const totalStaked = (await stakingPoolContract.methods.totalStaked().call()) / Math.pow(10, 18);
        const lastStakeRewardsFurFi = (await stakingPoolContract.methods.lastStakeRewardsFurFi().call()) / Math.pow(10, 18);
        const lastStakeFurFiRewardsDuration = (await stakingPoolContract.methods.lastStakeFurFiRewardsDuration().call()) / Math.pow(10, 18);
        const lastStakeRewardsLP = (await stakingPoolContract.methods.lastStakeRewardsLP().call()) / Math.pow(10, 18);
        const lastStakeLPRewardsDuration = (await stakingPoolContract.methods.lastStakeLPRewardsDuration().call()) / Math.pow(10, 18);

        const furFiRewardsAPR = lastStakeRewardsFurFi / totalStaked * (365 * 24* 3600) / lastStakeFurFiRewardsDuration * 100;
        const lpRewardsAPR = (lastStakeRewardsLP * bnb_furfi_lp_Price) / (totalStaked * furFiPrice) * (365 * 24* 3600) / lastStakeLPRewardsDuration * 100;


        stakingPoolApr =  furFiRewardsAPR + lpRewardsAPR;                      
        return stakingPoolApr;

    } catch (err) {
        // console.log(err);
        return stakingPoolApr;
    }
}
module.exports = get_stakingPoolApr;