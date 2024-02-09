import { Request, Response } from 'express';
import { errors } from '../../../utils/consts/errors';
import { Log, logger } from '../../../utils/log';
import { handleHttpError, isAnInternalError } from '../utils';
import { IContractsUseCases } from '../../../use-cases/contracts/interface';

const logBase = {
  layer: 'controller',
  module: 'contractController',
} as Log;

export class ContractController {
  contractUseCase: IContractsUseCases;

  constructor(contractUseCase: IContractsUseCases) {
    this.contractUseCase = contractUseCase;
  }

  async getInfo(req: Request, res: Response) {
    const log = { ...logBase, function: 'getInfo' } as Log;

    try {
      await this.contractUseCase.getInfo();

      return res.status(200).send({
        message: 'sucefully get contract info in console log',
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
