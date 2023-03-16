const fetch = require("node-fetch");
const lp24VolumeUrls = require("../constants/lp24VolumeUrls");
let volumes = {}; //24h lp volume

const fetchLP24Volume = async (lpName) => {
    try {
        const str = lpName.split("_");
        const tokenName0 = str[0];
        const tokenName1 = str[1];

        const url = lp24VolumeUrls[lpName];
        const res = await fetch(url);
        const data = (await res.json()).tickers;
        for(var i = 0; i < data.length; i++){
            if(data[i].target == tokenName1.toUpperCase()) {
                volumes[lpName] = data[i].volume;
                return volumes[lpName];
            }
        }
    } catch (err) {
        // console.log(err);
        return volumes[lpName];
    }

};
module.exports = fetchLP24Volume;

