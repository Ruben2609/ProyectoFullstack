const router = require('express').Router();
const Team   = require('../models/Team');

// GET all
router.get('/', async (req, res) => {
  const list = await Team.find().populate('members', 'name'); 
  res.json(list);
});

// POST create
router.post('/', async (req, res) => {
  const { name, members } = req.body; // members: [userId,...]
  const t = await Team.create({ name, members });
  res.status(201).json(t);
});

// PUT update
router.put('/:id', async (req, res) => {
  const update = {};
  if (req.body.name    !== undefined) update.name    = req.body.name;
  if (req.body.members !== undefined) update.members = req.body.members;
  const t = await Team.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!t) return res.sendStatus(404);
  res.json(t);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
