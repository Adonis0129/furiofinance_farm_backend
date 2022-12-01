const fetch = require("node-fetch");

const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const {ChainIDs} = require("../constants/chainId");
const getURI = require("../constants/uri");
const getBNBPerFurFi = require("./getBNBPerFurFi");
const PairContract = require("../abis/contracts/pair.json").abi;

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCmainnet)));
}
let prices = {};

exports.fetch_CAKE_Price = async () => {
    try {
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=pancakeswap-token&vs_currencies=usd";
        const res = await fetch(url);
        const data = await res.json();
        prices["CAKE"] = data["pancakeswap-token"].usd;
        return prices["CAKE"];

    } catch (err) {
        // console.log(err);
        return prices["CAKE"];
    }
};

exports.fetch_USDC_Price = async () => {
    try {
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd";
        const res = await fetch(url);
        const data = await res.json();
        prices["USDC"] = data["usd-coin"].usd;
        return prices["USDC"];

    } catch (err) {
        // console.log(err);
        return prices["USDC"];
    }
};

exports.fetch_BUSD_Price = async () => {
    try {
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=binance-usd&vs_currencies=usd";
        const res = await fetch(url);
        const data = await res.json();
        prices["BUSD"] = data["binance-usd"].usd;
        return prices["BUSD"];

    } catch (err) {
        // console.log(err);
        return prices["BUSD"];
    }
};


exports.get_usdc_busd_lp_Price = async () => {
    try {
        const addresses = getAddresses(ChainIDs.BSCmainnet);
        const usdc_busdPairAddress = addresses.USDC_BUSD_PAIR_ADDRESS;
        const pair = new web3.eth.Contract( PairContract, usdc_busdPairAddress);

        const totalSupply = (await pair.methods.totalSupply().call()) / Math.pow(10, 18);
        const reserves = await pair.methods.getReserves().call();

        if(reserves[0] == 0 || reserves[1] == 0) return 0;

        var usdcReserve = reserves[0] / Math.pow(10, 18);
        var busdReserve = reserves[1] / Math.pow(10, 18);

        const token0 = await pair.methods.token0().call();
        if(token0 == addresses.BUSD_ADDRESS){
            busdReserve = reserves[0] / Math.pow(10, 18);
            usdcReserve = reserves[1] / Math.pow(10, 18);
        }

        prices["USDC_BUSD_LP"] = (usdcReserve * prices["USDC"] + busdReserve * prices["BUSD"]) / totalSupply;
        return prices["USDC_BUSD_LP"];

    } catch (err) {
        // console.log(err);
        return prices["USDC_BUSD_LP"];
    }
}

exports.fetch_BNB_Price = async () => {
    try {
        const url = "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd";
        const res = await fetch(url);
        const data = await res.json();
        prices["BNB"] = data["binancecoin"].usd;
        return prices["BNB"];

    } catch (err) {
        // console.log(err);
        return prices["BNB"];
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
        var web3ForTest = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCtestnet)));

        const addresses = getAddresses(ChainIDs.BSCtestnet);
        const bnb_furfiPairAddress = addresses.BNB_FURFI_PAIR_ADDRESS;
        const pair = new web3ForTest.eth.Contract( PairContract, bnb_furfiPairAddress);

        const totalSupply = (await pair.methods.totalSupply().call()) / Math.pow(10, 18);
        const reserves = await pair.methods.getReserves().call();

        if(reserves[0] == 0 || reserves[1] == 0) return 0;

        var bnbReserve = reserves[0] / Math.pow(10, 18);
        var furfiReserve = reserves[1] / Math.pow(10, 18);

        const token0 = await pair.methods.token0().call();
        if(token0 == addresses.FURFI_ADDRESS){
            furfiReserve = reserves[0] / Math.pow(10, 18);
            bnbReserve = reserves[1] / Math.pow(10, 18);
        }

        prices["BNB_FURFI_LP"] = (bnbReserve * prices["BNB"] + furfiReserve * prices["FURFI"]) / totalSupply;
        return prices["BNB_FURFI_LP"];

    } catch (err) {
        // console.log(err);
        return prices["BNB_FURFI_LP"];
    }
}

// exports.getTokenPrice = (symbol) => {
//     return Number(prices[symbol]);
// };



