import { PostFormInputs } from "@/types";

export async function fetchPosts({
  tags,
  exclude,
}: {
  tags?: string;
  exclude?: string;
}): Promise<PostFormInputs[]> {
  const queryParams = new URLSearchParams();

  if (tags) {
    queryParams.append("tags", tags);
  }

  if (exclude) {
    queryParams.append("exclude", exclude);
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
