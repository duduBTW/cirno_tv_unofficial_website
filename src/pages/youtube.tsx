import type { NextPage } from "next";
import { youtube, youtube_v3 } from "googleapis/build/src/apis/youtube";

import YoutubeTemplate from "../components/templates/YoutubeTemplate";
import React from "react";
import { NextSeo } from "next-seo";

export type YoutubeItem = youtube_v3.Schema$PlaylistItem;

interface Props {
  data: YoutubeItem[] | undefined;
}

const Youtube: NextPage<Props> = ({ data }) => {
  if (!data) return <div>:(</div>;

  return (
    <>
      <NextSeo title="CirnoTV: Youtube" description="Youtube" />
      <YoutubeTemplate videos={data} />
    </>
  );
};

export async function getStaticProps() {
  let result: youtube_v3.Schema$PlaylistItem[] | undefined = undefined;

  const userY = await youtube("v3").channels.list({
    id: ["UC2hvgfQKkUtepX-1emtItgA"],
    part: ["contentDetails"],
    key: process.env.YOUTUBE_TOKEN,
  });

  if (userY.data.items?.[0].contentDetails?.relatedPlaylists) {
    const resultApiY = await youtube("v3").playlistItems.list({
      playlistId: userY.data.items[0].contentDetails.relatedPlaylists.uploads,
      part: ["snippet"],
      key: process.env.YOUTUBE_TOKEN,
      maxResults: 50,
    });

    result = resultApiY.data.items;
  }

  if (!result)
    return {
      notFound: true,
    };

  const revalidateTime = 5 * 60; // min, sec

  return {
    props: { data: result, revalidate: revalidateTime }, // will be passed to the page component as props
  };
}

export default Youtube;
