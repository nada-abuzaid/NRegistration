import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.get('/api/countries', async (req, res) => {
  const apiUrl = `https://api.countrystatecity.in/v1/countries`;
  const data = await axios(apiUrl, {
    method: 'GET',
    withCredentials: true,
    headers: {
      'X-CSCAPI-KEY': process.env.API_KEY,
    },
  });  
  
  res.send(data.data);
});

app.get('/api/cities/:country', async (req, res) => {
  const apiUrl = `https://www.universal-tutorial.com/api/states/${req.params.country}`;
  const data = await axios(apiUrl, {
    method: 'GET',
    withCredentials: true,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.TOKEN}`,
      'user-email': process.env.EMAIL,
    },
  });

  res.send(data.data);
});

app.listen(3000, () =>
  console.log(`Server started on http://localhost:3000`)
);
