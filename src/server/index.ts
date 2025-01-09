import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './api/test-openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
