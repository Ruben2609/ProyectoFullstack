require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./tasks.routes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/tasks';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Servicio de Tasks conectado a MongoDB'))
  .catch(err => console.error('DB error:', err));

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Servicio de Tasks escuchando en http://localhost:${PORT}`);
});
