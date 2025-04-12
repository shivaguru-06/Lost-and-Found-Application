import { Request, Response } from 'express';

export const getAppInfo = (req: Request, res: Response) => {
  res.json({
    message: 'Lost & Found API',
    version: '1.0.0',
    status: 'running'
  });
};