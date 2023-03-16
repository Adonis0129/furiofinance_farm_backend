const Web3 = require("web3");
const addresses = require("../constants/addresses");
const DEFAULT_CHAINID = require("../constants/chainId");
const uri = require("../constants/uri");
const FFStrategyABI = require("../abis/contracts/furiofiStrategy.json").abi;
const SCStrategyABI = require("../abis/contracts/stableCoinStrategy.json").abi;
const SDStrategyABI = require("../abis/contracts/standardStrategy.json").abi;
const tokenPrices = require("./getTokenPrices");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(uri[DEFAULT_CHAINID]));
}

let farmBaseRewardAprs = {};

const getFarmBaseRewardAPR = async (poolName) => {
    try {

        const ffStrategyAddress = addresses[poolName]['furfiStrategy'][DEFAULT_CHAINID];
        const scStrategyAddress = addresses[poolName]['standardStrategy'][DEFAULT_CHAINID];
        const sdStrategyAddress = addresses[poolName]['stablecoinStrategy'][DEFAULT_CHAINID];

        const ffStrategyContract = new web3.eth.Contract( FFStrategyABI, ffStrategyAddress);
        const scStrategyContract = new web3.eth.Contract( SCStrategyABI, scStrategyAddress);
        const sdStrategyContract = new web3.eth.Contract( SDStrategyABI, sdStrategyAddress);

        const cakePrice = 0.0013; //  tokenPrices.getPrices("cake");
        const lpName = (poolName + '_lp').toString();
        const lpPrice = tokenPrices.getPrices(lpName);

        const ffStrategyLastStakeRewardsCake = (await ffStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const ffStrategyDeposits = (await ffStrategyContract.methods.furiofiStrategyDeposits().call()) / Math.pow(10, 18);
        const ffLastStakeRewardsDuration = await ffStrategyContract.methods.lastStakeRewardsDuration().call();
        const scStrategyLastStakeRewardsCake = (await scStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const scStrategyDeposits = (await scStrategyContract.methods.stablecoinStrategyDeposits().call()) / Math.pow(10, 18);
        const scLastStakeRewardsDuration = await scStrategyContract.methods.lastStakeRewardsDuration().call();

        const sdStrategyLastStakeRewardsCake = (await sdStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const sdStrategyDeposits = (await sdStrategyContract.methods.standardStrategyDeposits().call()) / Math.pow(10, 18);
        const sdLastStakeRewardsDuration = await sdStrategyContract.methods.lastStakeRewardsDuration().call();


        const tvl = (ffStrategyDeposits + scStrategyDeposits + sdStrategyDeposits) * lpPrice;
        const ffStrategyFarmBaseRewardsAPR = (ffStrategyDeposits == 0 || ffLastStakeRewardsDuration == 0 ) ? 0 : (ffStrategyLastStakeRewardsCake * cakePrice) / (ffStrategyDeposits * lpPrice) * (365 * 24 * 3600) / ffLastStakeRewardsDuration;
        const scStrategyFarmBaseRewardsAPR = (scStrategyDeposits == 0 || scLastStakeRewardsDuration == 0 ) ? 0 : (scStrategyLastStakeRewardsCake * cakePrice) / (scStrategyDeposits * lpPrice)* (365 * 24 * 3600) / scLastStakeRewardsDuration;
        const sdStrategyFarmBaseRewardsAPR = (sdStrategyDeposits == 0 || sdLastStakeRewardsDuration == 0 ) ? 0 : (sdStrategyLastStakeRewardsCake * cakePrice) / (sdStrategyDeposits * lpPrice)* (365 * 24 * 3600) / sdLastStakeRewardsDuration;
 
        farmBaseRewardAprs[poolName] = {
            tvl: tvl,
            ffStrategy: ffStrategyFarmBaseRewardsAPR,
            scStrategy: scStrategyFarmBaseRewardsAPR,
            sdStrategy: sdStrategyFarmBaseRewardsAPR
        }
                                                                            
        return farmBaseRewardAprs[poolName];



    } catch (err) {
        // console.log(err);
        return farmBaseRewardAprs[poolName];
    }
};
module.exports = getFarmBaseRewardAPR;
