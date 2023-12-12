const { Client, ClientCredentials } = require('@lucidtech/las-sdk-node');
const { readFile } = require('fs/promises');
require('dotenv').config();

const client = new Client(new ClientCredentials(
  'https://api.lucidtech.ai/v1',
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'auth.lucidtech.ai',
));

async function useCradl(fileURL) {
  try {
    const fileContents = await readFile(fileURL);
    const documentResponse = await client.createDocument(fileContents, 'application/pdf');

    const prediction = await client.createPrediction(
      documentResponse.documentId,
      'las:model:fab26165f910442caa01674f87a463a1'
    );

    return prediction;
  
  } catch (error) {
    console.log("error zbi : ", error);
  }

}

module.exports = {useCradl};