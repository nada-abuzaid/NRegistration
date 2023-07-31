import express from 'express';
import cors from 'cors';
import { countriesController, citiesController } from './controllers';
import { clientError, serverError } from './middlewares';
import { registerController } from './controllers/users';

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.get('/api/countries', countriesController);
app.get('/api/cities/:country', citiesController);
app.post('/api/user', registerController);

app.use(clientError);
app.use(serverError);

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:${process.env.PORT}`)
);
