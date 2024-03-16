import express from 'express';
const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import path,{dirname} from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

mongoose.connect(process.env.MONGO_URL, {

}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

import userRoute from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';

app.use('/v1/users',userRoute);
app.use('/v1/admin',adminRouter);

app.use(notFound);
app.use(errorHandler)

app.listen(5000,()=>console.log('Server listening on port 5000'))