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

  async generateContract(req: Request, res: Response) {
    const log = { ...logBase, function: 'generateContract' } as Log;

    try {
      //const { propertyId, buyerId, sellerId, purchaseId } = req.query;

      const propertyId = '5952673706';
      const buyerId = '5945935744';
      const sellerId = '5945935744';
      const purchaseId = '5945851814';

      const contractBuffer = await this.contractUseCase.generateContract(
        propertyId,
        buyerId,
        sellerId,
        purchaseId
      );

      if (contractBuffer.length === 0) {
        throw new Error('Failed to generate contract');
      }

      res.setHeader('Content-Disposition', `attachment; filename=contract_${propertyId}.docx`);
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      return res.send(contractBuffer);
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
