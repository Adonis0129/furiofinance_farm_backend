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

exports.get_usdc_busd_farmBaseRewardAPR = async () => {
    try {
        const addresses = getAddresses(ChainIDs.BSCtestnet);
        const ffStrategyAddress = addresses.USDC_BUSD_FURIOFISTRATEGY_ADDRESS;
        const scStrategyAddress = addresses.USDC_BUSD_STABLECOINSTRATEGY_ADDRESS;
        const sdStrategyAddress = addresses.USDC_BUSD_STANDARDSTRATEGY_ADDRESS;

        const ffStrategyContract = new web3.eth.Contract( FFStrategyContract, ffStrategyAddress);
        const scStrategyContract = new web3.eth.Contract( SCStrategyContract, scStrategyAddress);
        const sdStrategyContract = new web3.eth.Contract( SDStrategyContract, sdStrategyAddress);

        const cakePrice = 0.0004; //await tokenPrices.fetch_CAKE_Price();
        const usdc_busd_lpPrice = await tokenPrices.get_usdc_busd_lp_Price();
        const ffStrategyLastStakeRewardsCake = (await ffStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const ffStrategyDeposits = (await ffStrategyContract.methods.furiofiStrategyDeposits().call()) / Math.pow(10, 18);
        const ffLastStakeRewardsDuration = await ffStrategyContract.methods.lastStakeRewardsDuration().call();
        const scStrategyLastStakeRewardsCake = (await scStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const scStrategyDeposits = (await scStrategyContract.methods.stablecoinStrategyDeposits().call()) / Math.pow(10, 18);
        const scLastStakeRewardsDuration = await scStrategyContract.methods.lastStakeRewardsDuration().call();
        const sdStrategyLastStakeRewardsCake = (await sdStrategyContract.methods.lastStakeRewardsCake().call()) / Math.pow(10, 18);
        const sdStrategyDeposits = (await sdStrategyContract.methods.standardStrategyDeposits().call()) / Math.pow(10, 18);
        const sdLastStakeRewardsDuration = await sdStrategyContract.methods.lastStakeRewardsDuration().call();

        const ffStrategyFarmBaseRewardsAPR = (ffStrategyLastStakeRewardsCake * cakePrice) / (ffStrategyDeposits * usdc_busd_lpPrice) * (365 * 24 * 3600) / ffLastStakeRewardsDuration;
        const scStrategyFarmBaseRewardsAPR = (scStrategyLastStakeRewardsCake * cakePrice) / (scStrategyDeposits * usdc_busd_lpPrice)* (365 * 24 * 3600) / scLastStakeRewardsDuration;
        const sdStrategyFarmBaseRewardsAPR = (sdStrategyLastStakeRewardsCake * cakePrice) / (sdStrategyDeposits * usdc_busd_lpPrice)* (365 * 24 * 3600) / sdLastStakeRewardsDuration;
 
        farmBaseRewardAprs["USDC-BUSD"] = {
            ffStrategy: ffStrategyFarmBaseRewardsAPR,
            scStrategy: scStrategyFarmBaseRewardsAPR,
            sdStrategy: sdStrategyFarmBaseRewardsAPR
        }
                                                                            
        return farmBaseRewardAprs["USDC-BUSD"];

    } catch (err) {
        // console.log(err);
        return farmBaseRewardAprs["USDC-BUSD"];
    }
}
