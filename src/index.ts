import path from 'path';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/dbConnection';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 5000;

//Connect to MongoDB;
connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// handle UNKNOWN URL REQUESTS
app.all('*', (req: Request, res: Response) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ error: '404: not found' });
    } else if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else {
        res.type('txt').send('404: not found');
    }
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});