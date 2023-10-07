import PostCard from "@/components/postCard/postCard";
import dbConnect from "@/db/dbConnect";
import { PostModel } from "@/db/models";
import { PostFormInputs } from "@/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PopularPageProps {
  postData: PostFormInputs[];
}

const Popular: FunctionComponent<PopularPageProps> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>Popular en Lumedia.tech</title>
      </Head>
      <div className="min-h-screen">
        <h1 className="capitalize text-2xl font-semibold ml-28 my-2">
          Popular
        </h1>
        <ul className="grid md:grid-cols-2 md:px-24">
          <PostCard data={postData} />
        </ul>
      </div>
    </>
  );
};

export default Popular;

export const getServerSideProps: GetServerSideProps<PopularPageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    await dbConnect();

    const response = await PostModel.find()
      .sort() // add filter
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
