import PostCard from "@/components/postCard/postCard";
import dbConnect from "@/db/dbConnect";
import { PostModel } from "@/db/models";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PostFormInputs } from "@/types";
import { FunctionComponent } from "react";
import Head from "next/head";

interface NovedadesPageProps {
  postData: PostFormInputs[];
}

const Novedades: FunctionComponent<NovedadesPageProps> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>Nuevo en Lumedia.tech</title>
      </Head>
      <div className="min-h-screen">
        <h1 className="capitalize text-2xl font-semibold ml-28 my-2">
          Novedades
        </h1>
        <ul className="grid md:grid-cols-2 md:px-24">
          <PostCard data={postData} />
        </ul>
      </div>
    </>
  );
};

export default Novedades;

export const getServerSideProps: GetServerSideProps<
  NovedadesPageProps
> = async (context: GetServerSidePropsContext) => {
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
