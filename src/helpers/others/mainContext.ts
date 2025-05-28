import { createContext } from "react";

import { APP_DEFAULT_THEME, DEFAULT_SIDE_BAR_SIZE } from "../constants/static";

export const MainContext = createContext<IMainContext>({
  theme: APP_DEFAULT_THEME,
  sidebarSize: DEFAULT_SIDE_BAR_SIZE,
  changeTheme: () => undefined,
  toggleTheme: () => undefined,
  changeSidebarSize: () => undefined,
});
