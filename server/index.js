const express = require('express');
const cors = require('cors')
const { connectDB } = require('./config/db');
require('dotenv').config()


const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const responseRoutes = require('./routes/responseRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/response', responseRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});