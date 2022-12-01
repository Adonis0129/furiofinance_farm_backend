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
        const addresses = getAddresses(ChainIDs.BSCtestnet);
        const ffStrategyAddress = addresses.USDC_BUSD_FURIOFISTRATEGY_ADDRESS;
        const averagePriceOracleAddress = addresses.AVERAGEPRICEORACLE_ADDRESS;
        const ffStrategyContract = new web3.eth.Contract(FFStrategyContract, ffStrategyAddress);
        const averagePriceOracleContract = new web3.eth.Contract(AveragePriceOracleContract, averagePriceOracleAddress);

        const bnbPrice = await tokenPrices.fetch_BNB_Price();
        const furFiPrice = await tokenPrices.get_FurFi_Price();

        const EfficientLevel = (await ffStrategyContract.methods.EfficiencyLevel().call()) / Math.pow(10, 18);
        const furFiBnbPrice = (await averagePriceOracleContract.methods.getAverageFurFiForOneEth().call()) / Math.pow(10, 18);


        rewardPerUSD = EfficientLevel<=furFiBnbPrice ? 0 : (EfficientLevel - furFiBnbPrice) * furFiPrice / bnbPrice;
                                                                            
        return rewardPerUSD;

    } catch (err) {
        // console.log(err);
        return rewardPerUSD;
    }
}
module.exports = getRewardFromMint;
