const Web3 = require("web3");
const getAddresses = require("../constants/addresses");
const {ChainIDs} = require("../constants/chainId");
const getURI = require("../constants/uri");
const FFStrategyContract = require("../abis/contracts/furiofiStrategy.json").abi;
const SCStrategyContract = require("../abis/contracts/stableCoinStrategy.json").abi;
const SDStrategyContract = require("../abis/contracts/standardStrategy.json").abi;
const tokenPrices = require("./getTokenPrices");

if (typeof web3 !== 'undefined') {
    var web3 = new Web3(web3.currentProvider)
} else {
    var web3 = new Web3(new Web3.providers.HttpProvider(getURI(ChainIDs.BSCtestnet)));
}

let farmBaseRewardAprs = {};

const getFarmBaseRewardAPR = async (name) => {
    try {
        const ffStrategyName = (name + "_" + "FURIOFISTRATEGY").toString();
        const scStrategyName = (name + "_" + "STABLECOINSTRATEGY").toString();
        const sdStrategyName = (name + "_" + "STANDARDSTRATEGY").toString();

        const ffStrategyAddress = getAddresses(ChainIDs.BSCtestnet, ffStrategyName);
        const scStrategyAddress = getAddresses(ChainIDs.BSCtestnet, scStrategyName);
        const sdStrategyAddress = getAddresses(ChainIDs.BSCtestnet, sdStrategyName);

        const ffStrategyContract = new web3.eth.Contract( FFStrategyContract, ffStrategyAddress);
        const scStrategyContract = new web3.eth.Contract( SCStrategyContract, scStrategyAddress);
        const sdStrategyContract = new web3.eth.Contract( SDStrategyContract, sdStrategyAddress);

        const cakePrice = 0.0004; //await tokenPrices.fetchTokenPrices("CAKE");
        const lpName = (name + "_" + "LP").toString();
        const lpPrice = await tokenPrices.getLpPrices(lpName);
        const ffStrategyLastStakeRewardsCake = (await ffStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const ffStrategyDeposits = (await ffStrategyContract.methods.furiofiStrategyDeposits().call()) / Math.pow(10, 18);
        const ffLastStakeRewardsDuration = await ffStrategyContract.methods.lastStakeRewardsDuration().call();
        const scStrategyLastStakeRewardsCake = (await scStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const scStrategyDeposits = (await scStrategyContract.methods.stablecoinStrategyDeposits().call()) / Math.pow(10, 18);
        const scLastStakeRewardsDuration = await scStrategyContract.methods.lastStakeRewardsDuration().call();
        const sdStrategyLastStakeRewardsCake = (await sdStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const sdStrategyDeposits = (await sdStrategyContract.methods.standardStrategyDeposits().call()) / Math.pow(10, 18);
        const sdLastStakeRewardsDuration = await sdStrategyContract.methods.lastStakeRewardsDuration().call();

        const ffStrategyFarmBaseRewardsAPR = ffStrategyDeposits == 0 ? 0 : (ffStrategyLastStakeRewardsCake * cakePrice) / (ffStrategyDeposits * lpPrice) * (365 * 24 * 3600) / ffLastStakeRewardsDuration;
        const scStrategyFarmBaseRewardsAPR = scStrategyDeposits == 0 ? 0 : (scStrategyLastStakeRewardsCake * cakePrice) / (scStrategyDeposits * lpPrice)* (365 * 24 * 3600) / scLastStakeRewardsDuration;
        const sdStrategyFarmBaseRewardsAPR = sdStrategyDeposits == 0 ? 0 : (sdStrategyLastStakeRewardsCake * cakePrice) / (sdStrategyDeposits * lpPrice)* (365 * 24 * 3600) / sdLastStakeRewardsDuration;
 
        farmBaseRewardAprs[name] = {
            ffStrategy: ffStrategyFarmBaseRewardsAPR,
            scStrategy: scStrategyFarmBaseRewardsAPR,
            sdStrategy: sdStrategyFarmBaseRewardsAPR
        }
                                                                            
        return farmBaseRewardAprs[name];

    } catch (err) {
        // console.log(err);
        return farmBaseRewardAprs[name];
    }
};
module.exports = getFarmBaseRewardAPR;
