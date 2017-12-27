import { Request, Response, NextFunction } from 'express';
import { execFile } from 'child_process';
import * as fs from 'fs';

import { CoreRouter } from './router';
import { ConfigObject } from '../App'

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
  private baseDir: string;

  /**
   * Creates an instance of CoreService.
   * Create temp dir for cloning
   * 
   * @param {Object} config
   * @memberof CoreService
   */
  constructor(config: ConfigObject) {
    const baseDir = config.baseDir;

    // check if folder exists -> else create one
    if (!fs.existsSync(baseDir + '/temp')) fs.mkdirSync(baseDir + '/temp');
    
    // pick shell script depending upon os
    // @TODO: implement .bat
    this.shellScript = (config.os == '*nix') ? 'cloc.sh' : 'cloc.bat';
    this.baseDir = config.baseDir;

    this.coreRouter = new CoreRouter(this);
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
    const script = this.baseDir + '/' + this.shellScript;
    const gitURL: string = req.query.gitURL;
    const repo = gitURL.substr(gitURL.lastIndexOf('/') + 1);

    execFile(script, [gitURL, repo] ,{cwd: this.baseDir}, (err, stdout, stderr) => {
      if (err !== null) {
        console.log({err: err, stderr: stderr, stdout: stdout});
        res.send({err: err, stderr: stderr, stdout: stdout});
      } else {
        const body = JSON.parse(stdout);
        res.send(body);
      }
    });
  }
}