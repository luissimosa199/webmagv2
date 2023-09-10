import { PostModel } from "../../../db/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const id = req.query.id as string;

  if (req.method === "GET") {
    const post = await PostModel.findById(id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404);
    }
  } else {
    res.status(404).send({ message: "Post not found" });
  }
}
