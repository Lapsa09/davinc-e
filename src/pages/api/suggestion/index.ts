import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(
      "https://ai-image-generator-davinc-e.azurewebsites.net/api/getchatgptsuggestion",
      { cache: "no-store" }
    );

    const data = await response.text();

    res.status(200).json(data.trim());
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json("Server error");
  }
}
