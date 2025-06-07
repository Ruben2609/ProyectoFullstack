require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Servicio de Teams conectado a MongoDB'))
  .catch((err) => console.error(' Error en conexión MongoDB:', err));

const teamRoutes = require('./team.routes');
app.use('/teams', teamRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Servicio de Teams escuchando en http://localhost:${PORT}`);
});
