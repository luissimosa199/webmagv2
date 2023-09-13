import { type FunctionComponent } from "react";
import Image from "next/image";
import dbConnect from "@/db/dbConnect";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { User } from "@/types";
import { UserModel } from "@/db/models";

interface AuthorCardProps {
  authorData?: Omit<User, 'email' | "photos">;
}

const AuthorCard: FunctionComponent<AuthorCardProps> = ({ authorData }) => {
  return (
    <div className="m-2 grid gap-4 min-[475px]:grid-cols-4">
      <div className="col-start-2 flex items-center justify-center min-[475px]:col-start-1">
        <div className="h-[100px] w-[100px] rounded-full bg-slate-100">
          {/* <Image width={100} height={100} src={authorData.image as string } alt="author profile picture" /> */}
        </div>
      </div>

      <div className="col-span-3 flex flex-col justify-center gap-2">
        {/* <h2 className="text-2xl font-semibold">{authorData.name}</h2> */}
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga minima
          expedita eos debitis, velit voluptas cum illo dolorem reiciendis quia.
        </p>
      </div>
    </div>
  );
};

export default AuthorCard;

export const getServerSideProps: GetServerSideProps<AuthorCardProps> = async (context: GetServerSidePropsContext) => {
  try {
    await dbConnect();

    const { id } = context.query;

    const author = await UserModel.findOne({ _id: id }).lean();

    if (!author) {
      return {
        notFound: true,
      };
    }

    const authorData = {
      name: author.name,
      image: author.image || ""
    };

    return {
      props: {
        authorData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
