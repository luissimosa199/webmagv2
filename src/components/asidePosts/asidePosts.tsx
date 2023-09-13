import { type FunctionComponent } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/utils/fetchPosts";
import { PostFormInputs } from "@/types";

const AsidePosts: FunctionComponent = () => {
  
  const { data, error, isLoading } = useQuery(['posts'], fetchPosts);

  if (error) {
    return (
      <div>
        <p>Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-4">
      {data?.map((post: PostFormInputs) => {
        return (
          <li key={post._id}>
            <Link href={`/post/${post._id}`}>
              <div className="flex gap-2">
                <div className="h-20 w-20 flex-shrink-0 border-2 relative">
                {/* <Image className="object-cover" fill alt="" src={`${(post?.photo![0].url as string)}`} /> */}
                </div>
                <h3 className="text-lg">{post.title}</h3>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default AsidePosts;