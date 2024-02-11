import { ClientData, PropertyData, PurchaseData } from '../../../entites';

export interface IContractsRepository {
  getBoardInfo(): Promise<any>;
  getPropertyData(): Promise<any>;
  getClientData(): Promise<any>;
  getPurchaseData(): Promise<any>;
  getClientDataById(id: string): Promise<ClientData | null>;
  getPurchaseDataById(id: string): Promise<PurchaseData | null>;
  getPropertyDataById(id: string): Promise<PropertyData | null>;
  logAllData(): Promise<void>;
}
