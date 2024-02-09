import { MondayClient } from '../../../infraestructure/monday/client';
import { IContractsRepository } from './interface';

export class ContractsRepository implements IContractsRepository {
  private mondayClient: MondayClient;

  constructor(mondayClient: MondayClient) {
    this.mondayClient = mondayClient;
  }

  async getBoardInfo(): Promise<any> {
    console.log(await this.mondayClient.getBoardItems(5945847430));
    console.log(await this.mondayClient.getBoardItems(5945933605));
    console.log(await this.mondayClient.getBoardItems(5945851807));

    return;
  }
}
