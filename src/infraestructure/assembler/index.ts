import { Express } from 'express';
import { logger } from '../../utils/log';
import { setExpressMiddlewares } from '../express';
import d from './dependencies';

export class Assembler {
  router: Express;

  constructor(router: Express) {
    this.router = router;
  }

  configureApp() {
    setExpressMiddlewares(this.router);
    this.addTestRoutes();
    logger.info('clean architecture layers assembled correctly');
  }

  //
  // addTestRoutes
  //
  addTestRoutes() {
    const testControllert = new d.TestControllers();
    d.addTestRoutes(this.router, testControllert);
  }
}
