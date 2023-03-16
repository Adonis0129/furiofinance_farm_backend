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

let bnbPerFurFi;

const getBNBPerFurFi = async () => {
    try {
        const furFiPairAddress = addresses['bnb_furfi_lp'][DEFAULT_CHAINID];
        const pair = new web3.eth.Contract( PairABI, furFiPairAddress);
        const reserves = await pair.methods.getReserves().call();

        if(reserves[0] == 0 || reserves[1] == 0) return 0;

        var bnbReserve = reserves[0];
        var furFiReserve = reserves[1];

        const token0 = await pair.methods.token0().call();
        if(token0 == addresses['furfi'][DEFAULT_CHAINID]){
            furFiReserve = reserves[0];
            bnbReserve = reserves[1];
        }

        bnbPerFurFi = bnbReserve / furFiReserve;
        return bnbPerFurFi;

    } catch (err) {
        // console.log(err);
        return bnbPerFurFi;
    }
}
module.exports = getBNBPerFurFi;