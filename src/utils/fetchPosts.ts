import { PostFormInputs } from "@/types";

export async function fetchPosts({
  tags,
  exclude,
  searchTerm,
}: {
  tags?: string;
  exclude?: string;
  searchTerm?: string;
}): Promise<PostFormInputs[]> {
  const queryParams = new URLSearchParams();

  if (tags) {
    queryParams.append("tags", tags);
  }

  if (exclude) {
    queryParams.append("exclude", exclude);
  }

  if (searchTerm) {
    queryParams.append("search", searchTerm); // Assuming the backend uses "search" as the query parameter key for searching
  }

  const url = `/api/post?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
