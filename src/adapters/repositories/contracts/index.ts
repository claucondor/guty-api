import { ClientData, PropertyData, PurchaseData } from '../../../entites';
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

  async logAllData(): Promise<void> {
    try {
      const propertyData = await this.getPropertyData();
      const clientData = await this.getClientData();
      const purchaseData = await this.getPurchaseData();

      console.log('Property Data:', propertyData);
      console.log('Client Data:', clientData);
      console.log('Purchase Data:', purchaseData);
    } catch (error) {
      console.error(`Error logging data: ${error}`);
    }
  }

  async getBoardInfo(): Promise<any> {
    const propertyData = await this.getPropertyData();
    const clienteData = await this.getClientData();
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

  async getPropertyData(): Promise<PropertyData[]> {
    const board = await this.mondayClient.getBoardData(5945847430);
    const propertyDataArray = parseItemsToPropertyData(board.data.boards[0].items);
    return propertyDataArray;
  }

  async getClientData(): Promise<ClientData[]> {
    const board = await this.mondayClient.getBoardData(5945933605);
    const clienteDataArray = parseItemsToClienteData(board.data.boards[0].items);
    return clienteDataArray;
  }

  async getPurchaseData(): Promise<PurchaseData[]> {
    const board = await this.mondayClient.getBoardData(5945851807);
    const purchaseDataArray = parseItemsToPurchaseData(board.data.boards[0].items);
    return purchaseDataArray;
  }

  async getClientDataById(id: string): Promise<ClientData | null> {
    const clientData = await this.getClientData();
    return clientData.find((client) => client.id === id) || null;
  }

  async getPurchaseDataById(id: string): Promise<PurchaseData | null> {
    const purchaseData = await this.getPurchaseData();
    return purchaseData.find((purchase) => purchase.id === id) || null;
  }

  async getPropertyDataById(id: string): Promise<PropertyData | null> {
    const propertyData = await this.getPropertyData();
    return propertyData.find((property) => property.id === id) || null;
  }
}
