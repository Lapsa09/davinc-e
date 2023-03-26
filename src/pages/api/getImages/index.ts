import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const images = await fetch(
    "https://ai-image-generator-davinc-e.azurewebsites.net/api/getimages",
    {
      cache: "no-store",
    }
  );

  const blob = await images.blob();
  const textData = await blob.text();

  const data = JSON.parse(textData);

  res.status(200).json(data);
}
