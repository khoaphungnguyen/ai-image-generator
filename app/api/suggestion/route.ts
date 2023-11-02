export async function GET(request:Request){
    // Connect to our Azure Function
    const res  = await fetch("...",{
        cache: 'no-store'
    })

    const textData = await res.text()
    return new Response(JSON.stringify(textData.trim()), {
        status:200,
    })
}