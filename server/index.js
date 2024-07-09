import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

dotenv.config();

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

// It will directly added the /posts in the localhost
// localhost:3000/   => from this to below
// localhost:3000/posts 
app.use('/posts', postRoutes);

const CONNECTION_URL = process.env.MONGO_URI
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server is Running on ${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
