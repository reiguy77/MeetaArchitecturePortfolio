const express = require('express');
const cors = require('cors');
const path = require('path');
const projectRoutes = require('./routes/projects');
const adminRoutes = require('./routes/admin');
const siteContentRoutes = require('./routes/site-content');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());



// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/site-content', siteContentRoutes);

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Meeta Architecture Portfolio API' });
});


// Serve static files from frontend dist directory
const frontendPath = path.join(__dirname, '../frontend/dist/frontend/browser');
app.use(express.static(frontendPath));

// Catch all handler: send back Angular's index.html file for any non-API routes
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});


app.listen(port, '0.0.0.0',() => {
  console.log(`Server listening on port ${port}`);
  console.log(`Frontend served from: ${frontendPath}`);
});
