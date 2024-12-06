import { Response } from 'express';

export const handleError = (res: Response, message: string, status = 500): void => {
  res.status(status).json({ message });
};

export const handleSuccess = (res: Response, data: any, status = 200): void => {
  res.status(status).json(data);
};
