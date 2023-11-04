import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import openai from "../../lib/openai"

export async function getSuggestion(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: "Write a random text prompt for DALL-E to generate an image, this prompt will be shown to the user, include details such as the genre and what type  of painting it should be, options can be included:oil paitning, wawter color, photo-realistic, 4k, abstract, modern, black and white. Do not wrap the answer in the quotes",
        max_tokens: 100 ,
        temperature: 0.8,

    })
    context.log(`Http function processed request for url "${request.url}"`);
    const  responseData = response.choices[0].text
    return { body: responseData};
};

app.http('getSuggestion', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: getSuggestion
});
