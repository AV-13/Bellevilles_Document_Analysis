const express = require('express');
const { connectDB } = require('./config/database');
const uploadRoutes = require('./routes/uploadRoutes');

const port = 3031;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${port}`);
});
