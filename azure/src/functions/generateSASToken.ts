import { app, HttpResponseInit } from "@azure/functions";
import generateSASToken from "../../lib/generateSASToken";

export async function generateToken(): Promise<HttpResponseInit> {
    const sasToken = await generateSASToken();
    return { body: sasToken};
};

app.http('generateSASToken', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: generateToken
});