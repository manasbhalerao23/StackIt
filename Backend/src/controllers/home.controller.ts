import { Request, Response } from 'express';

export const getHome = (_req: Request, res: Response) => {
  res.send('🚀 Hello from Node + TypeScript!');
};
