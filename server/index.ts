import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/api/countries', async (req, res) => {
  const apiUrl = `https://battuta.medunes.net/api/country/all/?key=${process.env.API_KEY}`;
  const data = await axios(apiUrl, {
    method: 'GET',
    withCredentials: true,
  });

  res.send(data.data);
});

app.get('/api/region/:code', async (req, res) => {
  const apiUrl = `http://battuta.medunes.net/api/region/${req.params.code}/all/?key=${process.env.API_KEY}`;
  const data = await axios(apiUrl, {
    method: 'GET',
    withCredentials: true,
  });

  res.send(data.data);
});

app.post('/api/city/:code', async (req, res) => {
  const { region } = req.body;
  const apiUrl = `http://battuta.medunes.net/api/city/${req.params.code}/search/?region=${region}&key=${process.env.API_KEY}`;
  const data = await axios(apiUrl, {
    method: 'GET',
    withCredentials: true,
  });

  res.send(data.data);
});

const server = app.listen(3000, () =>
  console.log(`Server started on http://localhost:3000`)
);
