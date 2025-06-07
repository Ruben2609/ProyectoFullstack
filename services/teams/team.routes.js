const express = require('express');
const router = express.Router();
const Team = require('./team.model');

// Crear equipo
router.post('/', async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    const saved = await newTeam.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener equipos
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
