import { Router } from 'express';
// import main class
import { CoreService } from './index';

/**
 * Maintains all the routes against the functions
 * 
 * @class CoreRouter
 */
class CoreRouter {
  // exported router object
  public router: Router;
  
  /**
   * Creates an instance of CoreRouter.
   * Initializes routes
   * 
   * @memberof CoreRouter
   */
  constructor() {
    this.router = Router();
    this.initCoreRouter();
  }

  /**
   * Creates an instance of CoreService and maps functions to routes
   * 
   * @private
   * @memberof CoreRouter
   */
  private initCoreRouter(): void {
    const coreService = new CoreService();
    this.router.get('/', coreService.getRoot);
    this.router.get('/cloc/:gitURL', coreService.cloc);
  }
}

export default new CoreRouter().router;