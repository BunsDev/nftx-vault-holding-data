const fetch = require('node-fetch');
const nftxUrl = "https://nftx.ethereumdb.com/v1/vaults/";
let nftxFundMongoArray = [];



const getVaults = async () => {
    await fetch(nftxUrl)
        .then((response) => response.json())
        .then((vaults) => {
            saveVaults(vaults);
          //  console.log(nftxFundMongoArray);
        })
        .catch((err) => console.log(err));
};

const saveVaults = function (vaults) {
    const dateFetch = Date.now();
    vaults.map(function (vault){
        nftxFundMongoArray.push({vaultId: vault.vaultId,vaultHoldings: vault.holdings.length,fundToken: vault.fundToken.name, fundTokenAddress: vault.fundToken.address, nftAddress: vault.asset.address, price: vault.price, priceEth: vault.priceEth, fundDate: new Date(dateFetch), })
    })
}


// Getting the Mogo stuff going

const {MongoClient} = require('mongodb');

async function main(){
     const uri = "mongodb+srv://nftxAdmin:37BHRYOg0Q5G610Q@cluster0.8vola.mongodb.net/nftxHoldings?retryWrites=true&w=majority";
     const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Create 3 new listings
        await getVaults();
        await createMultipleListings(client, nftxFundMongoArray);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}



main().catch(console.error);


async function createMultipleListings(client, newListings) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertMany for the insertMany() docs
    const result = await client.db("nftxHoldings").collection("nftxvaultholdings").insertMany(newListings);

    console.log(`${result.insertedCount} new listing(s) created with the following id(s):`);
    console.log(result.insertedIds);
}



