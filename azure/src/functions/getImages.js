const { app } = require("@azure/functions");

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const generateSASToken = require("../../lib/generateSASToken");

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;

const containerName = "images";

const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

app.http("getImages", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (req, context) => {
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const imagesUrls = [];
    const sasToken = await generateSASToken();

    for await (const blob of containerClient.listBlobsFlat()) {
      const imageUrl = `${blob.name}?${sasToken}`;
      const url = `https://${accountName}.blob.core.windows.net/${containerName}/${imageUrl}`;
      imagesUrls.push({ url, name: blob.name });
    }

    const sortedImagesUrls = imagesUrls.sort((a, b) => {
      const aName = a.name.split("_")[1].split(".")[0];
      const bName = b.name.split("_")[1].split(".")[0];
      return bName - aName;
    });

    context.log(`Http function processed request for url ${req.url}`);

    return {
      jsonBody: {
        imagesUrls: sortedImagesUrls,
      },
    };
  },
});
