import Wrapper from "components/elements/Wrapper";
import Menu from "components/molecutes/Menu";
import { MenuItem } from "components/molecutes/Menu/Menu";
import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import styles from "./GeneralTemplate.module.scss";

interface Props {
  menuContent: MenuItem[];
  children: ReactElement;
  label: string;
}

export default function GeneralTemplate({
  children,
  menuContent,
  label,
}: Props): ReactElement {
  const { general_container, title, list, menu } = styles;

  return (
    <Wrapper>
      <div className={general_container}>
        <div className={title}>{label}</div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.32,
            type: "tween",
            ease: "anticipate",
          }}
          className={list}
        >
          {children}
        </motion.div>

        <div className={menu}>
          <Menu content={menuContent} />
        </div>
      </div>
    </Wrapper>
  );
}
