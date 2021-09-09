import TwitterTemplate from "components/templates/TwitterTemplate";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";

export interface TwitterItem {
  text: string;
  created_at: string;
  id: string;
}

interface Props {
  data: TwitterItem[] | undefined;
}

const Twitter: NextPage<Props> = ({ data }) => {
  if (!data) return <div>:(</div>;

  return (
    <>
      <NextSeo title="CirnoTV: Twitter" description="Twitter" />
      <TwitterTemplate tweets={data} />
    </>
  );
};

export async function getServerSideProps() {
  var result = await fetch(
    `https://api.twitter.com/2/users/35681300/tweets?tweet.fields=text,id,created_at&media.fields=url,preview_image_url&expansions=attachments.media_keys&exclude=retweets,replies&max_results=100`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.TWITTER_BEARER,
      },
    }
  ).then((res) => res.json());

  const revalidateTime = 5 * 60; // min, sec

  return {
    props: { data: result.data, revalidate: revalidateTime }, // will be passed to the page component as props
  };
}

export default Twitter;
