import React, { ReactElement } from "react";
import styles from "./TwitterList.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import TwitterCard from "components/molecutes/TwitterCard";
import { TwitterItem } from "pages/twitter";
import { Pagination } from "swiper";

interface Props {
  tweets: TwitterItem[];
}

export default function TwitterList({ tweets }: Props): ReactElement {
  const { twitter_grid_wrapper } = styles;

  return (
    <div className={twitter_grid_wrapper}>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        slidesPerView={2}
        spaceBetween={20}
        freeMode
        grabCursor
      >
        {tweets.map((tweet, index) => (
          <SwiperSlide key={`Twitter_${index}`}>
            <TwitterCard tweet={tweet} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
