import cookieParser from 'cookie-parser';
config();
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
const app = express();
import path from 'path';


// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-Party
app.use(
  cors({
    origin: 'https://evolve-ed-frontend.onrender.com', // Explicitly specify the allowed origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(morgan('dev'));
app.use(cookieParser());

// // Serve React static files
// app.use(express.static(path.join(process.cwd(), 'build')));

// // Fallback route for all non-static requests to serve index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(process.cwd(), '../build', 'index.html'));
// });

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import all routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;
