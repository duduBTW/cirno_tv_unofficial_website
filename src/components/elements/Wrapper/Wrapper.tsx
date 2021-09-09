import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import styles from "./Wrapper.module.scss";

interface Props {
  children: ReactElement;
}

const WrapperContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | null
>(null);
export const useMenu = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const state = useContext(WrapperContext);

  if (!state) {
    throw new Error(
      "The component should be inside or wrappe by the SortSeriesContext"
    );
  }

  return state;
};
export default function Wrapper({ children }: Props): ReactElement {
  const openProps = useState(false);

  return (
    <WrapperContext.Provider value={openProps}>
      <div className={styles.container_o}>
        <div className={styles.container_i}>
          {/* {openProps[0] && <MenuSelect />} */}
          {children}
        </div>
      </div>
    </WrapperContext.Provider>
  );
}
