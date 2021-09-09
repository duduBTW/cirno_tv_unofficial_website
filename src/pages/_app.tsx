import "../components/global/_globals.scss";

import type { AppProps } from "next/app";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.8, x: 150, rotateX: "90deg" }}
          animate={{
            scale: 1,
            x: 0,
            rotateX: "0deg",
            opacity: 1,
          }}
          transition={{ type: "tween", duration: 0.5, ease: "backInOut" }}
          key={pathname}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <BlueIndicator />
    </>
  );
}

const BlueIndicator = () => {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: "20%",
        background: "#FAFFFF",
        zIndex: -2,
      }}
    />
  );
};

export default MyApp;
