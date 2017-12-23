import { Router } from 'express';
// import main class
import { Service2 } from './index';

/**
 * Maintains all the routes against the functions
 * Create an instance(s) of classes from this module and map functions to routes
 * 
 * @class S2Router
 */
class S2Router {
  // exported router object
  public router: Router;
  
  /**
   * Creates an instance of S2Router.
   * Initializes routes
   * 
   * @memberof S2Router
   */
  constructor() {
    this.router = Router();
    this.initS2Routes();
  }
  
  /**
   * Creates an instance of InformationService and maps functions to routes
   * 
   * @private
   * @memberof S2Router
   */
  private initS2Routes(): void {
    // creating instance and mapping function to route
    const s2 = new Service2();
    this.router.get('/', s2.getRoot);
  }
}

export default new S2Router().router;