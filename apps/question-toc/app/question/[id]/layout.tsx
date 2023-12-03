import React from "react";
import Script from "next/script";
import styles from "@/styles/Common.module.scss";
import { getQuestion } from "@/services/question";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data = { title: "", desc: "" } } = await getQuestion(params.id);
  return {
    title: data.title,
    description: data.desc,
  };
}

const QuestionLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const { data = { js: "" } } = await getQuestion(params.id);

  return (
    <>
      {children}
      <Script id="page-js">{data.js}</Script>
    </>
  );
};

export default QuestionLayout;
