# Pomelo Pay Assessment
API endpoint: `https://qkn9fup7mg.execute-api.ap-southeast-1.amazonaws.com/dev`
Method: `POST`
Path: `/transaction`

Assuming transaction's value is in the same currency and the smallest denomination (cents)

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS
- Run `npx sls offline` to deploy this stack on your local machine

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS
- Run `yarn sls offline` to deploy this stack on your local machine

### Test Locally

In order to test the hello function locally, run the following command:

- `npx sls invoke local -f transaction --path src/functions/transaction/mock.json` if you're using NPM
- `yarn sls invoke local -f transaction --path src/functions/transaction/mock.json` if you're using Yarn

Check the [sls invoke local command documentation](https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local/) for more information.

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `transactionId`, `orderId`, `merchantId`, `merchantType`, `value` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request POST 'https://myApiEndpoint/dev/hello' \
--header 'Content-Type: application/json' \
--data-raw '[{
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
        }]'
```
