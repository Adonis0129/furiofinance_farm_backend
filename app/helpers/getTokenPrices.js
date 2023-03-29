const fetch = require("node-fetch");
const Web3 = require("web3");
const addresses = require("../constants/addresses");
const DEFAULT_CHAINID = require("../constants/chainId");
const uri = require("../constants/uri");
const tokenPriceUrls = require("../constants/tokenPriceUrls");
const getBNBPerToken = require("./getBNBPerToken");
const PairABI = require("../abis/contracts/pair.json").abi;
const StableSwapABI = require("../abis/contracts/stableSwap.json").abi;
const StableSwapLPABI = require("../abis/tokens/stableSwapLP.json").abi;

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider(uri[DEFAULT_CHAINID]));
}

let prices = {};


exports.fetchTokenPrices = async (tokenName) => {
  try {
    const apiId = tokenPriceUrls[tokenName].apiId;
    const url = tokenPriceUrls[tokenName].url;
    const res = await fetch(url);
    const data = await res.json();
    prices[tokenName] = data[apiId].usd;
    return prices[tokenName];
  } catch (err) {
    // console.log(err);
    return prices[tokenName];
  }
};


exports.fetchTokenPricesOnTestnet = async (tokenName) => {
  try {
    const lpName = (tokenName + '_bnb_lp').toString();
    const bnbPerToken = await getBNBPerToken(lpName);
    prices[tokenName] = bnbPerToken * prices['bnb'];
    return prices[tokenName];
  } catch (err) {
    // console.log(err);
    return prices[tokenName];
  }
};


exports.fetchLpPrices = async (lpName) => {
  try {
    const str = lpName.split("_");
    const tokenName0 = str[0];
    const tokenName1 = str[1];

    if (lpName =="usdc_busd_lp" || lpName == "usdc_usdt_lp" || lpName == "usdt_busd_lp") {
      const stableSwapAddress = addresses[lpName][DEFAULT_CHAINID];
      const stableSwap = new web3.eth.Contract(StableSwapABI, stableSwapAddress);
      const lpAddress = await stableSwap.methods.token().call();
      const stableSwapLP = new web3.eth.Contract(StableSwapLPABI, lpAddress);

      const totalSupply = (await stableSwapLP.methods.totalSupply().call()) / Math.pow(10, 18);
      const reserves0 = await stableSwap.methods.balances(0).call();
      const reserves1 = await stableSwap.methods.balances(1).call();

      if (reserves0 == 0 || reserves1 == 0) return 0;

      var token0Reserve = reserves0 / Math.pow(10, 18);
      var token1Reserve = reserves1 / Math.pow(10, 18);

      const token0 = await stableSwap.methods.coins(0).call();
      if (token0 != addresses[tokenName0][DEFAULT_CHAINID]) {
        token1Reserve = reserves0 / Math.pow(10, 18);
        token0Reserve = reserves1 / Math.pow(10, 18);
      }

      prices[lpName] = (token0Reserve * prices[tokenName0] + token1Reserve * prices[tokenName1]) / totalSupply;

    } else {
      const pairAddress = addresses[lpName][DEFAULT_CHAINID];
      const pair = new web3.eth.Contract(PairABI, pairAddress);

      const totalSupply = (await pair.methods.totalSupply().call()) / Math.pow(10, 18);
      const reserves = await pair.methods.getReserves().call();

      if (reserves[0] == 0 || reserves[1] == 0) return 0;

      var token0Reserve = reserves[0] / Math.pow(10, 18);
      var token1Reserve = reserves[1] / Math.pow(10, 18);

      const token0 = await pair.methods.token0().call();
      if (token0 != addresses[tokenName0][DEFAULT_CHAINID]) {
        token1Reserve = reserves[0] / Math.pow(10, 18);
        token0Reserve = reserves[1] / Math.pow(10, 18);
      }

      prices[lpName] = (token0Reserve * prices[tokenName0] + token1Reserve * prices[tokenName1]) / totalSupply;

    }
    return prices[lpName];
  } catch (err) {
    // console.log(err);
    return prices[lpName];
  }
};



exports.getPrices = (name) => {
  return prices[name];
};

exports.getAllTokenPrices = () => {
  return prices;
};
