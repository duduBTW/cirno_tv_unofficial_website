import { YoutubeItem } from "pages/youtube";
import React, { ReactElement } from "react";
import styles from "./YoutubeCard.module.scss";
import Link from "next/link";

interface Props {
  video: YoutubeItem;
}

export default function YoutubeCard({ video }: Props): ReactElement {
  const { youtube_card_container, miniature, title } = styles;

  return (
    <Link
      href={
        `https://www.youtube.com/watch?v=${video.snippet?.resourceId?.videoId}` ||
        "https://www.twitch.tv/products/cirno_tv"
      }
      passHref
    >
      <a className={youtube_card_container} target="_blank">
        <img
          className={miniature}
          src={
            video.snippet?.thumbnails?.maxres?.url ||
            video.snippet?.thumbnails?.standard?.url ||
            video.snippet?.thumbnails?.medium?.url ||
            video.snippet?.thumbnails?.default?.url ||
            "https://placewaifu.com/image/200/300"
          }
          alt="place"
        />
        <div className={title}>{video.snippet?.title}</div>
      </a>
    </Link>
  );
}
