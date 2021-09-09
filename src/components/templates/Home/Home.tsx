import { homeMenu } from "components/contants/menuLists";
import React, { ReactElement } from "react";
import Wrapper from "../../elements/Wrapper";
import Chat from "../../molecutes/Chat";
import Menu from "../../molecutes/Menu";
import styles from "./Home.module.scss";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Title } from "./title";

const ReactTwitchEmbedVideo = dynamic(
  () => import("react-twitch-embed-video"),
  { ssr: false }
);

export default function HomeTemplate(): ReactElement {
  const {
    home_container,

    live,
    live_content,
    menu,
    chat,
    bottom_line,
  } = styles;

  return (
    <Wrapper>
      <div className={home_container}>
        <Title />
        <div className={live}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.5,
              type: "tween",
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={live_content}
          >
            <ReactTwitchEmbedVideo
              //@ts-ignore
              layout="video"
              allowfullscreen={false}
              height={300}
              autoplay
              channel="cirno_tv"
              width={550}
            />
          </motion.div>
        </div>
        <div className={menu}>
          <Menu content={homeMenu} />
        </div>
        <div className={chat}>
          <Chat />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          transition={{
            delay: 0.5,
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          }}
          animate={{ opacity: 1, y: 0 }}
          className={bottom_line}
        />
      </div>
    </Wrapper>
  );
}
