import { Router } from 'express';
// import main class
import { CoreService } from './index';

/**
 * Maintains all the routes against the functions
 * 
 * @class CoreRouter
 */
export class CoreRouter {
  // exported router object
  public router: Router;
  
  /**
   * Creates an instance of CoreRouter.
   * Initializes routes
   * 
   * @memberof CoreRouter
   */
  constructor(coreService: CoreService) {
    this.router = Router();
    this.initCoreRouter(coreService);
  }

  /**
   * Creates an instance of CoreService and maps functions to routes
   * 
   * @private
   * @memberof CoreRouter
   */
  private initCoreRouter(coreService: CoreService): void {
    this.router.get('/', coreService.getRoot.bind(coreService));
    this.router.get('/cloc', coreService.cloc.bind(coreService));
  }
}
