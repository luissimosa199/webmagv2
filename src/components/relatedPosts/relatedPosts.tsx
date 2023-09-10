import { type FunctionComponent } from "react";
import PostCardSmall from "../postCardSmall/postCardSmall";
import { CircularProgress } from "@mui/material";
import { fetchPosts } from "@/utils/fetchPosts";
import { useQuery } from "@tanstack/react-query";
import { PostFormInputs } from "@/types";

interface RelatedPostsProps {
  cat: string;
  pid: string;
}

const RelatedPosts: FunctionComponent<RelatedPostsProps> = ({ cat, pid }) => {

  const { data, error, isLoading } = useQuery(["posts"], fetchPosts);

  if (error) {
    return (
      <div>
        <p>Error: {JSON.stringify(error)}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mb-4">
        <h2 className="ml-2 mb-4 text-2xl font-semibold">Posts relacionados</h2>
        <div className="flex flex-col gap-2 ml-2 sm:w-3/4 lg:w-full">
          <div className="flex h-screen items-center justify-center">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h2 className="ml-2 mb-4 text-2xl font-semibold">Posts relacionados</h2>
      <div className="flex flex-col gap-2 ml-2 sm:w-3/4 lg:w-full">
        {data?.map((post: PostFormInputs) => {
          return <PostCardSmall key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;
