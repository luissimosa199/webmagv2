import AuthorCard from "@/components/authorCard/authorCard";
import Head from "next/head";
import React from "react";

const Contact = () => {
  return (
    <>
      <Head>
        <title>Contacta a Luis</title>
      </Head>
      <div className="min-h-screen">
        <h1 className="capitalize text-2xl font-semibold ml-28 my-2">
          Contáctame
        </h1>
        <div className="shadow-md w-fit my-4 mx-auto p-4">
          <AuthorCard author="simosa37@gmail.com" />
        </div>
      </div>
    </>
  );
};

export default Contact;
