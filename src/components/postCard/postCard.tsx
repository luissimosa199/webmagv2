import { PostFormInputs } from "@/types";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { type FunctionComponent } from "react";

interface PostCardProps {
  data: PostFormInputs[];
}

const PostCard: FunctionComponent<PostCardProps> = ({ data }) => {
  return (
    <>
      {data &&
        data.map((post) => {
          return (
            <li
              key={post._id}
              className="my-4 mx-3 grid h-64 grid-rows-2 relative"
            >
              <div className="absolute top-0 w-full h-full z-0 shadow-md">
                {post?.photo![0] && (
                  <CldImage
                    className="object-cover"
                    fill
                    alt=""
                    src={`${post?.photo![0].url as string}`}
                  />
                )}
              </div>

              <div className="row-start-2 px-2 pb-2 pt-5 flex flex-col self-end z-10 text-slate-100 bg-gradient-to-t from-slate-900 to-[#ffffff00]">
                <div className="mb-2 flex items-center gap-2">
                  <p className="mr-2 cursor-pointer rounded bg-yellow-300 px-2 py-[1px] text-sm uppercase transition-all hover:opacity-75 text-black">
                    {post.tags[1]}
                  </p>
                  <p className="text-xs">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <Link href={`/post/${post._id}`}>
                  <p className="text-xl font-semibold">{post.title}</p>
                </Link>
              </div>
            </li>
          );
        })}
    </>
  );
};

export default PostCard;
