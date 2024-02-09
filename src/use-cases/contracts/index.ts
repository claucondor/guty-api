import { IContractsRepository } from '../../adapters/repositories/contracts/interface';
import { IContractsUseCases } from './interface';

export class ContractsUseCases implements IContractsUseCases {
  contractRepository: IContractsRepository;

  constructor(contractRepository: IContractsRepository) {
    this.contractRepository = contractRepository;
  }

  async getInfo(): Promise<any> {
    return await this.contractRepository.getBoardInfo();
  }
}
