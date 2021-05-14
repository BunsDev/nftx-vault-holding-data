const fetch = require('node-fetch');
const nftxUrl = "https://nftx.ethereumdb.com/v1/vaults/";
let nftxFundMongoArray = [];


const getVaults = async () => {
    await fetch(nftxUrl)
        .then((response) => response.json())
        .then((vaults) => {
            saveVaults(vaults);
            console.log(nftxFundMongoArray);
        })
        .catch((err) => console.log(err));
};

getVaults();

const saveVaults = function (vaults) {
    const dateFetch = Date.now();
    vaults.map(function (vault){
        nftxFundMongoArray.push({vaultId: vault.vaultId,vaultHoldings: vault.holdings.length,fundToken: vault.fundToken.name, fundTokenAddress: vault.fundToken.address, nftAddress: vault.asset.address, price: vault.price, priceEth: vault.priceEth, fundDate: dateFetch, })
    })
}

