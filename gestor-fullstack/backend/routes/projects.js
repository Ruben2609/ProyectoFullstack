const router  = require('express').Router();
const Project = require('../models/Project');

// GET all
router.get('/', async (req, res) => {
  const list = await Project.find();
  res.json(list);
});

// POST create
router.post('/', async (req, res) => {
  const p = await Project.create({ name: req.body.name });
  res.status(201).json(p);
});

// PUT update
router.put('/:id', async (req, res) => {
  const p = await Project.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!p) return res.sendStatus(404);
  res.json(p);
});

// DELETE remove
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
