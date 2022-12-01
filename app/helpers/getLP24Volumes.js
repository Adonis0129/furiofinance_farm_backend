const { model } = require("mongoose");
const fetch = require("node-fetch");
const getLp24VolumeUrls = require("../constants/lp24VolumeUrls");
let volumes = {}; //24h lp volume

const fetchLP24Volume = async (name) => {
    try {
        const str = name.split("-");
        const tokenName0 = str[0];
        const tokenName1 = str[1];

        const url = getLp24VolumeUrls(name);
        const res = await fetch(url);
        const data = (await res.json()).tickers;
        for(var i = 0; i < data.length; i++){
            if(data[i].target == tokenName1) {
                volumes[name] = data[i].volume;
                return volumes[name];
            }
        }
    } catch (err) {
        // console.log(err);
        return volumes[name];
    }

};
module.exports = fetchLP24Volume;

