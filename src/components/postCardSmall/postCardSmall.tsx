import Link from "next/link";
import { type FunctionComponent } from "react";
import Image from "next/image";
import { PostFormInputs } from "@/types";

interface PostCardSmallProps {
  post: PostFormInputs;
}

const PostCardSmall: FunctionComponent<PostCardSmallProps> = ({ post }) => {
  return (
    <div className="mr-4 grid grid-cols-4 gap-2 lg:grid-cols-3 justify-items-start">

      <div className="h-24 w-24 border col-start-1 justify-self-center bg-slate-100 relative">
        {/* <Image className="object-cover" fill alt="" src={`${(post?.photo![0].url as string)}`} /> */}
      </div>

      <div className="col-span-3 lg:col-span-2">
        <Link href={`/post/${post._id}`}>
          <h3 className="text-lg font-semibold">{post.title}</h3>
        </Link>
      </div>

    </div>
  );
};

export default PostCardSmall;
