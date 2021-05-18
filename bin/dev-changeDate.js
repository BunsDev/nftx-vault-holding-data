// Getting the Mogo stuff going

const {MongoClient} = require('mongodb');

async function main(){
     const uri = "mongodb+srv://nftxAdmin:37BHRYOg0Q5G610Q@cluster0.8vola.mongodb.net/dev-nftxHoldings?retryWrites=true&w=majority";
     const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

         await  client.db("dev_nftxHoldings").collection("dev_nftxvaultholdings").aggregate(
            {
              '$set': {
                'fundDate': {
                  '$toDate': '$fundDate'
                }
              }
            });


    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}



main().catch(console.error);