const router = require('express').Router();
const Task   = require('../models/Task');

// GET all or filter by project: /api/tasks?project=ID
router.get('/', async (req, res) => {
  const filter = req.query.project
    ? { project: req.query.project }
    : {};
  const list = await Task.find(filter);
  res.json(list);
});

// POST create
router.post('/', async (req, res) => {
  const { title, project } = req.body;
  const t = await Task.create({ title, project });
  res.status(201).json(t);
});

// PUT toggle or update
router.put('/:id', async (req, res) => {
  const update = {};
  if (req.body.title  !== undefined) update.title  = req.body.title;
  if (req.body.done   !== undefined) update.done   = req.body.done;
  if (req.body.project!== undefined) update.project= req.body.project;
  const t = await Task.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!t) return res.sendStatus(404);
  res.json(t);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
