import { Express } from 'express';
import { logger } from '../../utils/log';
import { setExpressMiddlewares } from '../express';
import d from './dependencies';
import { MondayClient } from '../monday/client';

export class Assembler {
  router: Express;
  mondayClient: MondayClient;
  constructor(router: Express, mondayClient: MondayClient) {
    this.router = router;
    this.mondayClient = mondayClient;
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
