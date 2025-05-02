require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;
const projectRoutes = require('./routes/project.routes');
const technologyRoutes = require('./routes/technology.routes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/project', projectRoutes);
app.use('/api/tech', technologyRoutes);
// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Boilerplate!');
});

connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
