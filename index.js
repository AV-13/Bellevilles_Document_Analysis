const express = require('express');
const { connectDB } = require('./config/database');
const uploadRoutes = require('./routes/uploadRoutes');
const quotationsRoutes = require('./routes/quotations');
const groupsRoutes = require('./routes/groups');

const cors = require('cors');


const port = 3031;
const app = express();
const path = require('path');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/upload', uploadRoutes);

app.use('/quotations', quotationsRoutes);

app.use('/groups', groupsRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  connectDB();
  console.log(`Server listening at http://localhost:${port}`);
});
