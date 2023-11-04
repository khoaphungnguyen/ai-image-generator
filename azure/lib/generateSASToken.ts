import {BlobSASPermissions, StorageSharedKeyCredential,
BlobServiceClient, generateBlobSASQueryParameters} from "@azure/storage-blob"

const accountName = process.env.AccountName
const accountKey = process.env.AccountKey;
const containerName = 'images'

const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName, accountKey
)

const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    sharedKeyCredential
)

const generateSASToken =async () => {
    const containerClient = blobServiceClient.getContainerClient(containerName)
    const permissions = new BlobSASPermissions();
    permissions.write = true;
    permissions.create = true;
    permissions.read = true; 

    const expireDate = new Date();
    expireDate.setMinutes(expireDate.getMinutes()+ 30);

    const sasToken = generateBlobSASQueryParameters(
        {
        containerName: containerClient.containerName,
        permissions: permissions,
        expiresOn: expireDate,
        },
        sharedKeyCredential
    ).toString()
    return sasToken
}

export default generateSASToken;    