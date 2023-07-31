import { NextFunction, Request, Response } from 'express';
import { fetchData } from '../../utils/fetch';
import { APIS } from '../../constants';

export const citiesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.TOKEN}`,
      'user-email': process.env.EMAIL,
    };
    const data = await fetchData(APIS.CITIES(req.params.country), headers);
    res.send(data.data);
  } catch (error) {
    next(error);
  }
};
