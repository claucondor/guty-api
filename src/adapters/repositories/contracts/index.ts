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
    const propertyData = await this.getPropertyData();
    const clienteData = await this.getClienteData();
    const purchaseData = await this.getPurchaseData();

    const info = {
      propertyData: {
        columns: Object.keys(propertyData[0] || {}),
        entries: propertyData.length,
      },
      clienteData: {
        columns: Object.keys(clienteData[0] || {}),
        entries: clienteData.length,
      },
      purchaseData: {
        columns: Object.keys(purchaseData[0] || {}),
        entries: purchaseData.length,
      },
    };

    return info;
  }

  async getPropertyData(): Promise<any> {
    const board = await this.mondayClient.getBoardData(5945847430);
    const propertyDataArray = parseItemsToPropertyData(board.data.boards[0].items);
    console.log(propertyDataArray);
    return propertyDataArray;
  }

  async getClienteData(): Promise<any> {
    const board = await this.mondayClient.getBoardData(5945933605);
    const clienteDataArray = parseItemsToClienteData(board.data.boards[0].items);
    console.log(clienteDataArray);
    return clienteDataArray;
  }

  async getPurchaseData(): Promise<any> {
    const board = await this.mondayClient.getBoardData(5945851807);
    const purchaseDataArray = parseItemsToPurchaseData(board.data.boards[0].items);
    console.log(purchaseDataArray);
    return purchaseDataArray;
  }
}
