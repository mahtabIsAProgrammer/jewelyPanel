import {
  type FC,
  useMemo,
  useState,
  useCallback,
  type ProviderProps,
} from "react";

import { MainContext } from "../../helpers/others/mainContext";
import { DEFAULT_SIDE_BAR_SIZE } from "../../helpers/constants/static";

export const MainContextProvider: FC<IMainContextProvider> = ({ children }) => {
  const [theme, setTheme] = useState<TTheme>("light");

  const [sidebarSize, setSidebarSize] = useState<TSidebarSize>(
    DEFAULT_SIDE_BAR_SIZE
  );

  const changeSidebarSize = useCallback((sidebarSize: TSidebarSize) => {
    setSidebarSize(sidebarSize);
  }, []);

  const toggleTheme = () => {
    setTheme((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const changeTheme = (theme: TTheme) => {
    setTheme(theme);
  };

  const value: ProviderProps<IMainContext>["value"] = useMemo(
    () => ({
      theme,
      toggleTheme,
      changeTheme,
      sidebarSize,
      changeSidebarSize,
    }),
    [changeSidebarSize, sidebarSize, theme]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
