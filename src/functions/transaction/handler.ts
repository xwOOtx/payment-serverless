// import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
// import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Handler } from 'aws-lambda';
import { apiResponses } from './apiResponse';
// import schema from './schema';

interface ITransaction {
  transactionId: string;
  orderId: string;
  merchantId: string;
  merchantType: string;
  value: number;
}

class Summary {
  merchantId?: string;
  grossSales?: number;
  netSales?: number;
  averageOrderValue?: number;

  constructor(merchantId: string, grossSales: number, netSales: number, averageOrderValue: number) {
      this.merchantId = merchantId;
      this.grossSales = grossSales;
      this.netSales = netSales;
      this.averageOrderValue = averageOrderValue;
  }
}

const transaction: Handler = async (event) => {
  let merchantType = '';
  let output:Summary[] = [];
  let transactionInfo: { [merchantId: string] : { grossSales?: number,
    netSales?: number,
    averageOrderValue?: number,
    totalOrderId?: string[]} } = {};
    console.log(event.body)
  const transactions: ITransaction[] = event.body;
  if ( event.queryStringParameters) {
    merchantType = event.queryStringParameters['merchantType'];
  }

  let filteredTransaction: ITransaction[] = merchantType? transactions.filter(x => x.merchantType == merchantType) : transactions;
  filteredTransaction.forEach(item => {
      if (transactionInfo[item.merchantId]) {
          /// exist, add on
          if (item.value > 0) {
              /// payment
              transactionInfo[item.merchantId].grossSales = transactionInfo[item.merchantId].grossSales! + item.value;
              transactionInfo[item.merchantId].netSales = transactionInfo[item.merchantId].netSales! + item.value;
              if (!(transactionInfo[item.merchantId].totalOrderId?.includes(item.orderId))) {
                  transactionInfo[item.merchantId].totalOrderId?.push(item.orderId);
              }
              transactionInfo[item.merchantId].averageOrderValue = transactionInfo[item.merchantId].grossSales! / transactionInfo[item.merchantId].totalOrderId!.length;
          } else {
              /// refund
              transactionInfo[item.merchantId].netSales = transactionInfo[item.merchantId].netSales! + item.value;
          }
      } else {
          /// new entry
          if (item.value > 0) {
              /// payment
              transactionInfo[item.merchantId] = {grossSales: item.value, 
                                                  netSales: item.value, 
                                                  averageOrderValue: item.value, 
                                                  totalOrderId: [item.orderId]}
          } else {
              /// refund
              transactionInfo[item.merchantId] = {netSales: item.value}
          }
      }
  })

  Object.entries(transactionInfo).forEach( ([key, value]) => {
      let summary = new Summary(key, value.grossSales!, value.netSales!, value.averageOrderValue!);
      output.push(summary);
  });   
  
  return apiResponses._200(output)
};

export const main = middyfy(transaction);
