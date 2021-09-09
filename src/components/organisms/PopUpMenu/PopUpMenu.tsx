import { AnimatePresence, motion, Variants } from "framer-motion";
import Link from "next/link";
import React, { ReactElement, useCallback, useEffect } from "react";
import styles from "./PopUpMenu.module.scss";

interface Props {
  open: boolean;
  onClose: () => void;
}

const linksMenu = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Twitter",
    url: "/twitter",
  },
  {
    label: "Youtube",
    url: "/youtube",
  },
  {
    label: "Rules",
    url: "/rules",
  },
];

const items_out = [
  {
    label: "Donate",
    url: "https://streamlabs.com/cirno_tv/tip",
    image:
      "https://panels-images.twitch.tv/panel-24761645-image-3e0a90e5-c15c-4788-b8c6-1b48f55422b8",
  },

  // {
  //   label: "FAQ",
  //   image:
  //     "https://static-cdn.jtvnw.net/jtv_user_pictures/panel-24761645-image-3e35278c-704c-497b-933c-71d20829db87",
  //   url: "https://pastebin.com/uSDzmdBL",
  // },
];

export default function PopUpMenu({ open, onClose }: Props): ReactElement {
  const { pop_wrapper, back, blue, menu_list } = styles;

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      onClose();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      {open && (
        <>
          <motion.div
            initial={{ height: "0%" }}
            exit={{ width: "0%" }}
            animate={{ height: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className={back}
          />
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0 }}
            exit={{ opacity: 0, x: 30 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "tween",
              delay: 0.1,
              duration: 0.5,
              ease: "backInOut",
            }}
            className={pop_wrapper}
          >
            <AddtionalLinks />

            <ul className={menu_list}>
              {linksMenu.map(({ label, url }) => (
                <Link key={url} passHref href={url}>
                  <a onClick={onClose}>
                    <li>{label}</li>
                  </a>
                </Link>
              ))}
            </ul>
          </motion.div>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60, opacity: 0 }}
            exit={{ opacity: 0, x: 30 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "tween",
              delay: 0,
              duration: 0.5,
              ease: "backIn",
            }}
            className={`${pop_wrapper} ${blue}`}
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AddtionalLinks() {
  const { add } = styles;

  return (
    <div className={add}>
      {items_out.map(({ label, url, image }) => (
        <Link href={url ?? ""} passHref>
          <a target={"_blank"}>
            {image ? (
              <motion.img
                whileHover={{
                  scale: 1.1,
                  filter: "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.15))",
                }}
                whileTap={{
                  scale: 0.95,
                  filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.15))",
                }}
                src={image}
                alt={label}
              />
            ) : (
              label
            )}
          </a>
        </Link>
      ))}
    </div>
  );
}
