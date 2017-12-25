import { Request, Response, NextFunction } from 'express';
const exec = require('child_process').exec;

/**
 * Add request handlers and/or business logic here
 * Follow Node's req, res, next pattern
 * 
 * @export
 * @class CoreService
 */
export class CoreService {
  /**
   * Creates an instance of CoreService.
   * 
   * @memberof CoreService
   */
  constructor() {}

  /**
   * Example of request handler
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @memberof CoreService
   */
  public getRoot(req: Request, res: Response, next: NextFunction): void {
    res.send('Hello from CoreService!');
  }

  /**
   * Fetches git url from request and execs cloc command
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @memberof CoreService
   */
  public cloc(req: Request, res: Response, next: NextFunction): void {
    exec('time', function (err, stdout, stderr) {
      console.log(stdout);
      res.send([stdout, req.params.gitURL);
    });
  }
}