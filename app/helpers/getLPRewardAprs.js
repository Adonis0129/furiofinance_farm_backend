const Web3 = require("web3");
const addresses = require("../constants/addresses");
const uri = require("../constants/uri");
const tokenPrices = require("./getTokenPrices");
const fetchLP24Volume = require("./getLP24Volumes");
const DEFAULT_CHAINID = require("../constants/chainId");
const PairABI = require("../abis/contracts/pair.json").abi;
const StableSwapABI = require("../abis/contracts/stableSwap.json").abi;

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(uri[DEFAULT_CHAINID]));
}

let lpRewardAprs = {};

const getLpRewardAPR = async (lpName) => {
    try {
        const str = lpName.split("_");
        const tokenName0 = str[0];
        const tokenName1 = str[1];

        if (lpName =="usdc_busd_lp" || lpName == "usdc_usdt_lp" || lpName == "busd_usdt_lp") {
            const stableSwapAddress = addresses[lpName][DEFAULT_CHAINID];
            const stableSwap = new web3.eth.Contract(StableSwapABI, stableSwapAddress);
      
            const token0Price =  tokenPrices.getPrices(tokenName0);
            const token1Price =  tokenPrices.getPrices(tokenName1);
            const lp_24h_volume = await fetchLP24Volume(lpName);

            const reserves0 = await stableSwap.methods.balances(0).call();
            const reserves1 = await stableSwap.methods.balances(1).call();
      
            if (reserves0 == 0 || reserves1 == 0) return 0;
      
            var token0Reserve = reserves0 / Math.pow(10, 18);
            var token1Reserve = reserves1 / Math.pow(10, 18);
      
            const token0 = await stableSwap.methods.coins(0).call();
            if (token0 == addresses[tokenName1][DEFAULT_CHAINID]) {
              token1Reserve = reserves0 / Math.pow(10, 18);
              token0Reserve = reserves1 / Math.pow(10, 18);
            }
      
            const lp_liquidity = token0Reserve * token0Price + token1Reserve * token1Price;

            lpRewardAprs[lpName] = (lp_24h_volume * (0.17 / 100) * 365) / lp_liquidity; 

          }
          else{
            const pairAddress = addresses[lpName][DEFAULT_CHAINID];
            const pair = new web3.eth.Contract( PairABI, pairAddress);

            const token0Price =  tokenPrices.getPrices(tokenName0);
            const token1Price =  tokenPrices.getPrices(tokenName1);
            const lp_24h_volume = await fetchLP24Volume(lpName);
            const reserves = await pair.methods.getReserves().call();

            if(reserves[0] == 0 || reserves[1] == 0) return 0;

            var token0Reserve = reserves[0] / Math.pow(10, 18);
            var token1Reserve = reserves[1] / Math.pow(10, 18);

            const token0 = await pair.methods.token0().call();
            if(token0 == addresses[tokenName1][DEFAULT_CHAINID]){
                token1Reserve = reserves[0] / Math.pow(10, 18);
                token0Reserve = reserves[1] / Math.pow(10, 18);
            }

            const lp_liquidity = token0Reserve * token0Price + token1Reserve * token1Price;

            lpRewardAprs[lpName] = (lp_24h_volume * (0.17 / 100) * 365) / lp_liquidity;

        }


        return lpRewardAprs[lpName];

    } catch (err) {
        // console.log(err);
        return lpRewardAprs[lpName];
    }
};
module.exports = getLpRewardAPR;