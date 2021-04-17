import { Request, Response } from "express";

interface Context {
  req: Request & {
    session: {
      userId?: any;
    };
  };
  res: Response;
}

export default Context;
