export async function GET(request:Request){
    const getSuggestionUrl = process.env.GET_SUGGESTION_URL;
    if (!getSuggestionUrl) {
        throw new Error('The environment variable GET_SUGGESTION_URL is not set.');
    }

    // Connect to our Azure Function
    const res = await fetch(getSuggestionUrl, {
        cache: 'no-store'
    });

    const textData = await res.text()
    return new Response(JSON.stringify(textData.trim()), {
        status:200,
    })
}