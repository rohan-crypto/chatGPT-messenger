import openai from "./chatgpt";

const query = async (prompt: string, chatId: string, model: string) => {
    const res = await openai.createCompletion({
        model,
        prompt,
        // temperature and top_p can be changed to get more creative
        // or logical or straight forward answers from chatGPT
        // temperature: 0.9 will give bit of creative answers
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    // give first choice as the response
    .then((res) => res.data.choices[0].text)
    .catch((err) => `ChatGPT was unable to find an answer for that! 
    (Error: ${err.message})`);

    return res;
}

export default query;