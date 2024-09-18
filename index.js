const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = 'api/v1';

// Import route dan error handling
const userRouter = require('./src/users/router');
const candidateRouter = require('./src/candidates/router');
const errHandlingRoute = require('./src/middleware/errorHandler');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Gunakan route
app.use(`/${URL}/auth`, userRouter);
app.use(`/${URL}`, candidateRouter);

// Error handling middleware
app.use(errHandlingRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
