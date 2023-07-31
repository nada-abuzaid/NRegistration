import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';

export const clientError = (req: Request, res: Response) => {
  res.status(404).json({ message: 'Not Found!' });
};

export const serverError: ErrorRequestHandler = (_error: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: 'Server Error!' });
};
