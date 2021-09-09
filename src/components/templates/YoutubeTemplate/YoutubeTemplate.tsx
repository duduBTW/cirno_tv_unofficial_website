import { youtubeMenu } from "components/contants/menuLists";
import GeneralTemplate from "components/organisms/GeneralTemplate";
import YoutubeList from "components/organisms/YoutubeList";
import { YoutubeItem } from "pages/youtube";
import React, { ReactElement } from "react";

export interface PropsVideos {
  videos: YoutubeItem[];
}

export default function YoutubeTemplate({ videos }: PropsVideos): ReactElement {
  return (
    <GeneralTemplate label="Youtube" menuContent={youtubeMenu}>
      <YoutubeList videos={videos} />
    </GeneralTemplate>
  );
}
