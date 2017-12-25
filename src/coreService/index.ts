import { Request, Response, NextFunction } from 'express';
import { execFile } from 'child_process';
import * as fs from 'fs';

import { CoreRouter } from './router';

/**
 * Add request handlers and/or business logic here
 * Follow Node's req, res, next pattern
 * 
 * @export
 * @class CoreService
 */
export class CoreService {
  public coreRouter: CoreRouter;
  private shellScript: string;

  /**
   * Creates an instance of CoreService.
   * Create temp dir for cloning
   * @param {string} os 
   * @memberof CoreService
   */
  constructor(os: string) {
    // init router
    this.coreRouter = new CoreRouter(this);
    if (!fs.existsSync('temp')) fs.mkdirSync('temp');

    // *nix command
    this.shellScript = os == '*nix' ? 'cloc.sh' : 'cloc.bat';
  }

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
    const gitURL: string = req.query.gitURL;
    const repo = gitURL.substr(gitURL.lastIndexOf('/') + 1);

    execFile(this.shellScript, [gitURL, repo], (err, stdout, stderr) => {
      if (stderr.length > 0) console.log(stderr) ;      
      res.send([stdout, repo, stderr]);
    });
  }
}