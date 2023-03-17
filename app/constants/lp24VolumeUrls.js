const lp24VolumeUrls = {
    "dai_busd_lp" :   "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=dai", //pancakeswap_new
    "usdc_busd_lp" : "https://api.coingecko.com/api/v3/exchanges/pancakeswap_stableswap/tickers?coin_ids=usd-coin", //pancakeswap_stableswap
    "usdc_usdt_lp" : "https://api.coingecko.com/api/v3/exchanges/pancakeswap_stableswap/tickers?coin_ids=tether", //pancakeswap_stableswap
    "usdt_busd_lp" :  "https://api.coingecko.com/api/v3/exchanges/pancakeswap_stableswap/tickers?coin_ids=tether", //pancakeswap_stableswap
    "eth_usdc" : "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=weth", //pancakeswap_new
    "btcb_busd" : "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=binance-bitcoin", //pancakeswap_new
    "busd_bnb" : "https://api.coingecko.com/api/v3/exchanges/pancakeswap_new/tickers?coin_ids=wbnb" //pancakeswap_new
};

module.exports = lp24VolumeUrls;