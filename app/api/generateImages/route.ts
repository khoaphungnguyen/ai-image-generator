export async function POST(request:Request){
    // Connect to our Azure Function
    const res  = await fetch("http://localhost:7071/api/getSuggestion",{
        cache: 'no-store'
    })

    const textData = await res.text()
    return new Response(JSON.stringify(textData.trim()), {
        status:200,
    })
}
