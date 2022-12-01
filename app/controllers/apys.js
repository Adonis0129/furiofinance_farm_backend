const getAddresses = require("../constants/addresses");
const { ChainIDs } = require("../constants/chainId");
const lpRewardAPRs = require("../helpers/getLPRewardAprs");
const farmBaseRewardAprs = require("../helpers/getFarmBaseRewardAprs");
const getStakingPoolApr = require("../helpers/getStakingPoolApr");
const getRewardFromMint = require("../helpers/getRewardFromMint");

let apys = {};

exports.calculateAndSave = async () => {
  try {
    // current date
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const strDate = (year +"-" +month +"-" +date +" " +hours +":" +minutes +":" +seconds).toString();

    const stakingPoolApr = await getStakingPoolApr();
    const addresses = getAddresses(ChainIDs.BSCtestnet);

    ///// usdc_busd pair /////
    const usdc_busd_lpRewardsAPR = await lpRewardAPRs.get_usdc_busd_lpRewardAPR();
    const usdc_busd_farmBaseRewardsAPR = await farmBaseRewardAprs.get_usdc_busd_farmBaseRewardAPR();
    const rewardFromMint = await getRewardFromMint();
    // stablecoin strategy
    const usdc_busd_scStrategy_address = addresses.USDC_BUSD_STABLECOINSTRATEGY_ADDRESS;
    const usdc_busd_scStrategy_farmBaseAPR = usdc_busd_farmBaseRewardsAPR.scStrategy;
    const scReinvest = usdc_busd_scStrategy_farmBaseAPR * 0.97;
    const usdc_busd_scStrategy_apy = 
        usdc_busd_lpRewardsAPR + 
        Math.pow(1 + scReinvest / 365, 365) - 1;

    // standard strategy
    const usdc_busd_sdStrategy_address = addresses.USDC_BUSD_STANDARDSTRATEGY_ADDRESS;
    const usdc_busd_sdStrategy_farmBaseAPR = usdc_busd_farmBaseRewardsAPR.sdStrategy;
    const sdReinvest = usdc_busd_sdStrategy_farmBaseAPR * 0.7;
    const usdc_busd_sdStrategy_apy =
        usdc_busd_lpRewardsAPR +
        Math.pow(1 + sdReinvest / 365, 365) - 1 +
        usdc_busd_sdStrategy_farmBaseAPR * 0.24 +
        usdc_busd_sdStrategy_farmBaseAPR * 0.06 * (1 + rewardFromMint);

    // furiofi strategy
    const usdc_busd_ffStrategy_address = addresses.USDC_BUSD_FURIOFISTRATEGY_ADDRESS;
    const usdc_busd_ffStrategy_farmBaseAPR = usdc_busd_farmBaseRewardsAPR.ffStrategy;
    const usdc_busd_ffStrategy_apy =
        usdc_busd_lpRewardsAPR +
        (
            usdc_busd_ffStrategy_farmBaseAPR * 0.94 + usdc_busd_ffStrategy_farmBaseAPR * 0.06 * (1 + rewardFromMint)
        ) * (1 + stakingPoolApr);

    const instances = {
      usdc_busd: {
        lpRewardsAPR: usdc_busd_lpRewardsAPR * 100,
        stableCoinStrategy: {
          Address: usdc_busd_scStrategy_address,
          FarmBaseAPR: usdc_busd_scStrategy_farmBaseAPR * 100,
          Apy: usdc_busd_scStrategy_apy * 100,
        },
        standardStrategy: {
          Address: usdc_busd_sdStrategy_address,
          FarmBaseAPR: usdc_busd_sdStrategy_farmBaseAPR * 100,
          Apy: usdc_busd_sdStrategy_apy * 100,
        },
        furiofiStrategy: {
          Address: usdc_busd_ffStrategy_address,
          FarmBaseAPR: usdc_busd_ffStrategy_farmBaseAPR * 100,
          Apy: usdc_busd_ffStrategy_apy * 100,
        },
      },
    };

    apys = {
      date: strDate,
      stakingPoolApr: stakingPoolApr,
      rewardFromAdditionalMint: rewardFromMint,
      instances: instances,

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
