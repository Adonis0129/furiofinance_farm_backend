const fetch = require("node-fetch");
const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const { ChainIDs } = require("../constants/chainId");
const getURI = require("../constants/uri");
const getTokenPriceUrls = require("../constants/tokenPriceUrls");
const getBNBPerFurFi = require("./getBNBPerFurFi");
const PairABI = require("../abis/contracts/pair.json").abi;
const StableSwapABI = require("../abis/contracts/stableSwap.json").abi;
const StableSwapLPABI = require("../abis/tokens/stableSwapLP.json").abi;

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(
    new Web3.providers.HttpProvider(getURI(ChainIDs.BSCtestnet))
  );
}

let prices = {};

exports.fetchTokenPrices = async (tokenName) => {
  try {
    const apiId = getTokenPriceUrls(tokenName).APIID;
    const url = getTokenPriceUrls(tokenName).URL;
    const res = await fetch(url);
    const data = await res.json();
    prices[tokenName] = data[apiId].usd;
    return prices[tokenName];
  } catch (err) {
    // console.log(err);
    return prices[tokenName];
  }
};

exports.getLpPrices = async (name) => {
  try {
    const str = name.split("_");
    const tokenName0 = str[0];
    const tokenName1 = str[1];

    if (name =="USDC_BUSD" || name == "USDC_USDT" || name == "BUSD_USDT") {
      const stableSwapAddress = getAddresses(ChainIDs.BSCtestnet, name);
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
      if (token0 == getAddresses(ChainIDs.BSCtestnet, tokenName1)) {
        token1Reserve = reserves0 / Math.pow(10, 18);
        token0Reserve = reserves1 / Math.pow(10, 18);
      }

      prices[name] = (token0Reserve * prices[tokenName0] + token1Reserve * prices[tokenName1]) / totalSupply;

    } else {
      const pairAddress = getAddresses(ChainIDs.BSCtestnet, name);

      const pair = new web3.eth.Contract(PairABI, pairAddress);

      const totalSupply = (await pair.methods.totalSupply().call()) / Math.pow(10, 18);
      const reserves = await pair.methods.getReserves().call();

      if (reserves[0] == 0 || reserves[1] == 0) return 0;

      var token0Reserve = reserves[0] / Math.pow(10, 18);
      var token1Reserve = reserves[1] / Math.pow(10, 18);

      const token0 = await pair.methods.token0().call();
      if (token0 == getAddresses(ChainIDs.BSCtestnet, tokenName1)) {
        token1Reserve = reserves[0] / Math.pow(10, 18);
        token0Reserve = reserves[1] / Math.pow(10, 18);
      }

      prices[name] = (token0Reserve * prices[tokenName0] + token1Reserve * prices[tokenName1]) / totalSupply;

    }
    return prices[name];
  } catch (err) {
    // console.log(err);
    return prices[name];
  }
};

exports.get_FurFi_Price = async () => {
  try {
    const bnbPerFurFi = await getBNBPerFurFi();
    prices["FURFI"] = bnbPerFurFi * prices["BNB"];
    return prices["FURFI"];
  } catch (err) {
    // console.log(err);
    return prices["FURFI"];
  }
};

exports.get_bnb_furfi_lp_Price = async () => {
  try {
    const bnb_furfiPairAddress = getAddresses(ChainIDs.BSCtestnet, "BNB_FURFI");

    // var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCtestnet)));
    const pair = new web3.eth.Contract(PairABI, bnb_furfiPairAddress);

    const totalSupply = (await pair.methods.totalSupply().call()) / Math.pow(10, 18);
    const reserves = await pair.methods.getReserves().call();

    if (reserves[0] == 0 || reserves[1] == 0) return 0;

    var bnbReserve = reserves[0] / Math.pow(10, 18);
    var furfiReserve = reserves[1] / Math.pow(10, 18);

    const token0 = await pair.methods.token0().call();
    if (token0 == getAddresses(ChainIDs.BSCtestnet, "FURFI")) {
      furfiReserve = reserves[0] / Math.pow(10, 18);
      bnbReserve = reserves[1] / Math.pow(10, 18);
    }

    prices["BNB_FURFI"] =
      (bnbReserve * prices["BNB"] + furfiReserve * prices["FURFI"]) / totalSupply;
    return prices["BNB_FURFI"];
  } catch (err) {
    // console.log(err);
    return prices["BNB_FURFI"];
  }
};

exports.getAllPrices = () => {
  return prices;
};
