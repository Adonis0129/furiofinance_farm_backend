const addresses = {
    router: {
        56: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
        97: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3'
    },
    bnb: {
        56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        97: '0xae13d989dac2f0debff460ac112a837c89baa7cd'
    },
    usdc: {
        56: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        97: '0x9555f469d2Fc19Fa85D0B6184C3685950DC99291'
    },
    usdt: {
        56: '0x55d398326f99059fF775485246999027B3197955',
        97: '0x7F17cC78546c5270ba58Ffa6543F0a0Aa522616F'
    },
    busd: {
        56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        97: '0x1092fd5A7d29bE377678a516895c6F9d9A773572'
    },
    dai: {
        56: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
        97: '0x6d0893eE9FeAA890981Ed721569e8c82356E88b0'
    },
    eth: {
        56: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
        97: '0xC17a2D2a4dD5Bf66822BE1921858f882b0773067'
    },
    btcb: {
        56: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
        97: '0xAD99878bbe19FEE0F3A94d70daF4d04f1f62F733'
    },
    furfi: {
        56: '',
        97: '0xED72AF99857A9b5bE00A8723321FedC03aC1b256'
    },
    fusd: {
        56: '',
        97: '0xaC1bDDbB068504dAdE8C6b57f98c5F770032820E'
    },
    dai_busd_lp: {
        56: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
        97: '0x8fdf0418827865c2a12957B22Ea667520E1f6295'
    },
    usdc_busd_lp: {
        56: '0x2354ef4df11afacb85a5c7f98b624072eccddbb1', //?
        97: '0xD0163bA9aC8382241345A3Ed33f42c35E0139Ea4' // pancakeStableswap address
    },
    usdc_usdt_lp: {
        56: '0xec6557348085aa57c72514d67070dc863c0a5a8c', //?
        97: '0xFD6989510394a23a0aD98925AB0Ad5975Af66e10' // pancakeStableswap address
    },
    usdt_busd_lp: {
        56: '0x7efaef62fddcca950418312c6c91aef321375a00', //?
        97: '0xEF1fcdeB1C34BC099b1A8ee856F450cC2e31d291' // pancakeStableswap address
    },
    eth_usdc_lp: {
        56: '0xEa26B78255Df2bBC31C1eBf60010D78670185bD0',
        97: '0x22879E31624A89e90235268cB67D989fddF3C813'
    },
    btcb_busd_lp: {
        56: '0xF45cd219aEF8618A92BAa7aD848364a158a24F33',
        97: '0x957DD5D2A4cb5C293Bde94db26D1D8616c8ED3aC'
    },
    busd_bnb_lp: {
        56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
        97: '0xB3cC546096fe2642756F1cf2258b62B59E7A34Da'
    },
    bnb_furfi_lp: {
        56: '',
        97: '0xd734C3D6B79Fc236092Ef87E1ED35786ce2b800C'
    },
    stakingPool: {
        56: '',
        97: '0xF1be4C5B67d6A04B84564501727E59E32E761A6F'
    },
    referral: {
        56: '',
        97: '0x5cE6fc3D7a0b54E6A72E5E539DB63f4E137fa672'
    },
    freeze: {
        56: '',
        97: '0x562fbD3aDF2228DE180D705bE562a9be5bAD8ba1'
    },
    averagePriceOracle: {
        56: '',
        97: '0xd0c8C92EF231B9d7E88a50659080523B7A8547A7'
    },
    dai_busd: {
        furfiStrategy: {
            56: '',
            97: '0x91059CdB73C6994Ccf5A216fFD1B4df272FaC211',
        },
        standardStrategy: {
            56: '',
            97: '0x63f47F1863Fd642f6A952533640fE843Dd42772B',
        },
        stablecoinStrategy: {
            56: '',
            97: '0x7c5bdb9bb9b34B01827fE6b4ab9d86a72BCC4fE7',
        }
    },
    usdc_busd: {  //PancakeStableswap pool
        furfiStrategy: {
            56: '',
            97: '0x2925eC37f731a6866Be847B54a83732ae8971420',
        },
        standardStrategy: {
            56: '',
            97: '0xe2BE200e356122dFF048499De2CCb7fed79dFE53',
        },
        stablecoinStrategy: {
            56: '',
            97: '0x16BA032fEA6CA30A9dc70D46d0a76C6f6bA922f9',
        }
    },
    usdc_usdt: {  //PancakeStableswap pool
        furfiStrategy: {
            56: '',
            97: '0xddC9c2AEbcaD74489422cA7965111A7740A9C8F3',
        },
        standardStrategy: {
            56: '',
            97: '0xfeb2EE9915dc6e41cd6adcEDff0Cf554cdDB45be',
        },
        stablecoinStrategy: {
            56: '',
            97: '0x5f2f861E486fBf8915A089f70a6fc15Edd3edC5E',
        }
    },
    usdt_busd: {    //PancakeStableswap pool
        furfiStrategy: {
            56: '',
            97: '0x831Eb2fb49083c3D38e6C82e4958125cd2B5BD98',
        },
        standardStrategy: {
            56: '',
            97: '0x41f37586376724936B3989a9112D0E6000c1E3d1',
        },
        stablecoinStrategy: {
            56: '',
            97: '0x0e7D7a285f1aD7319782564d1C80C0478ddB2545',
        }
    },
    eth_usdc: {    
        furfiStrategy: {
            56: '',
            97: '0x74Fc3263A44623A92C70BF4e6361DBC3596E122B',
        },
        standardStrategy: {
            56: '',
            97: '0x658842b38EcB63ae83e92a2a89FDb8e9958229b5',
        },
        stablecoinStrategy: {
            56: '',
            97: '0x5102d3f79eEC43B2F45C2cf1989E22b4e413A783',
        }
    },
    btcb_busd : {    
        furfiStrategy: {
            56: '',
            97: '0xa4BAeA691d9ab9Fe1AACB8D446C3Ad03aaD4a024',
        },
        standardStrategy: {
            56: '',
            97: '0x3fd0323fE583Ef60287Ea7e39046093E5511f043',
        },
        stablecoinStrategy: {
            56: '',
            97: '0xffF7aCf18C19f4773359Af4Ce8F37E59ffF4a41e',
        }
    },
    busd_bnb  : {    
        furfiStrategy: {
            56: '',
            97: '0x732ee82B5680f0f4DA6576E0B1761b57b8125220',
        },
        standardStrategy: {
            56: '',
            97: '0x24b602d233fe85893Cf31dD9bAA827C6A46e1470',
        },
        stablecoinStrategy: {
            56: '',
            97: '0xf48F6cC53c89F80B6d73d0d3d65F14D2532A7016',
        }
    },
}


module.exports = addresses;