import { Post } from "./postModel";
import { getModelForClass } from "@typegoose/typegoose";

export const PostModel = getModelForClass(Post);

// add other models here
