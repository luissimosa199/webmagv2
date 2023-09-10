import AuthorCard from "@/components/authorCard/authorCard";
import RelatedPosts from "@/components/relatedPosts/relatedPosts";
import Image from "next/image";
import { PostFormInputs } from "@/types";
import dbConnect from "@/db/dbConnect";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { PostModel } from "@/db/models";
import { FunctionComponent } from "react";

interface PostPageProps {
  postData: PostFormInputs | null;
}

const Post: FunctionComponent<PostPageProps> = ({ postData }) => {

  if (postData) {
    return (
      <div className="mb-4 lg:grid lg:grid-cols-3 lg:grid-rows-[repeat(3, minmax(fit-content, 1fr))] lg:gap-y-2">

        {/* header */}
        <div className="flex h-64 flex-col justify-end gap-2 bg-slate-100 lg:col-span-3 relative">

          <div className="absolute top-0 w-full h-full z-0">
            <Image className="object-cover" fill alt="" src={`${(postData.photo![0].url as string)}`} />
          </div>
          <div className="flex items-center z-10 p-4">
            <p className="mr-2 cursor-pointer rounded bg-yellow-300 px-2 py-[1px] text-sm uppercase transition-all hover:opacity-75">
              {postData?.tags[1]}
            </p>
            <p className="text-xs text-slate-100">{postData?.createdAt}</p>
          </div>
          <h1 className="text-2xl font-semibold z-10 p-4 bg-gradient-to-t from-black from-30% via-black via-60% to-transparent to-10% text-slate-100 lg:text-4xl">{postData.title}</h1>
        </div>

        {/* content */}
        <article className="lg:col-span-2 lg:row-start-2 lg:row-span-4">
          <div className="m-4 mb-12 lg:mx-12">
            {postData.text && postData.text.split("\n\n").map((e: string, idx: number) => {
              return (
                <p className="mb-4" key={idx}>
                  {e}
                </p>
              );
            })}
          </div>
          <AuthorCard authorId={postData?.authorId as string} />
        </article>

        {/* sidebar */}
        <div className="lg:row-start-2">
          <RelatedPosts cat={postData?.tags[1] as string} pid={postData?._id as string} />
        </div>

      </div>
    );
  }

  return (
    <p>Post no encontrado</p>
  )
};

export default Post;

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (context: GetServerSidePropsContext) => {
  try {
    await dbConnect();

    const { id } = context.query;

    let post;

    if (id!.length !== 9) {
      post = await PostModel.findOne({ urlSlug: id }).lean();
    } else {
      post = await PostModel.findById(id).lean();
    }

    if (!post) {
      return {
        notFound: true,
      };
    }

    const postData = {
      _id: post._id,
      urlSlug: post.urlSlug || "",
      mainText: post.text,
      length: post.length,
      photo: post.photo,
      createdAt: post.createdAt.toISOString(),
      tags: post.tags || [],
      authorId: post.authorId || '',
      authorName: post.authorName || '',
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