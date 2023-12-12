const express = require('express');
const { connectDB } = require('./config/database');
const port = 3000;

const { registerQuotation } = require('./controllers/quotationController');


const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  connectDB();
  registerQuotation();
  console.log(`Server listening at http://localhost:${port}`);
});

