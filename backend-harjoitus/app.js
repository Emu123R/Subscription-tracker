import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import {PORT} from './config/env.js';

import userRouter from './routes/users.routes.js';
import subscriptionRouter from './routes/subscription.routers.js';
import authRouter from './routes/auth.routes.js';
import connectDB from './database/mongodb.js';
import errorMiddleware from './middelwares/error.middelware.js';
import arcjetMiddleware from './middelwares/arcjet.middelware.js';
//import workflowRouter from './routes/workflow.routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(arcjetMiddleware);
//otetaan yhteyttä frontendiin!
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
//app.use('/api/v1/workflows', workflowRouter);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the backend of the subscription service');
});

//portti missä backend toimii
app.listen(PORT, async() => {
   console.log(`server is running on http://localhost:${PORT}`);

   await connectDB();
});

export default app;
