const express = require('express');
const router = express.Router();

// Test connectivity
router.get('/api/test', (req, res) => {
     res.send('Connected to backend server!');
 });

// In-memory data
let data = [
  { id: 1, name: 'Narender Modi', email: 'narender.modi@india.com' },
  { id: 2, name: 'Kier Starmer', email: 'kier.starmer@uk.com' },
  { id: 3, name: 'Donald Trump', email: 'donald.trump@usa.com' }
];
let nextId = 3;

// GET all data
router.get('/data', (req, res) => {
  res.json(data);
});

// GET specific item by ID
router.get('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(d => d.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// POST new data
router.post('/data', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  const newItem = { id: nextId++, name, email };
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT (update) existing data
router.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const itemIndex = data.findIndex(d => d.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  data[itemIndex] = { id, name, email };
  res.json(data[itemIndex]);
});

// DELETE data
router.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex(d => d.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const deletedItem = data.splice(itemIndex, 1)[0];
  res.json(deletedItem);
});

module.exports = router;