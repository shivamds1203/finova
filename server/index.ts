import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: "Finova API is running" });
});

// Mock Auth Route
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    res.json({
        token: "mock-jwt-token",
        user: { id: "1", email, name: "Alex Sterling" }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
