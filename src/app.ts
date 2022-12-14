import 'reflect-metadata';
import 'dotenv/config';
import './database';

import express from 'express';
import cors from 'cors'

import routes from './router';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`.: server only in port ${PORT} :.`));
