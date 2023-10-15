import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SearchButtonResults from "../searchButtonResults/searchButtonResults";
import { useQuery } from "@tanstack/react-query";
import { PostFormInputs } from "@/types";
import { fetchPosts } from "@/utils/fetchPosts";
import useDebounce from "@/hooks/useDebounce";

const SearchButton = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searching && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searching]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setSearching(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading } = useQuery<PostFormInputs[]>(
    ["posts", debouncedSearchTerm],
    () => {
      return fetchPosts({ searchTerm: debouncedSearchTerm });
    },
    {
      enabled: !!debouncedSearchTerm,
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
        <div
          ref={searchBoxRef}
          className="w-screen min-[500px]:w-[448px] min-h-36 p-2 bg-white rounded shadow-md top-20 right-0 absolute min-[500px]:top-20 min-[500px]:right-2 z-50"
        >
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
            <div className="p-2 max-w-md ">
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
