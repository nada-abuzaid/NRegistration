import { Request, Response } from 'express';
import { generateValidationSchema } from '../../utils';

export const registerController = (req: Request, res: Response) => {
  const { user } = req.body;
  const schema = generateValidationSchema(user);
  const { error } = schema.validate(user);

  if (error) {
    return res.status(406).json({ error: error.details[0].message });
  }

  res.status(200).json({ message: 'Account has been created successfully!' });
};
