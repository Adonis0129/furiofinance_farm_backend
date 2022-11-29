const fetch = require("node-fetch");

let volumes = {}; //24h lp volume

exports.fetch_usdc_busd_LPVolume = async () => {
    try {
        const url = "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=usd-coin";
        const res = await fetch(url);
        const data = (await res.json()).tickers;
        for(var i = 0; i < data.length; i++){
            if(data[i].target == "BUSD") {
                volumes["USDC-BUSD"] = data[i].volume;
                return volumes["USDC-BUSD"];
            }
        }
    } catch (err) {
        // console.log(err);
        return volumes["USDC-BUSD"];
    }

};

// exports.getLPVolume = (symbol) => {
//     return Number(volumes[symbol]);
// };
