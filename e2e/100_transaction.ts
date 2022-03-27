import axios from 'axios'

const url = process.env.URL || 'https://qkn9fup7mg.execute-api.ap-southeast-1.amazonaws.com/dev/transaction'

export const transactionTest = () => {
    test('should return array', async () => {
        let body = [{
            "transactionId": "1",
            "orderId": "2",
            "merchantId": "3",
            "merchantType": "Food",
            "value": 10000
        },
        {
            "transactionId": "2",
            "orderId": "1",
            "merchantId": "2",
            "merchantType": "Food",
            "value": 5000
        },
        {
            "transactionId": "3",
            "orderId": "1",
            "merchantId": "3",
            "merchantType": "Drink",
            "value": 5000
        }]
    

    // let result = [
    //     {
    //       "merchantId": "2",
    //       "grossSales": 5000,
    //       "netSales": 5000,
    //       "averageOrderValue": 5000
    //     },
    //     {
    //       "merchantId": "3",
    //       "grossSales": 15000,
    //       "netSales": 15000,
    //       "averageOrderValue": 7500
    //     }
    //   ]
        
        axios.post(`${url}/transaction`, {body}, {
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(res => {
            expect(res.status).toEqual(200);
            expect(typeof res.data).toBe('array');
        })
        .catch(() => {
        })
    })

    test('should match result', async () => {
        let body = [{
            "transactionId": "1",
            "orderId": "2",
            "merchantId": "3",
            "merchantType": "Food",
            "value": 10000
        },
        {
            "transactionId": "2",
            "orderId": "1",
            "merchantId": "2",
            "merchantType": "Food",
            "value": 5000
        },
        {
            "transactionId": "3",
            "orderId": "1",
            "merchantId": "3",
            "merchantType": "Drink",
            "value": 5000
        }]

    let result = [
        {
          "merchantId": "2",
          "grossSales": 5000,
          "netSales": 5000,
          "averageOrderValue": 5000
        },
        {
          "merchantId": "3",
          "grossSales": 15000,
          "netSales": 15000,
          "averageOrderValue": 7500
        }
      ]
        
        axios.post(`${url}/transaction`, {body}, {
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(res => {
            expect(res.status).toEqual(200);
            expect(res.data).toContainEqual(result);
        })
        .catch(() => {
        })
    })
}