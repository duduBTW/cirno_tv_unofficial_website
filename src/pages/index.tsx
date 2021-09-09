import HomeTemplate from "../components/templates/Home";

import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo title="CirnoTV" description="Home" />
      <HomeTemplate />
    </>
  );
};

export default Home;
