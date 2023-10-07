import dbConnect from "@/db/dbConnect";
import { UserModel } from "@/db/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const { email } = req.query;

      const author = await UserModel.findOne({ email }).lean();

      if (!author) {
        res.status(404).json({ error: "Author not found" });
      }

      res.status(200).json(author);
    } catch (error) {
      res.status(500).json({ error: "An error occurred." });
    }
  } else {
    res.status(405).end();
  }
}
