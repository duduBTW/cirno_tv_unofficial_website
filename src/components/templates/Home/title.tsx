import React from "react";
import styles from "./Home.module.scss";
import { motion, Variants } from "framer-motion";

const titleVars: Variants = {
  initial: {},
  animate: {},
  hover: {},
};

const cirnoVars: Variants = {
  initial: { x: "-100%" },
  animate: { x: "0%" },
};

const tvVars: Variants = {
  initial: { y: 100 },
  animate: { y: 0 },
  hover: {},
};

const vVars: Variants = {
  hover: { x: 108 },
};

const restVars: Variants = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 0, y: -100 },
  hover: { opacity: 1, y: 0 },
};

export function Title() {
  const { title, main, tv, rest } = styles;

  return (
    <motion.h1
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={titleVars}
      className={title}
    >
      <motion.div
        className={main}
        variants={cirnoVars}
        transition={{ duration: 0.2, type: "tween", delay: 0.35 }}
      >
        Cirno{" "}
      </motion.div>
      <motion.div
        transition={{ duration: 0.2, type: "tween", delay: 0.35 }}
        variants={tvVars}
        className={tv}
      >
        <motion.div style={{ pointerEvents: "none" }}>T</motion.div>
        <motion.div style={{ pointerEvents: "none" }} variants={vVars}>
          V
        </motion.div>
        <motion.div
          transition={{ duration: 0.2, type: "tween" }}
          className={rest}
          variants={restVars}
        >
          {" "}
          <span>ele</span> <span style={{ marginLeft: 30 }}>ision</span>
        </motion.div>
      </motion.div>
    </motion.h1>
  );
}
