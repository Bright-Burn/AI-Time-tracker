// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tasks = [];

// Создание задачи
app.post('/api/tasks', (req, res) => {
  try {
    const { title, estimatedTime, description, category, priority = 'medium' } = req.body;

    if (!title || !estimatedTime) {
      return res.status(400).json({ error: 'Title and estimatedTime are required' });
    }

    const newTask = {
      id: uuidv4(),
      title,
      description,
      category,
      priority,
      estimatedTime: Number(estimatedTime),
      status: 'pending',
      createdAt: new Date(),
      completedAt: null
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение всех задач
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Начать работу над задачей
app.patch('/api/tasks/:id/start', (req, res) => {
  try {
    const taskId = req.params.id;
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status !== 'pending') {
      return res.status(400).json({ error: 'Task is not in pending state' });
    }

    task.status = 'in-progress';
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Завершить задачу
app.patch('/api/tasks/:id/finish', (req, res) => {
  try {
    const taskId = req.params.id;
    const { actualTime } = req.body;
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.status !== 'in-progress') {
      return res.status(400).json({ error: 'Task is not in progress' });
    }

    if (!actualTime || actualTime <= 0) {
      return res.status(400).json({ error: 'Valid actualTime is required' });
    }

    task.status = 'completed';
    task.actualTime = Number(actualTime);
    task.completedAt = new Date();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Удалить задачу
app.delete('/api/tasks/:id', (req, res) => {
  try {
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    tasks = tasks.filter(t => t.id !== taskId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});