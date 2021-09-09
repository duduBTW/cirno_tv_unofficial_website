import { TwitterItem } from "pages/twitter";
import React, { ReactElement, useMemo } from "react";
import styles from "./TwitterCard.module.scss";
import { render, cancel, register } from "timeago.js";
import Link from "next/link";
import { HeaderTwitter } from "./HeaderTwitter";

export interface Props {
  tweet: TwitterItem;
}

function urlify(text: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a target="_blank" href="' + url + '">' + url + "</a>";
  });
}

export default function TwitterCard({ tweet }: Props): ReactElement {
  const { twitter_card_container, text, go_post } = styles;
  const textWithLink = useMemo(() => urlify(tweet.text), [tweet]);

  return (
    <div className={twitter_card_container}>
      <HeaderTwitter tweet={tweet} />
      <div
        dangerouslySetInnerHTML={{ __html: textWithLink }}
        className={text}
      />
      <Link href={`https://twitter.com/CirnoTV/status/${tweet.id}`} passHref>
        <a className={go_post} target="_blank">
          <span>Go to post</span>
          <img src="/Arrow - Right 2.svg" alt="next" />
        </a>
      </Link>
    </div>
  );
}
