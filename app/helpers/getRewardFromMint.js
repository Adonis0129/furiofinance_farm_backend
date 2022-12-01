const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const {ChainIDs} = require("../constants/chainId");
const getURI = require("../constants/uri");
const FFStrategyContract = require("../abis/contracts/furiofiStrategy.json").abi;
const AveragePriceOracleContract = require("../abis/contracts/averagePriceOracle.json").abi;
const tokenPrices = require("./getTokenPrices");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCtestnet)));
}

let rewardPerUSD;

const getRewardFromMint = async () => {
    try {
        const averagePriceOracleAddress = getAddresses(ChainIDs.BSCtestnet, "AVERAGEPRICEORACLE");
        const averagePriceOracleContract = new web3.eth.Contract(AveragePriceOracleContract, averagePriceOracleAddress);

        const bnbPrice = await tokenPrices.fetchTokenPrices("BNB");
        const furFiPrice = await tokenPrices.get_FurFi_Price();

        const EfficientLevel = 500; //from strategy contracts
        const furFiBnbPrice = (await averagePriceOracleContract.methods.getAverageFurFiForOneEth().call()) / Math.pow(10, 18);


        rewardPerUSD = EfficientLevel <= furFiBnbPrice ? 0 : (EfficientLevel - furFiBnbPrice) * furFiPrice / bnbPrice;
                                                                            
        return rewardPerUSD;

    } catch (err) {
        // console.log(err);
        return rewardPerUSD;
    }
}
module.exports = getRewardFromMint;
