import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SearchButtonResults from "../searchButtonResults/searchButtonResults";
import { useQuery } from "@tanstack/react-query";
import { PostFormInputs } from "@/types";
import { fetchPosts } from "@/utils/fetchPosts";

const SearchButton = () => {
  const [searching, setSearching] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searching]);

  const { data, isLoading } = useQuery<PostFormInputs[]>(
    ["posts", searchTerm],
    () => {
      return fetchPosts({ searchTerm });
    },
    {
      enabled: !!searchTerm,
    }
  );

  const handleSearch = () => {
    setSearching(!searching);
  };

  return (
    <div className="">
      <button
        className="mr-6"
        onClick={handleSearch}
      >
        <Image
          width={24}
          height={24}
          src="https://img.icons8.com/material-outlined/24/null/search--v1.png"
          alt="Search Button"
        />
      </button>
      {searching && (
        <div className="w-[95vw] min-[450px]:w-fit min-h-36 p-2 bg-white rounded shadow-md top-20 right-0 absolute min-[450px]:top-20 min-[450px]:right-2 z-50">
          <input
            type="text"
            value={searchTerm}
            ref={inputRef}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="shadow rounded p-2 w-full"
            placeholder="Buscar un post"
          />

          {data && (
            <div className="p-2">
              <SearchButtonResults
                isLoading={isLoading}
                data={data}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchButton;
