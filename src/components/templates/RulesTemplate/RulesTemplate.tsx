import { rulesMenu } from "components/contants/menuLists";
import GeneralTemplate from "components/organisms/GeneralTemplate";
import React, { ReactElement } from "react";

import styles from "./RulesTemplate.module.scss";

export default function RulesTemplate(): ReactElement {
  const { rules_container } = styles;

  return (
    <GeneralTemplate label="Rules" menuContent={rulesMenu}>
      <div className={rules_container}>
        <h3>
          This goes without saying but PLEASE respect not only the Mods but the
          other users of the chat also! Everyone is super nice if you are!
        </h3>
        <h3>No copypastas</h3>
        <h3>No calling the moderators Nazis</h3>
        <h3>No excessive Capslock</h3>
        <h3>English in chat please</h3>
        <h3>
          Use common sense when linking stuff (no porn, excessivly lewd or gory
          pictures)
        </h3>
        <h3>and PLEASE don't roleplay in the chat. it's creepy yo</h3>
      </div>
    </GeneralTemplate>
  );
}
