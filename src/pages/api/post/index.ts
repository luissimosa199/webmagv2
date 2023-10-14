import { PostModel } from "../../../db/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { tags, page, exclude } = req.query;
    const perPage = 10;
    const skip = page ? parseInt(page as string) * perPage : 0;

    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      const regexPatterns = tagsArray.map((tag) => new RegExp(`^${tag}`, "i"));

      let response;

      if (exclude) {
        response = await PostModel.find({
          tags: { $in: regexPatterns },
          _id: { $nin: [exclude] },
        })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(perPage)
          .lean();
      } else {
        response = await PostModel.find({
          tags: { $in: regexPatterns },
        })
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(perPage)
          .lean();
      }

      res.status(200).json(response);
    } else {
      const response = await PostModel.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(perPage)
        .lean();
      res.status(200).json(response);
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
