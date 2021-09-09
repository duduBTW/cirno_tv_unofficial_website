import { twitterMenu } from "components/contants/menuLists";
import GeneralTemplate from "components/organisms/GeneralTemplate";
import TwitterList from "components/organisms/TwitterList";
import { TwitterItem } from "pages/twitter";
import React, { ReactElement } from "react";

export interface PropsTwitter {
  tweets: TwitterItem[];
}

export default function TwitterTemplate({
  tweets,
}: PropsTwitter): ReactElement {
  return (
    <GeneralTemplate label="Twitter" menuContent={twitterMenu}>
      <TwitterList tweets={tweets} />
    </GeneralTemplate>
  );
}
