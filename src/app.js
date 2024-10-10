const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a Task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Pending' }
});

const Task = mongoose.model('Task', taskSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

app.put('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send({ message: 'Task deleted' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
