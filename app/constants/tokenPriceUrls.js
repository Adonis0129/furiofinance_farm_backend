const tokenPriceUrls = {
    cake: {
        apiId: "pancakeswap-token",
        url:   "https://api.coingecko.com/api/v3/simple/price?ids=pancakeswap-token&vs_currencies=usd"
    },
    bnb: {
        apiId: "binancecoin",
        url:   "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd",
    },
    usdc: {
        apiId: "usd-coin",
        url:   "https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd",
    },
    busd: {
        apiId: "binance-usd",
        url:   "https://api.coingecko.com/api/v3/simple/price?ids=binance-usd&vs_currencies=usd",
    },
    usdt: {
        apiId: "tether",
        url:   "https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd",
    },
    dai: {
        apiId: "dai",
        url:   "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=usd",
    },
    eth: {
        apiId: 'ethereum',
        url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    },
    btcb: {
        apiId: 'bitcoin',
        url: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    }
};


module.exports = tokenPriceUrls;
