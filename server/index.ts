import express, { Request } from 'express';
import cors from 'cors';
import { countriesController, citiesController } from './controllers';
import { clientError, serverError } from './middlewares';
import { registerController } from './controllers/users';
import { join } from 'path';

const app = express();
require('dotenv').config();
console.log(process.env.NODE_ENV);

app.use(cors());
app.use(express.json());

app.get('/api/countries', countriesController);
app.get('/api/cities/:country', citiesController);
app.post('/api/user', registerController);

if (process.env.NODE_ENV === 'production') {    
  app.use(express.static(join(__dirname, '..', '..', 'public', 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(join(__dirname, '..', '..', 'public', 'dist', 'index.html'));
  });
}

app.use(clientError);
app.use(serverError);

app.listen(process.env.PORT, () =>
  console.log(`Server started on http://localhost:${process.env.PORT}`)
);
