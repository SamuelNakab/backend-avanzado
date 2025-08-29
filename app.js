import {config} from './dbconfig.js'
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import 'dotenv/config'

import pkg from 'pg'
const {Client} = pkg;

const app = express()
const PORT = 8000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
})

app.get('/canciones', async (req, res) => {
  const client = new Client(config);
  await client.connect();
  let result = await client.query("select * from public.canciones");
  await client.end();
  console.log(result.rows);
  res.send(result.rows)

})

app.post('/createuser', async (req,res) =>{
	const user = req.body;
	const client = new Client(config);
  	await client.connect();

	
  	await client.end();
});

app.post('/login', async (req,res) => {
	const user = req.body;
	const client = new Client(config);
	await client.connect();

  
	await client.end();
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})