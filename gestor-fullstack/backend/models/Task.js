const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  done:    { type: Boolean, default: false },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
}, { timestamps: true });
module.exports = mongoose.model('Task', taskSchema);
