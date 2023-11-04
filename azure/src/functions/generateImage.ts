import { app, HttpRequest,  HttpResponseInit } from "@azure/functions";
import openai from "../../lib/openai"
import axios from "axios"
import generateSASToken from "../../lib/generateSASToken"
import {BlobServiceClient} from "@azure/storage-blob"

const accountName = process.env.AccountName;

const containerName = 'images';

interface GenerateImageRequest {
    prompt: string;
}

export async function generateImage(request: HttpRequest): Promise<HttpResponseInit> {
    const {prompt} = await request.json() as GenerateImageRequest;

    const response = await openai.images.generate({
        prompt: prompt,
        n: 1,
        size: '1024x1024',
    });
    const image_url = response.data[0].url; 

    const res = await axios.get(image_url, {responseType: "arraybuffer"})

    const arrayBuffer = res.data;

    const sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(
        `https://${accountName}.blob.core.windows.net?${sasToken}`
    )

    const containerClient = blobServiceClient.getContainerClient(containerName)


    // generate current timestamp
    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
        await blockBlobClient.uploadData(arrayBuffer);
        return {
            status: 200,
            body: "File uploaded successfully"
        };

    } catch (error) {
        return  {
            status: 500,
            body: error.message
        };
    }
    
};

app.http('generateImage',{
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: generateImage
})
