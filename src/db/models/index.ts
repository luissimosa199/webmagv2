import { Post } from "./postModel";
import { User } from "./userModel";
import { getModelForClass } from "@typegoose/typegoose";

export const PostModel = getModelForClass(Post);
export const UserModel = getModelForClass(User);

// add other models here
