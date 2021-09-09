import React, { ReactElement } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./YoutubeList.module.scss";
import YoutubeCard from "components/molecutes/YoutubeCard";
import { Navigation } from "swiper";
import { PropsVideos } from "components/templates/YoutubeTemplate/YoutubeTemplate";

export default function YoutubeList({ videos }: PropsVideos): ReactElement {
  const { youtube_grid_wrapper } = styles;

  return (
    <div className={youtube_grid_wrapper}>
      <Swiper
        modules={[Navigation]}
        slidesPerView={2}
        spaceBetween={20}
        freeMode
        grabCursor
        navigation
      >
        {videos.map((video, index) => (
          <SwiperSlide key={`Youtube_${video.id}`}>
            <YoutubeCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
