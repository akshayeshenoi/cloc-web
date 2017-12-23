import { Router } from 'express';
// import main class
import { Service1 } from './index';

/**
 * Maintains all the routes against the functions
 * 
 * @class S1Router
 */
class S1Router {
  // exported router object
  public router: Router;
  
  /**
   * Creates an instance of S1Router.
   * Initializes routes
   * 
   * @memberof S1Router
   */
  constructor() {
    this.router = Router();
    this.initS1Routes();
  }

  /**
   * Creates an instance of ConfigurationService and maps functions to routes
   * 
   * @private
   * @memberof S1Router
   */
  private initS1Routes(): void {
    const s1 = new Service1();
    this.router.get('/', s1.getRoot);
  }
}

export default new S1Router().router;