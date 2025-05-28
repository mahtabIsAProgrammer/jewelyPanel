interface IMainContext {
  theme: TTheme;
  sidebarSize: TSidebarSize;
  toggleTheme: TEmptyFunctionVoid;
  changeSidebarSize: (sidebarSize: TSidebarSize) => void;
  changeTheme: (theme: TTheme) => void;
}

interface IMainContextProvider {
  children: JSX.Element;
}
