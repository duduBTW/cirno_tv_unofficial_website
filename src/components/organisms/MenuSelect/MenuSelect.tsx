import Link from "next/link";
import React, { ReactElement } from "react";
import styles from "./MenuSelect.module.scss";
import { useRouter } from "next/router";
import { useMenu } from "components/elements/Wrapper/Wrapper";

const items = [
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
];

const items_out = [
  {
    label: "Donate",
    url: "https://streamlabs.com/cirno_tv/tip",
    image:
      "https://panels-images.twitch.tv/panel-24761645-image-3e0a90e5-c15c-4788-b8c6-1b48f55422b8",
  },
  {
    label: "Rules",
    image:
      "https://panels-images.twitch.tv/panel-24761645-image-83cb1351-0bc9-423c-9c96-7d8fed65ff13",
    url: "https://pastebin.com/LhigjsKN",
  },
  {
    label: "FAQ",
    image:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/panel-24761645-image-3e35278c-704c-497b-933c-71d20829db87",
    url: "https://pastebin.com/uSDzmdBL",
  },

  {
    label: "PC Specs",
    image:
      "https://panels-images.twitch.tv/panel-24761645-image-bacc0618-2ff5-4cd1-bf11-89d17b7b040c",
    url: "https://pastebin.com/p11v5N7C",
  },
];

export default function MenuSelect(): ReactElement {
  const { menu_select, item_style, active, main, sub, close } = styles;
  const router = useRouter();
  const [_, setMenu] = useMenu();

  return (
    <div className={menu_select}>
      <img
        onClick={() => setMenu((o) => !o)}
        src="/close.svg"
        className={close}
      />
      <div className={main}>
        {items.map(({ label, url }) => (
          <Link href={url ?? ""} passHref>
            <a className={`${item_style} ${router.pathname == url && active}`}>
              {label}
            </a>
          </Link>
        ))}
      </div>
      <div className={sub}>
        {items_out.map(({ label, url, image }) => (
          <Link href={url ?? ""} passHref>
            <a target={"_blank"}>
              {image ? <img src={image} alt={label} /> : label}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
