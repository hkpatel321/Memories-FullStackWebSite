import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
const app = express();
import dotenv from 'dotenv'
import    userRoutes    from './routes/users.js'
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT ;

mongoose.connect(MONGOURL)
  .then(() => app.listen(PORT, () => console.log("Server running on port 5000")))
  .catch((err) => console.log(err.message));
