import OpenAI from "openai";


const MESSAGE_COMPLEMENT =
  "formatado em json array com o campo name, representando o nome do lugar e a localização. E o campo location sendo um array com as coordenadas";

export class Openai {
  static async listModels() {
    const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
    const response = await openai.models.list();
    return response;
  }

  static async getLocations(message: string) {
    const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});
    try {
      const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `${message} ${MESSAGE_COMPLEMENT}`,
        max_tokens: 500,
        temperature: 0,
      });
      return response;
    } catch (error) {
      console.error(error);
    }
  }
}
