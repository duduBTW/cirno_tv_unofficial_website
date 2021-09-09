import RulesTemplate from "components/templates/RulesTemplate";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const Rules: NextPage = () => {
  return (
    <>
      <NextSeo title="CirnoTV: Rules" description="Rules" />
      <RulesTemplate />
    </>
  );
};

export default Rules;
