import express from "express";
import bodyParser from 'body-parser';

import auth from './routes/auth';
import Admin from './routes/Routesadmin'
import dotenv from "dotenv";

import Cust from "./routes/customers/Routescust";

dotenv.config();

const app = express().use(bodyParser.json());

app.use('/', auth);
app.use('/', Admin);  


app.use('/', Cust)


const PORT = process.env.PORT || 10101;

app.listen(PORT, () => {
  console.log("Servidor ejecutándose en el puerto: ", PORT);
}).on("error", (error) => {
  throw new Error(error.message);
});
