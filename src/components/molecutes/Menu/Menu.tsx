import { useMenu } from "components/elements/Wrapper/Wrapper";
import PopUpMenu from "components/organisms/PopUpMenu";
import React, { ReactElement, useState } from "react";
import styles from "./Menu.module.scss";

export interface MenuItem {
  label: string;
  icon: string;
  url?: string;
}

interface Props {
  content: MenuItem[];
}

export default function Menu({ content }: Props): ReactElement {
  const [open, setOpen] = useState<{
    [z: number]: boolean;
  }>({});

  return (
    <div className={styles.menu}>
      {content.map((menuItem, index) => (
        <div
          onClick={() =>
            menuItem.url
              ? window.open(menuItem.url)
              : setOpen((o) => ({ ...o, [index]: !o[index] }))
          }
          key={menuItem.label}
        >
          <MenuItem
            onClose={() => setOpen((o) => ({ ...o, [index]: false }))}
            open={Boolean(open[index])}
            showPopUp={!menuItem.url}
            {...menuItem}
          />
        </div>
      ))}
    </div>
  );
}

type MenuItemProp = MenuItem & {
  showPopUp: boolean;
  open: boolean;
  onClose: () => void;
};

export function MenuItem({
  label,
  icon,
  showPopUp,
  open,
  onClose,
}: MenuItemProp) {
  return (
    <div className={styles.menu_item}>
      {showPopUp && <PopUpMenu open={open} onClose={onClose} />}
      <div className={styles.label}>{label}</div>

      <img className={styles.icon} src={icon} alt={`${label} icon`} />
    </div>
  );
}
