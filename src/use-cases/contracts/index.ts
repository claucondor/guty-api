import { IContractsRepository } from '../../adapters/repositories/contracts/interface';
import { IContractsUseCases } from './interface';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

//let templates = {
//  testTemplate: fs.readFileSync(
//    path.resolve(__dirname, '../../utils/s/test.docx'),
//    'binary'
//  ),
//};

export class ContractsUseCases implements IContractsUseCases {
  contractRepository: IContractsRepository;

  constructor(contractRepository: IContractsRepository) {
    this.contractRepository = contractRepository;
  }

  async getInfo(): Promise<any> {
    await this.contractRepository.logAllData();

    const info = await this.contractRepository.getBoardInfo();
    console.log(info);
    return info;
  }

  async generateContract(
    propertyId: string,
    buyerId: string,
    sellerId: string,
    purchaseId: string
  ): Promise<Buffer> {
    try {
      const propertyData = await this.contractRepository.getPropertyDataById(propertyId);
      const buyerData = await this.contractRepository.getClientDataById(buyerId);
      const sellerData = await this.contractRepository.getClientDataById(sellerId);
      const purchaseData = await this.contractRepository.getPurchaseDataById(purchaseId);

      if (!propertyData || !buyerData || !sellerData || !purchaseData) {
        console.error(`Data not found`);
        return Buffer.alloc(0);
      }

      const data = {
        purchaseDate: purchaseData.purchaseDate,
        buyerName: buyerData.name,
        buyerRut: buyerData.identityCard,
        sellerName: sellerData.name,
        sellerIdentityCard: sellerData.identityCard,
        propertyName: propertyData.name,
        propertyAddress: propertyData.address,
        purchaseValue: purchaseData.value,
        propertyBankCredit: propertyData.bankCredit,
        propertyDownPayment: propertyData.downPayment,
        propertyMortgageStatus: propertyData.mortgage ? 'Hipotecada' : 'No Hipotecada',
        propertyContractStatus: propertyData.contractStatus,
        buyerBankDebt: buyerData.bankDebt,
        buyerMaritalStatus: buyerData.maritalStatus,
        buyerProfession: buyerData.profession,
        buyerEmail: buyerData.email,
        sellerMaritalStatus: sellerData.maritalStatus,
        sellerProfession: sellerData.profession,
        sellerEmail: sellerData.email,
      };

      //const templatePath = path.resolve(__dirname, '../../utils/templates/testTemplate.docx');
      //const content = fs.readFileSync(templatePath, 'binary');

      const templateURL = 'https://arweave.net/D4oqQ3iPivELw9UvD46T94X9qK0-OzfgCSHGtXrP8co';
      const response = await axios.get(templateURL, { responseType: 'arraybuffer' });
      const zip = new PizZip(response.data);
      const doc = new Docxtemplater().loadZip(zip);

      doc.setData(data);
      doc.render();

      const output = doc.getZip().generate({ type: 'nodebuffer' });
      //fs.writeFileSync(path.resolve(__dirname, `../../output/contract_${propertyId}.docx`), output);
      return output;
    } catch (error) {
      console.error(`Error generating contract: ${error}`);
      return Buffer.alloc(0);
    }
  }
}
