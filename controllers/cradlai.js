const { Client, ClientCredentials } = require('@lucidtech/las-sdk-node');
const { readFile } = require('fs/promises');
require('dotenv').config();

const client = new Client(new ClientCredentials(
  'https://api.lucidtech.ai/v1',
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'auth.lucidtech.ai',
));

async function useCradl() {
  try {
    const fileContents = await readFile('public/img/devis.png');
    const documentResponse = await client.createDocument(fileContents, 'application/pdf');

    const prediction = await client.createPrediction(
      documentResponse.documentId,
      'las:model:3d5096b8ef0846bc849dd8bfc38adf65'
    );
      // dev model 'las:model:fab26165f910442caa01674f87a463a1'
    return prediction;

  } catch (error) {
    console.log("error using Cradl : ", error);
  }

}

module.exports = {useCradl};