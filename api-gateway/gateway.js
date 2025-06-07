require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const PROJECTS_SERVICE = process.env.PROJECTS_SERVICE_URL;
const TASKS_SERVICE = process.env.TASKS_SERVICE_URL;
const TEAMS_SERVICE = process.env.TEAMS_SERVICE_URL;

// Proxy de projects
app.use('/api/projects', async (req, res) => {
  const url = `${PROJECTS_SERVICE}${req.url}`;
  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error en proxy de projects:', err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Proxy de tasks
app.use('/api/tasks', async (req, res) => {
  const url = `${TASKS_SERVICE}${req.url}`;
  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error en proxy de tasks:', err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// Proxy de teams
app.use('/api/teams', async (req, res) => {
  const url = `${TEAMS_SERVICE}${req.url}`;
  try {
    const response = await axios({
      method: req.method,
      url,
      data: req.body
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Error en proxy de teams:', err.message);
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

//  Solo una vez
app.listen(PORT, () => {
  console.log(`API Gateway escuchando en http://localhost:${PORT}`);
});
