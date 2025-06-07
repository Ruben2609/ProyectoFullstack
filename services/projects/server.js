require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const projectRoutes = require('./projects.routes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' Servicio de Projects conectado a MongoDB');
    app.listen(PORT, () => console.log(` Servicio de Projects escuchando en http://localhost:${PORT}`));
  })
  .catch(err => console.error('Error conectando:', err));
