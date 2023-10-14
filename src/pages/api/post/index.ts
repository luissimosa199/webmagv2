import { PostModel } from "../../../db/models";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../db/dbConnect";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "GET") {
    const { tags, page, exclude, search } = req.query;

    let perPage = 10;
    if (search) {
      perPage = 3; // Set limit to 3 if 'search' is present
    }

    const skip = page ? parseInt(page as string) * perPage : 0;

    let queryConditions: Record<string, any> = {};

    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : [tags];
      const regexPatterns = tagsArray.map((tag) => new RegExp(`^${tag}`, "i"));
      queryConditions["tags"] = { $in: regexPatterns };
    }

    if (exclude) {
      queryConditions["_id"] = { $nin: [exclude] };
    }

    if (search) {
      queryConditions["title"] = new RegExp(search as string, "i");
    }

    const response = await PostModel.find(queryConditions)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .lean();

    res.status(200).json(response);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
