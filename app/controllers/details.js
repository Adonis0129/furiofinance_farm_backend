const addresses = require("../constants/addresses");
const DEFAULT_CHAINID = require("../constants/chainId");
const getLpRewardAPR = require("../helpers/getLPRewardAprs");
const getFarmBaseRewardAPR = require("../helpers/getFarmBaseRewardAprs");
const getStakingPoolApr = require("../helpers/getStakingPoolApr");
const getRewardFromMint = require("../helpers/getRewardFromMint");
const tokenPrices = require("../helpers/getTokenPrices");

const poolNames = ["dai_busd", "usdc_busd", "usdc_usdt", "usdt_busd", "eth_usdc", "btcb_busd", "busd_bnb"];

let details = {};

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

    // fetch all token prices - use to lpPrices
    var bnbPrice = await tokenPrices.fetchTokenPrices("bnb");
    var usdcPrice = await tokenPrices.fetchTokenPrices('usdc');
    var busdPrice = await tokenPrices.fetchTokenPrices('busd');
    var usdtPrice = await tokenPrices.fetchTokenPrices('usdt');
    var daiPrice = await tokenPrices.fetchTokenPrices('dai');
    var ethPrice = await tokenPrices.fetchTokenPrices('eth');
    var btcbPrice = await tokenPrices.fetchTokenPrices('btcb');
    var cakePrice =await tokenPrices.fetchTokenPrices('cake');
    var furFiPrice = await tokenPrices.fetchFurfiPrice();
    var bnb_furfi_lp_Price = await tokenPrices.fetch_bnb_furfi_lp_Price();

 
    var stakingPoolApr = await getStakingPoolApr();
    var rewardFromMint = await getRewardFromMint();
    var rewardPerUSD = rewardFromMint.rewardPerUSD;
    var efficiencyLevel = rewardFromMint.efficiencyLevel;
    var furFiBnbPrice = rewardFromMint.furFiBnbPrice;
    var instances = [];
    var tvl = 0;


    for(var i=0; i < poolNames.length; i++){

      var lpName = (poolNames[i] + '_lp').toString();
      var lpPrice = await tokenPrices.fetchLpPrices(lpName);
      var lpRewardsAPR =  await getLpRewardAPR(lpName);
      var farmBaseRewardsAPR = await getFarmBaseRewardAPR(poolNames[i]) ?? {};

      // stablecoin strategy
      var scStrategyAddress = addresses[poolNames[i]]['stablecoinStrategy'][DEFAULT_CHAINID];
      var scStrategyFarmBaseAPR = farmBaseRewardsAPR.scStrategy;
      var scReinvest = scStrategyFarmBaseAPR * 0.97;
      var scStrategyAPY = lpRewardsAPR + Math.pow(1 + scReinvest / 365, 365) - 1;

      // standard strategy
      var sdStrategyAddress = addresses[poolNames[i]]['standardStrategy'][DEFAULT_CHAINID];
      var sdStrategyFarmBaseAPR = farmBaseRewardsAPR.sdStrategy;
      var sdReinvest = sdStrategyFarmBaseAPR * 0.7;
      if(furFiBnbPrice >= efficiencyLevel){
        var additionalMintAPR = sdStrategyFarmBaseAPR * 0.06 * (1 + rewardPerUSD)
        var sdStrategyAPY = lpRewardsAPR + Math.pow(1 + sdReinvest / 365, 365) - 1 + sdStrategyFarmBaseAPR * 0.24 + additionalMintAPR;
      }
      else{
        var additionalMintAPR = sdStrategyFarmBaseAPR * 0.30 * (1 + rewardPerUSD)
        var sdStrategyAPY = lpRewardsAPR + Math.pow(1 + sdReinvest / 365, 365) - 1 + additionalMintAPR;
      }

      //furfi strategy
      var ffStrategyAddress = addresses[poolNames[i]]['furfiStrategy'][DEFAULT_CHAINID];   
      var ffStrategyFarmBaseAPR = farmBaseRewardsAPR.ffStrategy;
      if(furFiBnbPrice >= efficiencyLevel){
        var additionalMintAndStakedAPR = ( ffStrategyFarmBaseAPR * 0.94 + ffStrategyFarmBaseAPR * 0.06 * (1 + rewardPerUSD)) * (1 + stakingPoolApr)
        var ffStrategyAPY = lpRewardsAPR + additionalMintAndStakedAPR;
      }
      else{
        var additionalMintAndStakedAPR = ( ffStrategyFarmBaseAPR * 0.70 + ffStrategyFarmBaseAPR * 0.30 * (1 + rewardPerUSD)) * (1 + stakingPoolApr)
        var ffStrategyAPY = lpRewardsAPR + additionalMintAndStakedAPR;
      }

      var data = {
          poolName: poolNames[i],
          lpPrice: lpPrice,
          tvl: farmBaseRewardsAPR.tvl,
          lpRewardsAPR: lpRewardsAPR * 100,
          stablecoinStrategy: {
            Address: scStrategyAddress,
            FarmBaseAPR: scStrategyFarmBaseAPR * 100,
            Apy: scStrategyAPY * 100,
          },
          standardStrategy: {
            Address: sdStrategyAddress,
            FarmBaseAPR: sdStrategyFarmBaseAPR * 100,
            additionalMintAPR: additionalMintAPR * 100,
            Apy: sdStrategyAPY * 100,
          },
          furfiStrategy: {
            Address: ffStrategyAddress,
            FarmBaseAPR: ffStrategyFarmBaseAPR * 100,
            additionalMintAndStakedAPR: additionalMintAndStakedAPR * 100,
            Apy: ffStrategyAPY * 100,
          },
        };

        instances.push(data);
        tvl += farmBaseRewardsAPR.tvl;

    }

    details = {
      date: strDate,
      bnbPrice: bnbPrice,
      furFiPrice: furFiPrice,
      bnb_furfi_lp_Price: bnb_furfi_lp_Price,
      efficiencyLevel: efficiencyLevel,
      furFiBnbPrice: furFiBnbPrice,
      tvl: tvl,
      stakingPoolApr: stakingPoolApr * 100,
      instances: instances,
    };

    console.log(details);

  } catch (err) {
    // console.log(err);
    console.log("return previous data");
  }
};

exports.getDetails = (req, res) => {
  res.status(200).send(details);
  return;
};
