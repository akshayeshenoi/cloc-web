import { Request, Response, NextFunction } from 'express';

/**
 * Add request handlers and/or business logic here
 * Follow Node's req, res, next pattern
 * 
 * @export
 * @class Service2
 */
export class Service2 {
  
  /**
   * Creates an instance of Service2.
   * 
   * @memberof Service2
   */
  constructor() {

  }

  /**
   * Example of request handler
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @memberof Service2
   */
  public getRoot(req: Request, res: Response, next: NextFunction): void {
    res.send('Hello from Service2!');
  }
}