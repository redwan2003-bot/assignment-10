const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
  .then(() => console.log('MongoDB connection established successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const movieRoutes = require('./routes/movies');
app.use('/movies', movieRoutes);

app.get('/', (req, res) => {
  res.send('MovieMaster Pro Server is running');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
