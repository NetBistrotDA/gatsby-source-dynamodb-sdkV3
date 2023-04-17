<h1 align="center">
  gatsby-source-dynamodb-sdkv3
</h1>

This module is based on the <a href="gatsby-source-dynamodb">gatsby-source-dynamodb</a> but with the <a href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html">
AWS SDK for JavaScript v3 </a>.

This module helps you pull your AWS dynamodb account using IAM credentials. 

To install:

```
yarn add @netbistrot/gatsby-source-dynamodb-sdkv3
```

(or `npm install --save @netbistrot/gatsby-source-dynamodb-sdkv3`)

Then add the config to your `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    {
      resolve: '@netbistrot/gatsby-source-dynamodb-sdkv3',
      options: {
        typeName: '<INPUT_GRAPHQL_TYPE_NAME_HERE>',
        accessKeyId: '<AWS_ACCESS_KEY_ID>', 
        secretAccessKey: '<AWS_SECRET_ACCESS_KEY>',
        region: '<AWS_REGION>',
        params: {
          TableName : "<TABLE_NAME>",
          // OTHER PARAMS HERE
        }
      }
    },
  ],
};
```

## AWS CREDENTIALS

- Get your AWS Credentials for IAM user: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html

- Set up permissions for your IAM user, you only need scan: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/using-identity-based-policies.html

- Use params from AWS DynamoDB Query Scan: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Js.04.html#GettingStarted.Js.04.Scan

_It is strongly recommended that credentials are stored in environment variables._

## Helpful links

- [Gatsby documentation](https://www.gatsbyjs.org/)
