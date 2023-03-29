const Web3 = require("web3");
const addresses = require("../constants/addresses");
const DEFAULT_CHAINID = require("../constants/chainId");
const uri = require("../constants/uri");
const PairABI = require("../abis/contracts/pair.json").abi;


if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(uri[DEFAULT_CHAINID]));
}

let bnbPerToken = {};

const getBNBPerToken = async (lpName) => {
    try {
        const str = lpName.split("_");
        const tokenName0 = str[0];
        const tokenName1 = str[1];

        const pairAddress = addresses[lpName][DEFAULT_CHAINID];
        const pair = new web3.eth.Contract( PairABI, pairAddress);
        const reserves = await pair.methods.getReserves().call();

        if(reserves[0] == 0 || reserves[1] == 0) return 0;

        var tokenReserve = reserves[0] / Math.pow(10, 18);
        var bnbReserve = reserves[1] / Math.pow(10, 18);

        const token0 = await pair.methods.token0().call();
        if(token0 != addresses[tokenName0][DEFAULT_CHAINID]){
            tokenReserve = reserves[1] / Math.pow(10, 18);
            bnbReserve = reserves[0] / Math.pow(10, 18);
        }

        bnbPerToken[lpName] = bnbReserve / tokenReserve;

        return bnbPerToken[lpName];

    } catch (err) {
        // console.log(err);
        return bnbPerToken[lpName];
    }
}
module.exports = getBNBPerToken;