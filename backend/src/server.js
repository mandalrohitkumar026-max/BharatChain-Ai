import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// Request logger
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
// API Routes
app.use('/api', apiRouter);
// Root greeting
app.get('/', (_req, res) => {
    res.json({
        message: 'ChainSentinel AI — Supply Chain Risk Intelligence API Engine',
        version: '4.2.0',
        documentation: '/api/health',
        status: 'Operational'
    });
});
// Start Server
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(` ChainSentinel AI Server Active`);
    console.log(` Listening on: http://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
});
