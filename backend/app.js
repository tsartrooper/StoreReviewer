import express from 'express';
import cors from 'cors';


import authenticationRoute from './routes/auth.js';
import adminRoute from './routes/admin.js';
import storeRoute from './routes/store.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // restrict to React app only
  credentials: true               // if you're using cookies/session
}));

app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({extended: true, limit: "100mb"}));

// Routing

app.use("/api/v1/auth", authenticationRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/store", storeRoute);


export default app;