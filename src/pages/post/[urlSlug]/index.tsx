import AuthorCard from "@/components/authorCard/authorCard";
import RelatedPosts from "@/components/relatedPosts/relatedPosts";
import ReactMarkdownContainer from "@/components/reactMarkdownContainer/reactMarkdownContainer";
import { PostFormInputs } from "@/types";
import dbConnect from "@/db/dbConnect";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PostModel } from "@/db/models";
import { FunctionComponent } from "react";
import Head from "next/head";
import { CldImage } from "next-cloudinary";

interface PostPageProps {
  postData: PostFormInputs;
}

const Post: FunctionComponent<PostPageProps> = ({ postData }) => {
  const pageTitle = `Lumedia: ${postData.title}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="mb-4 lg:grid lg:grid-cols-3 lg:grid-rows-[repeat(3, minmax(fit-content, 1fr))] lg:gap-y-2">
        {/* header */}
        <div className="flex h-64 flex-col justify-end gap-2 bg-slate-100 lg:col-span-3 relative">
          <div className="absolute top-0 w-full h-full z-0">
            {postData.photo![0] && (
              <CldImage
                className="object-cover"
                fill
                alt=""
                src={`${postData.photo![0].url as string}`}
              />
            )}
          </div>
          <div className="flex items-center z-10 p-4">
            <p className="mr-2 cursor-pointer rounded bg-yellow-300 px-2 py-[1px] text-sm uppercase transition-all hover:opacity-75 ">
              {postData?.tags[1]}
            </p>
            <p className="text-xs text-slate-100 ">
              {new Date(postData.createdAt).toLocaleDateString()}
            </p>
          </div>
          <h1 className="text-2xl font-semibold z-10 p-4 bg-gradient-to-t from-slate-900 to-[#ffffff00] text-slate-100 lg:text-4xl">
            {postData.title}
          </h1>
        </div>

        {/* content */}
        <article className="lg:col-span-2 lg:row-start-2 lg:row-span-4">
          <div className="m-4 mb-12 lg:mx-12">
            <ReactMarkdownContainer>{postData.text}</ReactMarkdownContainer>
          </div>
          <AuthorCard author={postData?.authorId} />
        </article>

        {/* sidebar */}
        <div className="lg:row-start-2">
          <RelatedPosts
            cat={postData?.tags[1] as string}
            pid={postData?._id as string}
          />
        </div>
      </div>
    </>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    await dbConnect();

    const { urlSlug } = context.query;

    const post = await PostModel.findOne({ urlSlug: urlSlug }).lean();

    if (!post) {
      return {
        notFound: true,
      };
    }

    const postData = {
      _id: post._id,
      urlSlug: post.urlSlug,
      text: post.text,
      title: post.title,
      length: post.length,
      photo: post.photo,
      createdAt: post.createdAt.toISOString(),
      tags: post.tags,
      authorId: post.authorId,
      authorName: post.authorName,
      links: post.links,
    };

    return {
      props: {
        postData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
