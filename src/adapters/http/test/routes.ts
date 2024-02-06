import express, { Express, Request, Response } from 'express';

import { TAG } from '../../../utils/consts';
import { logger } from '../../../utils/log';
import { TestControllers } from './controller';

const STATUS = 'status';
const TEST = 'test';
export function addTestRoutes(router: Express, controllers: TestControllers) {
  logger.info('Test routes added');
  const testRouter = express();

  testRouter.get(`/${STATUS}`, (req: Request, res: Response) => {
    logger.info(`${TAG}[GET][/${STATUS}`);
    controllers.getApiStatus(req, res);
  });

  router.use(`/${TEST}`, testRouter);
}
