export async function POST(request:Request){
    // Connect to our Azure Function
    const res  = await request.json();
    const  prompt = res.prompt;
    const generateImageURL = process.env.GENERATE_IMAGE_URL;
    if (!generateImageURL) {
        throw new Error('The environment variable GENERATE_IMAGE_URL is not set.');
    }

    const response  = await fetch(generateImageURL,{
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({prompt}),
    })
    const textData = await response.text()
    return new Response(JSON.stringify(textData), {
        status:200,
    })
}
