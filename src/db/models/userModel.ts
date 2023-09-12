import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export default class User {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop()
  image?: string;

  @prop()
  photos?: string[];

  @prop()
  emailVerified?: Date | null;

  @prop({ default: false })
  disableAds?: boolean;

  @prop({ default: 'USER' })
  role?: string;
}

export const UserModel = getModelForClass(User);
