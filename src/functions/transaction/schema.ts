export default {
  type: "array",
  items: {
    type: "object",
    properties: {
      transactionId: { type: 'string'},
      orderId: { type: 'string' },
      merchantId: { type: 'string' },
      merchantType: { type: 'string'},
      value: { type: 'number' }
    }
  },
  required: ['transactionId', 'orderId', 'merchantId', 'merchantType', 'value']
} as const;
