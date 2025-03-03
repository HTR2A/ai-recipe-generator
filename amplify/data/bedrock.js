export function request(ctx) {
  const { ingredients = [] } = ctx.args;
  
  // Build your prompt
  const prompt = `Suggest a recipe idea using these ingredients: ${ingredients.join(", ")}.`;

  return {
    // Use the Titan Text Lite v1 model ID from your Bedrock console
    resourcePath: "/model/amazon.titan-text-lite-v1/invoke",
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // Titan expects inputText
        inputText: prompt,
        // Adjust textGenerationConfig: max tokens for Titan Text Lite is 4000
        textGenerationConfig: {
          maxTokenCount: 4000,
          temperature: 0,
          topP: 1,
          stopSequences: [],
        },
      }),
    },
  };
}

export function response(ctx) {
  // Parse JSON from Bedrock’s response
  const parsedBody = JSON.parse(ctx.result.body);

  // Titan Lite usually returns:
  // {
  //   "results": [
  //     {
  //       "outputText": "Generated text..."
  //     }
  //   ]
  // }
  const outputText = parsedBody?.results?.[0]?.outputText || "";

  // Return the text as your function’s body
  return {
    body: outputText,
  };
}
