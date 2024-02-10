import { MondayClient } from '../../../infraestructure/monday/client';
import { IContractsRepository } from './interface';
import {
  parseItemsToClienteData,
  parseItemsToPropertyData,
  parseItemsToPurchaseData,
} from './utils';

export class ContractsRepository implements IContractsRepository {
  private mondayClient: MondayClient;

  constructor(mondayClient: MondayClient) {
    this.mondayClient = mondayClient;
  }

  async getBoardInfo(): Promise<any> {
    const board1 = await this.mondayClient.getBoardData(5945847430);
    const propertyDataArray = parseItemsToPropertyData(board1.data.boards[0].items);
    console.log(propertyDataArray);

    const board2 = await this.mondayClient.getBoardData(5945933605);
    const clienteDataArray = parseItemsToClienteData(board2.data.boards[0].items);
    console.log(clienteDataArray);

    const board3 = await this.mondayClient.getBoardData(5945851807);
    const purchaseDataArray = parseItemsToPurchaseData(board3.data.boards[0].items);
    console.log(purchaseDataArray);
    return;
  }
}
