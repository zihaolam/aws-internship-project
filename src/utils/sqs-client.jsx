import { SQSClient, ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

class SQS {
  constructor(queueUrl) {
    this.queueUrl = queueUrl;
    this.config = {
      credentials: fromCognitoIdentityPool({
        client: new CognitoIdentityClient({ region: "us-east-1" }),
        identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      }),
      region: "us-east-1",
    };

    this.sqs = new SQSClient(this.config);
  }

  receiveMessage = async () =>
    await new Promise(async (resolve, reject) => {
      const response = await this.sqs.send(
        new ReceiveMessageCommand({
          QueueUrl: this.queueUrl,
          AttributeNames: ["All"],
          WaitTimeSeconds: "10",
        })
      );
      resolve(response);
    });
}

export default SQS;
