import express, { Express, Request, Response } from 'express';

import { TAG } from '../../../utils/consts';
import { logger } from '../../../utils/log';
import { ContractController } from './controller';

const CONTRACTS = 'contracts';
const INFO = 'info';

export function addContractsRoutes(router: Express, controllers: ContractController) {
  logger.info('Test routes added');
  const contractRouter = express();

  contractRouter.get(`/${INFO}`, (req: Request, res: Response) => {
    logger.info(`${TAG}[GET][/${INFO}`);
    controllers.getInfo(req, res);
  });

  router.use(`/${CONTRACTS}`, contractRouter);
}
