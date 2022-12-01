const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const {ChainIDs} = require("../constants/chainId");
const getURI = require("../constants/uri");
const tokenPrices = require("./getTokenPrices");
const fetchLP24Volume = require("./getLP24Volumes");
const PairContract = require("../abis/contracts/pair.json").abi;


if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCmainnet)));
}

let lpRewardAprs = {};

const getLpRewardAPR = async (name) => {
    try {
        const str = name.split("_");
        const tokenName0 = str[0];
        const tokenName1 = str[1];

        const pairAddress = getAddresses(ChainIDs.BSCmainnet, name);
        const pair = new web3.eth.Contract( PairContract, pairAddress);

        const token0Price = await tokenPrices.fetchTokenPrices(tokenName0);
        const token1Price = await tokenPrices.fetchTokenPrices(tokenName1);
        const lpName = (tokenName0 + "-" + tokenName1).toString();
        const lp_24h_volume = await fetchLP24Volume(lpName);
        const reserves = await pair.methods.getReserves().call();

        if(reserves[0] == 0 || reserves[1] == 0) return 0;

        var token0Reserve = reserves[0] / Math.pow(10, 18);
        var token1Reserve = reserves[1] / Math.pow(10, 18);

        const token0 = await pair.methods.token0().call();
        if(token0 == getAddresses(ChainIDs.BSCmainnet, tokenName1)){
            token1Reserve = reserves[0] / Math.pow(10, 18);
            token0Reserve = reserves[1] / Math.pow(10, 18);
        }

        const lp_liquidity = token0Reserve * token0Price + token1Reserve * token1Price;

        lpRewardAprs[name] = (lp_24h_volume * (0.17 / 100) * 365) / lp_liquidity;
        return lpRewardAprs[name];

    } catch (err) {
        // console.log(err);
        return lpRewardAprs[name];
    }
};
module.exports = getLpRewardAPR;