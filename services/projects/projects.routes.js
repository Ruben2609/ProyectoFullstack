const express = require('express');
const router = express.Router();
const Project = require('./projects.model');

// GET todos los proyectos
router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

// POST crear nuevo proyecto
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

// PUT actualizar proyecto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
});

// DELETE eliminar proyecto
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
