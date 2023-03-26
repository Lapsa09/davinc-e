const { app } = require("@azure/functions");
const openai = require("../../lib/openai");

app.http("getChatGPTSuggestion", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "Generate a text prompt for DALL-E to generate an image, this prompt will be shown to the user. Include details such as the type of image you want, the colors, the style, etc. The more details you include, the better the image will be. You can also include a description of the image you want to generate. For example, you can say. Do not wrap the text in quotes.",
      max_tokens: 100,
      temperature: 0.8,
    });

    context.log(`Http function processed request for url "${request.url}"`);

    const responseText = response.data.choices[0].text;

    return { body: responseText };
  },
});
