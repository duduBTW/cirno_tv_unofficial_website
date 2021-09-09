import React, { ReactElement, useMemo } from "react";
import styles from "./TwitterCard.module.scss";
import { format } from "timeago.js";
import { Props } from "./TwitterCard";

export function HeaderTwitter({ tweet }: Props): ReactElement {
  const { header, cirno_television, pfp, separator, date } = styles;
  const created_at = useMemo(() => format(tweet.created_at, "en_US"), [tweet]);

  return (
    <div className={header}>
      <img className={pfp} src="/pfp.png" alt="" />
      <div className={cirno_television}>CirnoTV</div>
      <div className={separator}></div>
      <div className={date}>{created_at}</div>
    </div>
  );
}
