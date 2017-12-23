import { Request, Response, NextFunction } from 'express';

/**
 * Add request handlers and/or business logic here
 * Follow Node's req, res, next pattern
 * 
 * @export
 * @class Service1
 */
export class Service1 {
  /**
   * Creates an instance of Service1.
   * 
   * @memberof Service1
   */
  constructor() {

  }

  /**
   * Example of request handler
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @memberof Service1
   */
  public getRoot(req: Request, res: Response, next: NextFunction): void {
    res.send('Hello from Service1!');
  }
}