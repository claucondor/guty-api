import { Request, Response } from 'express';
import { errors } from '../../../utils/consts/errors';
import { Log, logger } from '../../../utils/log';
import { handleHttpError, isAnInternalError } from '../utils';

const logBase = {
  layer: 'controller',
  module: 'testController',
} as Log;

export class TestControllers {
  async getApiStatus(req: Request, res: Response) {
    const log = { ...logBase, function: 'getApiStatus' } as Log;

    try {
      return res.status(200).send({
        message: 'zurf-web3-agency-api is running',
      });
    } catch (err) {
      const { status, message } = handleHttpError(err);

      if (isAnInternalError(status)) {
        logger.error(message, log);
      }

      return res.status(status).send({
        error: message,
      });
    }
  }
}
