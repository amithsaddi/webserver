const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./apiRoutes');
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// HTML Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use the API routes under /api
app.use('/api', apiRoutes);

app.get('/api/test', (req, res) => {
     res.send('Connected to backend server!');
 });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;