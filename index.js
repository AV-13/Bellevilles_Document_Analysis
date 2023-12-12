const express = require('express');
const { connectDB } = require('./config/database');
const port = 3000;

const app = express();

// useCradl().then(res => console.log('HOP', res));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${port}`);
});

