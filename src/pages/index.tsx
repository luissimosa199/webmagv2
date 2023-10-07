import PostCard from "@/components/postCard/postCard";
import dbConnect from "@/db/dbConnect";
import { PostModel } from "@/db/models";
import { PostFormInputs } from "@/types";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PostListPageProps {
  postData: PostFormInputs[];
}

const PostList: FunctionComponent<PostListPageProps> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>Lumedia.tech</title>
      </Head>
      <div className="min-h-screen">
        <ul className="grid md:grid-cols-2 md:px-24">
          <PostCard data={postData} />
        </ul>
      </div>
    </>
  );
};

export default PostList;

export const getServerSideProps: GetServerSideProps<
  PostListPageProps
> = async () => {
  try {
    await dbConnect();

    const response = await PostModel.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
      .exec();

    const postData = response.map((item) => ({
      _id: item._id,
      title: item.title,
      text: item.text,
      length: item.length,
      photo: item.photo,
      createdAt: item.createdAt.toISOString(),
      tags: item.tags || [],
      authorId: item.authorId || "",
      authorName: item.authorName || "",
      links: item.links || [],
    }));

    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        postData: [],
      },
    };
  }
};
