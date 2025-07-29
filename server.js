const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory data storage (in production, you'd use a database)
let data = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];
let nextId = 3;

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET all data
app.get('/api/data', (req, res) => {
  res.json(data);
});

// GET specific item by ID
app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(d => d.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.json(item);
});

// POST new data
app.post('/api/data', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newItem = {
    id: nextId++,
    name,
    email
  };
  
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT (update) existing data
app.put('/api/data/:id', (req, res) => {
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
app.delete('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = data.findIndex(d => d.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = data.splice(itemIndex, 1)[0];
  res.json(deletedItem);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;