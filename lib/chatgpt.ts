import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    // this is a key to access openAI api which will make chatGPT calls
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default openai;