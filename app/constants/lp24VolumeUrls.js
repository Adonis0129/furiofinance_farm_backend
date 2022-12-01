const lp24VolumeUrls = {
    USDC_OTHER: "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=usd-coin",
    DAI_BUSD:   "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=dai",
    BUSD_USDT:  "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=binance-usd"
};

const getLp24VolumeUrls = (lpName) => {
    if(lpName === "USDC-BUSD")      return lp24VolumeUrls.USDC_OTHER;
    if(lpName === "USDC-USDT")      return lp24VolumeUrls.USDC_OTHER;
    if(lpName === "DAI-BUSD")       return lp24VolumeUrls.DAI_BUSD;
    if(lpName === "BUSD-USDT")      return lp24VolumeUrls.BUSD_USDT;
    throw Error("Don't support!");
};
module.exports = getLp24VolumeUrls;