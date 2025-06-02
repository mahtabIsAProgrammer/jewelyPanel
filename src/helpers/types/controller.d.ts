interface ICustomBreadcrumbsItems {
  name: TKeyTranslate;
  link: string;
  clickHandler?: (link: string) => void;
}

interface IOption {
  label: string;
  value: number | string;
}

interface IErrorMessage {
  text: string;
  type: "error" | "warning";
  disabled?: boolean;
}
