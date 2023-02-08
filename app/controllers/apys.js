const getAddresses = require("../constants/addresses");
const { ChainIDs } = require("../constants/chainId");
const getLpRewardAPR = require("../helpers/getLPRewardAprs");
const getFarmBaseRewardAPR = require("../helpers/getFarmBaseRewardAprs");
const getStakingPoolApr = require("../helpers/getStakingPoolApr");
const getFurFiBNBFarmApr = require("../helpers/getFurFIBNBFarmApr");
const getRewardFromMint = require("../helpers/getRewardFromMint");
const tokenPrices = require("../helpers/getTokenPrices");

const poolNames = ["DAI_BUSD", "USDC_BUSD", "USDC_USDT", "BUSD_USDT"];
// const poolNames = ["BUSD_USDT"];

let apys = {};

exports.calculateAndSave = async () => {
  try {
    // current date
    var date_ob = new Date();
    var date = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    
    var strDate = (year +"-" +month +"-" +date +" " +hours +":" +minutes +":" +seconds).toString();
    var bnbPrice = await tokenPrices.fetchTokenPrices("BNB");
    // var furFiPrice = await tokenPrices.get_FurFi_Price();
    // var stakingPoolApr = await getStakingPoolApr();
    // var furFiBNBFarmApr = await getFurFiBNBFarmApr();
    // var efficiencyLevel = furFiBNBFarmApr.efficiencyLevel;
    // var furFiBnbPrice = furFiBNBFarmApr.furFiBnbPrice;
    // var instances = [];
    // var tvl = 0;

    // for(var i=0; i < poolNames.length; i++){

    //   var lpName = poolNames[i]
    //   var lpPrice = await tokenPrices.getLpPrices(lpName);
    //   var lpRewardsAPR = await getLpRewardAPR(lpName);
    //   var farmBaseRewardsAPR = await getFarmBaseRewardAPR(poolNames[i]) ?? {};
    //   var rewardFromMint = await getRewardFromMint();

    //   // stablecoin strategy
    //   var scStrategyName = (poolNames[i] + "_" + "STABLECOINSTRATEGY").toString();
    //   var scStrategyAddress = getAddresses(ChainIDs.BSCtestnet, scStrategyName);
    //   var scStrategyFarmBaseAPR = farmBaseRewardsAPR.scStrategy;
    //   var scReinvest = scStrategyFarmBaseAPR * 0.97;
    //   var scStrategyAPY = lpRewardsAPR + Math.pow(1 + scReinvest / 365, 365) - 1;

    //   // standard strategy
    //   var sdStrategyName = (poolNames[i] + "_" + "STANDARDSTRATEGY").toString();
    //   var sdStrategyAddress = getAddresses(ChainIDs.BSCtestnet, sdStrategyName);
    //   var sdStrategyFarmBaseAPR = farmBaseRewardsAPR.sdStrategy;
    //   var sdReinvest = sdStrategyFarmBaseAPR * 0.7;
    //   if(furFiBnbPrice >= efficiencyLevel){
    //     var additionalMintAPR = sdStrategyFarmBaseAPR * 0.06 * (1 + rewardFromMint.rewardPerUSD)
    //     var sdStrategyAPY = lpRewardsAPR + Math.pow(1 + sdReinvest / 365, 365) - 1 + sdStrategyFarmBaseAPR * 0.24 + additionalMintAPR;
    //   }
    //   else{
    //     var additionalMintAPR = sdStrategyFarmBaseAPR * 0.30 * (1 + rewardFromMint.rewardPerUSD)
    //     var sdStrategyAPY = lpRewardsAPR + Math.pow(1 + sdReinvest / 365, 365) - 1 + additionalMintAPR;
    //   }

    //   //furfi strategy
    //   var ffStrategyName = (poolNames[i] + "_" + "FURIOFISTRATEGY").toString();
    //   var ffStrategyAddress = getAddresses(ChainIDs.BSCtestnet, ffStrategyName);   
    //   var ffStrategyFarmBaseAPR = farmBaseRewardsAPR.ffStrategy;
    //   if(furFiBnbPrice >= efficiencyLevel){
    //     var additionalMintAndStakedAPR = ( ffStrategyFarmBaseAPR * 0.94 + ffStrategyFarmBaseAPR * 0.06 * (1 + rewardFromMint.rewardPerUSD)) * (1 + stakingPoolApr)
    //     var ffStrategyAPY = lpRewardsAPR + additionalMintAndStakedAPR;
    //   }
    //   else{
    //     var additionalMintAndStakedAPR = ( ffStrategyFarmBaseAPR * 0.70 + ffStrategyFarmBaseAPR * 0.30 * (1 + rewardFromMint.rewardPerUSD)) * (1 + stakingPoolApr)
    //     var ffStrategyAPY = lpRewardsAPR + additionalMintAndStakedAPR;
    //   }

    //   var data = {
    //       poolName: poolNames[i],
    //       lpPrice: lpPrice,
    //       tvl: farmBaseRewardsAPR.tvl,
    //       lpRewardsAPR: lpRewardsAPR * 100,
    //       stablecoinStrategy: {
    //         Address: scStrategyAddress,
    //         FarmBaseAPR: scStrategyFarmBaseAPR * 100,
    //         Apy: scStrategyAPY * 100,
    //       },
    //       standardStrategy: {
    //         Address: sdStrategyAddress,
    //         FarmBaseAPR: sdStrategyFarmBaseAPR * 100,
    //         additionalMintAPR: additionalMintAPR * 100,
    //         Apy: sdStrategyAPY * 100,
    //       },
    //       furfiStrategy: {
    //         Address: ffStrategyAddress,
    //         FarmBaseAPR: ffStrategyFarmBaseAPR * 100,
    //         additionalMintAndStakedAPR: additionalMintAndStakedAPR * 100,
    //         Apy: ffStrategyAPY * 100,
    //       },
    //     };

    //     instances.push(data);
    //     tvl += farmBaseRewardsAPR.tvl;

    // }

    apys = {
      date: strDate,
      bnbPrice: bnbPrice,
      // furFiPrice: furFiPrice,
      // efficiencyLevel: efficiencyLevel,
      // furFiBnbPrice: furFiBnbPrice,
      // tvl: tvl,
      // stakingPoolApr: stakingPoolApr,
      // furFiBNBFarmApr: furFiBNBFarmApr,
      // instances: instances,
    };


    console.log(apys);
  } catch (err) {
    // console.log(err);
    console.log("return previous data");
  }
};

exports.getAPYS = (req, res) => {
  res.status(200).send(apys);
  return;
};
