import { NextFunction, Request, Response } from 'express';
import { fetchData } from '../../utils';
import { APIS } from '../../constants';

export const countriesController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const headers = {
      'X-CSCAPI-KEY': process.env.API_KEY,
    };
    const data = await fetchData(APIS.COUNTRIES, headers);
    res.send(data.data);
  } catch (error) {
    next(error);
  }
};
