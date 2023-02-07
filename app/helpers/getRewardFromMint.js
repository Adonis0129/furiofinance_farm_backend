const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const {ChainIDs} = require("../constants/chainId");
const getURI = require("../constants/uri");
const AveragePriceOracleABI = require("../abis/contracts/averagePriceOracle.json").abi;
const tokenPrices = require("./getTokenPrices");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCtestnet)));
}

let rewardFromMint = {};

const getRewardFromMint = async () => {
    try {
        const averagePriceOracleAddress = getAddresses(ChainIDs.BSCtestnet, "AVERAGEPRICEORACLE");
        const averagePriceOracleContract = new web3.eth.Contract(AveragePriceOracleABI, averagePriceOracleAddress);

        const bnbPrice = await tokenPrices.fetchTokenPrices("BNB");
        const furFiPrice = await tokenPrices.get_FurFi_Price();

        const EfficiencyLevel = 500; //from strategy contracts
        const furFiBnbPrice = (await averagePriceOracleContract.methods.getAverageFurFiForOneEth().call()) / Math.pow(10, 18);

        const rewardPerUSD = EfficiencyLevel <= furFiBnbPrice ? 0 : (EfficiencyLevel - furFiBnbPrice) * furFiPrice / bnbPrice;
                                                                            
        rewardFromMint = {
            efficiencyLevel: EfficiencyLevel,
            furFiBnbPrice: furFiBnbPrice,
            rewardPerUSD: rewardPerUSD
        }

        return rewardFromMint;

    } catch (err) {
        // console.log(err);
        return rewardFromMint;
    }
}
module.exports = getRewardFromMint;
