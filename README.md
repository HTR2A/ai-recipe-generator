# AI Recipe Generator


Project Overview
ai-recipe-generator is a serverless web application that:

Uses AWS Amplify to host a React front end built with Vite.
Allows users to sign in via AWS Cognito (configured with Amplify Auth).
Lets users input ingredients to generate AI-driven recipes.
Invokes Amazon Bedrock’s AI model—in this case, the Amazon Titan Text Lite v1 model—via a custom GraphQL query.
Work Completed
Frontend Setup:

Created a React app using Vite.
Configured GitHub repository and deployed the static website via AWS Amplify.
Integrated Amplify Auth (with custom email verification) and wrapped the app in <Authenticator> to enforce user sign-in.
Configured the Amplify client in your app (using authMode: "userPool").
Backend Setup:

Defined a GraphQL schema using Amplify Data with a custom query named askBedrock that returns a BedrockResponse type.
Built a custom resolver in bedrock.js that constructs a prompt and invokes the Amazon Titan Text Lite v1 model.
Updated backend configuration (in backend.ts) to attach the proper IAM policy and point to the correct Bedrock model endpoint.
Deployed the backend sandbox using the Amplify Gen2 CLI (npx @aws-amplify/backend-cli sandbox --profile amplify-admin).
Deployment & Integration:

Both frontend and backend have been deployed.
The Amplify outputs (in amplify_outputs.json) are used by the front end to connect to the deployed AppSync API.
Current Status & Issues
Frontend:

The app is up and running.
Users can sign in via the Amplify Authenticator.
Backend:

The backend sandbox deployment appears successful.
However, when running the GraphQL query (either via the app or directly in the AppSync console), you get an error:
json
Copy
{
  "data": { "askBedrock": null },
  "errors": [
    {
      "errorType": "Unauthorized",
      "message": "Not Authorized to access askBedrock on type Query"
    }
  ]
}
This indicates that the request isn’t being made with valid Cognito credentials (a valid user token) even though your client is set to use authMode: "userPool".
Troubleshooting So Far:

Verified that the frontend is wrapped in <Authenticator> and that the Amplify client uses authMode: "userPool".
Checked that the backend is deployed with the correct model endpoint and IAM policies.
Logs suggest the backend is being invoked, but the GraphQL request lacks proper authorization, leading to an empty response.
Next Steps
Verify Authentication:

Check in your browser’s Network tab to confirm that GraphQL requests include a valid Cognito token in the Authorization header.
Ensure the user signs in properly so that the Amplify client can use the user pool credentials.
Test Directly in AppSync Console:

Run a test query (as an authenticated user) in the AppSync console:
graphql
Copy
query {
  askBedrock(ingredients: ["eggs", "ham", "sausage"]) {
    body
    error
  }
}
This will help determine if the issue is with the client or the backend configuration.
Add Debug Logging:

Temporarily add console.log() statements in your bedrock.js response function to log the raw output from Bedrock in CloudWatch. This will confirm if the model is returning any data.
