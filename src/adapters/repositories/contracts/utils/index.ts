import { ClientData, PropertyData, PurchaseData } from '../../../../entites';

function parseItemsToPropertyData(items: any[]): PropertyData[] {
  return items.map((item) => {
    const columnValues = item.column_values.reduce((acc: any, cv: any) => {
      acc[cv.title] = cv.text;
      return acc;
    }, {});

    const data: PropertyData = {
      id: item.id,
      name: item.name,
      rut: columnValues['Rut'],
      maritalStatus: columnValues['Estado civil'],
      profession: columnValues['Profesión'],
      address: columnValues['Domicilio'],
      bankCredit: columnValues['Credito bancario (Banco)'],
      downPayment: columnValues['Pie'],
      mortgage: columnValues['Hipotecario'],
      email: columnValues['Correo electrónico'],
      contractStatus: columnValues['Contrato'],
    };
    return data;
  });
}

function parseItemsToClienteData(items: any[]): ClientData[] {
  return items.map((item) => {
    const columnValues = item.column_values.reduce((acc: any, cv: any) => {
      acc[cv.title] = cv.text;
      return acc;
    }, {});

    const data: ClientData = {
      id: item.id,
      name: item.name,
      identityCard: columnValues['Cedula Identidad'],
      maritalStatus: columnValues['Estado civil'],
      profession: columnValues['Profesión'],
      address: columnValues['Domicilio'],
      bankDebt: columnValues['Deuda bancaria'],
      email: columnValues['Correo electrónico'],
    };
    return data;
  });
}

function parseItemsToPurchaseData(items: any[]): PurchaseData[] {
  return items.map((item) => {
    const columnValues = item.column_values.reduce((acc: any, cv: any) => {
      acc[cv.title] = cv.text;
      return acc;
    }, {});

    const data: PurchaseData = {
      id: item.id,
      name: item.name,
      subelements: columnValues['Subelementos'],
      status: columnValues['Estado'],
      role: columnValues['Rol'],
      mortgaged: columnValues['Hipotecada'],
      documents: columnValues['Documentos'],
      purchaseDate: columnValues['Fecha de compra'],
      overTenYears: columnValues['Más de 10 años?'],
      deeds: columnValues['Escrituras'],
      sellers: columnValues['Vendedores'],
      buyers: columnValues['Compradores'],
      value: columnValues['Valor'],
      finalValue: columnValues['Valor final'],
    };
    return data;
  });
}
export { parseItemsToPropertyData, parseItemsToClienteData, parseItemsToPurchaseData };
