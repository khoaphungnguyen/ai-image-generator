export async function GET(){
    const getImageUrl = process.env.GET_IMAGES_URL;
if (!getImageUrl) {
    throw new Error('The environment variable GET_IMAGES_URL is not set.');
}

const res = await fetch(getImageUrl);
    
    const blob =  await res.blob();
    const textData = await blob.text();
    const data = JSON.parse(textData)

    return new Response(JSON.stringify(data),{
        status:200,
    })

}

export const dynamic = 'force-dynamic'