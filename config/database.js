const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.v3uyutf.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('La connexion à la base de données a été établie avec succès.')
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
  }
};

module.exports =  { connectDB };