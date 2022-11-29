const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const {ChainIDs} = require("../constants/chainId");
const getURI = require("../constants/uri");
const PairContract = require("../abis/contracts/pair.json").abi;
const tokenPrices = require("./getTokenPrices");
const lpVolums = require("./getLPVolumes");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCmainnet)));
}

let lpRewardAprs = {};

exports.get_usdc_busd_lpRewardAPR = async () => {
    try {
        const addresses = getAddresses(ChainIDs.BSCmainnet);
        const usdc_busdPairAddress = addresses.USDC_BUSD_PAIR_ADDRESS;
        const pair = new web3.eth.Contract( PairContract, usdc_busdPairAddress);

        const usdcPrice = await tokenPrices.fetch_USDC_Price();
        const busdPrice = await tokenPrices.fetch_BUSD_Price();
        const usdc_busd_lp_24h_volume = await lpVolums.fetch_usdc_busd_LPVolume();
        const reserves = await pair.methods.getReserves().call();

        if(reserves[0] == 0 || reserves[1] == 0) return 0;

        var usdcReserve = reserves[0] / Math.pow(10, 18);
        var busdReserve = reserves[1] / Math.pow(10, 18);

        const token0 = await pair.methods.token0().call();
        if(token0 == addresses.BUSD_ADDRESS){
            busdReserve = reserves[0] / Math.pow(10, 18);
            usdcReserve = reserves[1] / Math.pow(10, 18);
        }

        const usdc_busd_lp_liquidity = usdcReserve * usdcPrice + busdReserve * busdPrice;

        lpRewardAprs["USDC-BUSD"] = (usdc_busd_lp_24h_volume * (0.17 / 100) * 365) / usdc_busd_lp_liquidity * 100;
        return lpRewardAprs["USDC-BUSD"];

    } catch (err) {
        // console.log(err);
        return lpRewardAprs["USDC-BUSD"];
    }
}
