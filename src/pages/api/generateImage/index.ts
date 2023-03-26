import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { prompt } = req.body;
    const response = await fetch(
      "https://ai-image-generator-davinc-e.azurewebsites.net/api/generateimage",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      }
    );

    const data = await response.text();

    res.status(200).json(data);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
}
