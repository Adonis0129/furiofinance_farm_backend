const {ChainIDs} = require("./chainId");

const BSC_MAINNET = {
    BNB :                           "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    ROUTER :                        "0x10ED43C718714eb63d5aA57B78B54704E256024E",
    USDC:                           "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    BUSD:                           "0xe9e7cea3dedca5984780bafc599bd69add087d56",
    USDT:                           "0x55d398326f99059fF775485246999027B3197955",
    DAI:                            "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
    DAI_BUSD:                       "0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489",
    USDC_BUSD:                      "0x2354ef4df11afacb85a5c7f98b624072eccddbb1", //
    USDC_USDT:                      "0xec6557348085aa57c72514d67070dc863c0a5a8c", //
    BUSD_USDT:                      "0x7efaef62fddcca950418312c6c91aef321375a00", //
    FURFI:                          "",
    BNB_FURFI:                      "",
    STAKINGPOOL:                    "",
    FURFIBNBFARM:                   "",
    AVERAGEPRICEORACLE:             "",
    DAI_BUSD_FURIOFISTRATEGY:       "",
    DAI_BUSD_STABLECOINSTRATEGY:    "",
    DAI_BUSD_STANDARDSTRATEGY:      "",
    USDC_BUSD_FURIOFISTRATEGY:      "",
    USDC_BUSD_STABLECOINSTRATEGY:   "",
    USDC_BUSD_STANDARDSTRATEGY:     "",
    USDC_USDT_FURIOFISTRATEGY:      "",
    USDC_USDT_STABLECOINSTRATEGY:   "",
    USDC_USDT_STANDARDSTRATEGY:     "",
    BUSD_USDT_FURIOFISTRATEGY:      "",
    BUSD_USDT_STABLECOINSTRATEGY:   "",
    BUSD_USDT_STANDARDSTRATEGY:     ""
};

const BSC_TESTNET = {
    BNB :                           "0xae13d989dac2f0debff460ac112a837c89baa7cd",
    ROUTER :                        "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3",
    USDC:                           "0x9555f469d2Fc19Fa85D0B6184C3685950DC99291",
    BUSD:                           "0x1092fd5A7d29bE377678a516895c6F9d9A773572",
    USDT:                           "0x7F17cC78546c5270ba58Ffa6543F0a0Aa522616F",
    DAI:                            "0x6d0893eE9FeAA890981Ed721569e8c82356E88b0",
    DAI_BUSD:                       "0x8fdf0418827865c2a12957B22Ea667520E1f6295",
    USDC_BUSD:                      "0xD0163bA9aC8382241345A3Ed33f42c35E0139Ea4",   //pancakeStableSwapLP
    USDC_USDT:                      "0xFD6989510394a23a0aD98925AB0Ad5975Af66e10",   //pancakeStableSwapLP
    BUSD_USDT:                      "0xEF1fcdeB1C34BC099b1A8ee856F450cC2e31d291",   //pancakeStableSwapLP
    FURFI:                          "0xED72AF99857A9b5bE00A8723321FedC03aC1b256",
    BNB_FURFI:                      "0xd734C3D6B79Fc236092Ef87E1ED35786ce2b800C",
    STAKINGPOOL:                    "0xF1be4C5B67d6A04B84564501727E59E32E761A6F",
    FURFIBNBFARM:                   "0xaB22B365e7E497bcE180efcb31026a7ACc3d7627",
    AVERAGEPRICEORACLE:             "0xd0c8C92EF231B9d7E88a50659080523B7A8547A7",
    DAI_BUSD_FURIOFISTRATEGY:       "0x91059CdB73C6994Ccf5A216fFD1B4df272FaC211",
    DAI_BUSD_STABLECOINSTRATEGY:    "0x7c5bdb9bb9b34B01827fE6b4ab9d86a72BCC4fE7",
    DAI_BUSD_STANDARDSTRATEGY:      "0x63f47F1863Fd642f6A952533640fE843Dd42772B",
    USDC_BUSD_FURIOFISTRATEGY:      "0x2925eC37f731a6866Be847B54a83732ae8971420",
    USDC_BUSD_STABLECOINSTRATEGY:   "0x16BA032fEA6CA30A9dc70D46d0a76C6f6bA922f9",
    USDC_BUSD_STANDARDSTRATEGY:     "0xe2BE200e356122dFF048499De2CCb7fed79dFE53",
    USDC_USDT_FURIOFISTRATEGY:      "0xddC9c2AEbcaD74489422cA7965111A7740A9C8F3",
    USDC_USDT_STABLECOINSTRATEGY:   "0x5f2f861E486fBf8915A089f70a6fc15Edd3edC5E",
    USDC_USDT_STANDARDSTRATEGY:     "0xfeb2EE9915dc6e41cd6adcEDff0Cf554cdDB45be",
    BUSD_USDT_FURIOFISTRATEGY:      "0x831Eb2fb49083c3D38e6C82e4958125cd2B5BD98",
    BUSD_USDT_STABLECOINSTRATEGY:   "0x0e7D7a285f1aD7319782564d1C80C0478ddB2545",
    BUSD_USDT_STANDARDSTRATEGY:     "0x41f37586376724936B3989a9112D0E6000c1E3d1"
};

const getAddresses = (chainID, name) => {
    if(chainID === ChainIDs.BSCmainnet){
        if(name === "BNB")                          return BSC_MAINNET.BNB;
        if(name === "ROUTER")                       return BSC_MAINNET.ROUTER;
        if(name === "USDC")                         return BSC_MAINNET.USDC;
        if(name === "BUSD")                         return BSC_MAINNET.BUSD;
        if(name === "USDT")                         return BSC_MAINNET.USDT;
        if(name === "DAI")                          return BSC_MAINNET.DAI;
        if(name === "USDC_BUSD")                    return BSC_MAINNET.USDC_BUSD;
        if(name === "USDC_USDT")                    return BSC_MAINNET.USDC_USDT;
        if(name === "DAI_BUSD")                     return BSC_MAINNET.DAI_BUSD;
        if(name === "BUSD_USDT")                    return BSC_MAINNET.BUSD_USDT;
        if(name === "FURFI")                        return BSC_MAINNET.FURFI;
        if(name === "BNB_FURFI")                    return BSC_MAINNET.BNB_FURFI;
        if(name === "STAKINGPOOL")                  return BSC_MAINNET.STAKINGPOOL;
        if(name === "FURFIBNBFARM")                 return BSC_MAINNET.FURFIBNBFARM;
        if(name === "AVERAGEPRICEORACLE")           return BSC_MAINNET.AVERAGEPRICEORACLE;
        if(name === "DAI_BUSD_FURIOFISTRATEGY")     return BSC_MAINNET.DAI_BUSD_FURIOFISTRATEGY;
        if(name === "DAI_BUSD_STABLECOINSTRATEGY")  return BSC_MAINNET.DAI_BUSD_STABLECOINSTRATEGY;
        if(name === "DAI_BUSD_STANDARDSTRATEGY")    return BSC_MAINNET.DAI_BUSD_STANDARDSTRATEGY;
        if(name === "USDC_BUSD_FURIOFISTRATEGY")    return BSC_MAINNET.USDC_BUSD_FURIOFISTRATEGY;
        if(name === "USDC_BUSD_STABLECOINSTRATEGY") return BSC_MAINNET.USDC_BUSD_STABLECOINSTRATEGY;
        if(name === "USDC_BUSD_STANDARDSTRATEGY")   return BSC_MAINNET.USDC_BUSD_STANDARDSTRATEGY;
        if(name === "USDC_USDT_FURIOFISTRATEGY")    return BSC_MAINNET.USDC_USDT_FURIOFISTRATEGY;
        if(name === "USDC_USDT_STABLECOINSTRATEGY") return BSC_MAINNET.USDC_USDT_STABLECOINSTRATEGY;
        if(name === "USDC_USDT_STANDARDSTRATEGY")   return BSC_MAINNET.USDC_USDT_STANDARDSTRATEGY;
        if(name === "BUSD_USDT_FURIOFISTRATEGY")    return BSC_MAINNET.BUSD_USDT_FURIOFISTRATEGY;
        if(name === "BUSD_USDT_STABLECOINSTRATEGY") return BSC_MAINNET.BUSD_USDT_STABLECOINSTRATEGY;
        if(name === "BUSD_USDT_STANDARDSTRATEGY")   return BSC_MAINNET.BUSD_USDT_STANDARDSTRATEGY;
    }

    if(chainID === ChainIDs.BSCtestnet){
        if(name === "BNB")                          return BSC_TESTNET.BNB;
        if(name === "ROUTER")                       return BSC_TESTNET.ROUTER;
        if(name === "USDC")                         return BSC_TESTNET.USDC;
        if(name === "BUSD")                         return BSC_TESTNET.BUSD;
        if(name === "USDT")                         return BSC_TESTNET.USDT;
        if(name === "DAI")                          return BSC_TESTNET.DAI;
        if(name === "DAI_BUSD")                     return BSC_TESTNET.DAI_BUSD;
        if(name === "USDC_BUSD")                    return BSC_TESTNET.USDC_BUSD;
        if(name === "USDC_USDT")                    return BSC_TESTNET.USDC_USDT;
        if(name === "BUSD_USDT")                    return BSC_TESTNET.BUSD_USDT;
        if(name === "FURFI")                        return BSC_TESTNET.FURFI;
        if(name === "BNB_FURFI")                    return BSC_TESTNET.BNB_FURFI;
        if(name === "STAKINGPOOL")                  return BSC_TESTNET.STAKINGPOOL;
        if(name === "FURFIBNBFARM")                 return BSC_TESTNET.FURFIBNBFARM;
        if(name === "AVERAGEPRICEORACLE")           return BSC_TESTNET.AVERAGEPRICEORACLE;
        if(name === "DAI_BUSD_FURIOFISTRATEGY")     return BSC_TESTNET.DAI_BUSD_FURIOFISTRATEGY;
        if(name === "DAI_BUSD_STABLECOINSTRATEGY")  return BSC_TESTNET.DAI_BUSD_STABLECOINSTRATEGY;
        if(name === "DAI_BUSD_STANDARDSTRATEGY")    return BSC_TESTNET.DAI_BUSD_STANDARDSTRATEGY;
        if(name === "USDC_BUSD_FURIOFISTRATEGY")    return BSC_TESTNET.USDC_BUSD_FURIOFISTRATEGY;
        if(name === "USDC_BUSD_STABLECOINSTRATEGY") return BSC_TESTNET.USDC_BUSD_STABLECOINSTRATEGY;
        if(name === "USDC_BUSD_STANDARDSTRATEGY")   return BSC_TESTNET.USDC_BUSD_STANDARDSTRATEGY;
        if(name === "USDC_USDT_FURIOFISTRATEGY")    return BSC_TESTNET.USDC_USDT_FURIOFISTRATEGY;
        if(name === "USDC_USDT_STABLECOINSTRATEGY") return BSC_TESTNET.USDC_USDT_STABLECOINSTRATEGY;
        if(name === "USDC_USDT_STANDARDSTRATEGY")   return BSC_TESTNET.USDC_USDT_STANDARDSTRATEGY;
        if(name === "BUSD_USDT_FURIOFISTRATEGY")    return BSC_TESTNET.BUSD_USDT_FURIOFISTRATEGY;
        if(name === "BUSD_USDT_STABLECOINSTRATEGY") return BSC_TESTNET.BUSD_USDT_STABLECOINSTRATEGY;
        if(name === "BUSD_USDT_STANDARDSTRATEGY")   return BSC_TESTNET.BUSD_USDT_STANDARDSTRATEGY;
    }

    throw Error("Don't support!");
};

module.exports = getAddresses;