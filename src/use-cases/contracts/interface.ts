export interface IContractsUseCases {
  getInfo(): Promise<any>;
  generateContract(
    propertyId: string,
    buyerId: string,
    sellerId: string,
    purchaseId: string
  ): Promise<Buffer>;
}
