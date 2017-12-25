import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

// import routers from services
import { CoreService } from './coreService'

/**
 * Bootstraps an ExpressJS web server
 * Use this class to add new middlewares or routes
 * 
 * @class App
 */
class App {

  public express: express.Application;
  private config;
  private coreService: CoreService;

  /**
   * Creates an instance of App.
   * First create express object and then fire configuration methods
   * 
   * @memberof App
   */
  constructor() {
    this.express = express();
    this.loadConfig();
    this.middleware();
    
    this.coreService = new CoreService(this.config.os);
    this.routes();
  }

  /**
   * Load configuration based on environment
   * cloud -> load from manifest
   * dev -> localConfig.json
   * 
   * @private
   * @memberof App
   */
  private loadConfig(): void { 
    this.config = {
      os: '*nix'
    }
  }

  /**
   * Configure express middlewares
   * 
   * @private
   * @memberof App
   */
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  /**
   * Master router that sets child routes from imported services
   * Use this function to add routes
   * 
   * @private
   * @memberof App
   */
  private routes(): void {
    const router = express.Router();
    // root route
    router.get('/', (req, res, next) => {
      res.send('Hello from Seed!')
    });

    this.express.use('/', router);
    this.express.use('/core/v1', this.coreService.coreRouter.router);
  }

}

// exports a new instance of the app
export default new App().express;
