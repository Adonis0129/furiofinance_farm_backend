const lpRewardAPRs = require("../helpers/getLPRewardAprs");
const blockRewardAprs = require("../helpers/getBlockRewardAprs");
const get_stakingPoolApr = require("../helpers/getStakingPoolApr");
let apys = {};

exports.calculateAndSave = async () => {

    try{
        // current date
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const strDate = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds).toString();

        //usdc_busd pair
        const usdc_busd_lpRewardsAPR = await lpRewardAPRs.get_usdc_busd_lpRewardAPR();
        const usdc_busd_blockRewardsAPR = await blockRewardAprs.get_usdc_busd_blockRewardAPR();
        const stakingPoolApr = await get_stakingPoolApr();


        apys = {
            date: strDate,
            usdc_busd_lpRewardsAPR: usdc_busd_lpRewardsAPR,
            usdc_busd_ffStrategy_blockRewardsAPR: usdc_busd_blockRewardsAPR.ffStrategy,
            usdc_busd_scStrategy_blockRewardsAPR: usdc_busd_blockRewardsAPR.scStrategy,
            usdc_busd_sdStrategy_blockRewardsAPR: usdc_busd_blockRewardsAPR.sdStrategy,
            stakingPoolApr: stakingPoolApr
        }

        console.log(apys);

    } catch(err) {
        // console.log(err);
        console.log("return previous data");
    }
}


exports.getAPYS = (req, res) => {
    res.status(200).send(apys);
    return;
}

