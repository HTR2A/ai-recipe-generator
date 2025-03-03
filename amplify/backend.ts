import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";

const backend = defineBackend({
  auth,
  data,
});

// Use the correct Bedrock runtime endpoint for your region
const bedrockDataSource = backend.data.resources.graphqlApi.addHttpDataSource(
  "bedrockDS",
  "https://bedrock-runtime.ap-southeast-2.amazonaws.com",
  {
    authorizationConfig: {
      signingRegion: "ap-southeast-2", // Ensure this matches your region
      signingServiceName: "bedrock",
    },
  }
);

// Update the ARN to reference the Amazon Titan Text Lite v1 model
bedrockDataSource.grantPrincipal.addToPrincipalPolicy(
  new PolicyStatement({
    resources: [
      "arn:aws:bedrock:ap-southeast-2::foundation-model/amazon.titan-text-lite-v1"
    ],
    actions: ["bedrock:InvokeModel"],
  })
);

export { backend };
