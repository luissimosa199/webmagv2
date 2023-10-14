import { FunctionComponent, useEffect } from "react";
import { PostFormInputs } from "@/types";
import PostCardSmall from "../postCardSmall/postCardSmall";

interface SearchButtonResultsProps {
  data: PostFormInputs[];
  isLoading: boolean;
}

const SearchButtonResults: FunctionComponent<SearchButtonResultsProps> = ({
  data,
  isLoading,
}) => {
  return (
    <div className="mx-auto flex flex-col gap-1">
      {isLoading && <p>Cargando...</p>}
      {data.map((post) => {
        return (
          <PostCardSmall
            key={post._id}
            post={post}
          />
        );
      })}
    </div>
  );
};

export default SearchButtonResults;
