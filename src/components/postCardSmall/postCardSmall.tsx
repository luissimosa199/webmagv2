import Link from "next/link";
import { type FunctionComponent } from "react";
import { PostFormInputs } from "@/types";
import { CldImage } from "next-cloudinary";

interface PostCardSmallProps {
  post: PostFormInputs;
}

const PostCardSmall: FunctionComponent<PostCardSmallProps> = ({ post }) => {
  return (
    <div className="grid grid-cols-4 gap-2 lg:grid-cols-3 justify-items-start">
      <div className="h-24 w-24 border col-start-1 justify-self-center bg-slate-100 relative">
        <CldImage
          className="object-cover"
          fill
          alt=""
          src={`${post?.photo![0].url as string}`}
        />
      </div>

      <div className="col-span-3 lg:col-span-2">
        <Link href={`/post/${post.urlSlug}`}>
          <h3 className="text-lg font-semibold ml-2 min-[400px]:ml-0">
            {post.title}
          </h3>
        </Link>
      </div>
    </div>
  );
};

export default PostCardSmall;
