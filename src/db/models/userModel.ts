import { modelOptions, prop } from "@typegoose/typegoose";
import { nanoid } from "nanoid";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    allowMixed: 0,
  },
})
export class User {
  @prop({ default: () => nanoid(9) })
  _id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop()
  image?: string;

  @prop({ default: "" })
  bio?: string;

  @prop()
  emailVerified?: Date | null;
}
