import { type FunctionComponent } from "react";
import PostCard from "@/components/postCard/postCard";
import dbConnect from "@/db/dbConnect";
import { PostModel } from "@/db/models";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PostFormInputs } from "@/types";
import Head from "next/head";
import { capitalizeFirstLetter } from "@/utils/capitalizeCatName";

interface CatPageProps {
  postData: PostFormInputs[];
  catName: string;
}

const CatPage: FunctionComponent<CatPageProps> = ({ postData, catName }) => {
  const pageTitle = `${capitalizeFirstLetter(catName)} en Lumedia.tech`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="min-h-screen">
        <h1 className="capitalize text-2xl font-semibold ml-28 my-2">
          {catName}
        </h1>
        {postData ? (
          <ul className="grid md:grid-cols-2 md:px-24">
            <PostCard data={postData} />
          </ul>
        ) : (
          <p className="ml-2">
            No hay publicaciones en esta categoría, todavía.
          </p>
        )}
      </div>
    </>
  );
};

export default CatPage;

export const getServerSideProps: GetServerSideProps<CatPageProps> = async (
  context: GetServerSidePropsContext
) => {
  const { catName } = context.query;
  try {
    await dbConnect();

    const response = await PostModel.find({ tags: { $in: [catName] } })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

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
        catName: catName as string,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        postData: [],
        catName: catName as string,
      },
    };
  }
};
