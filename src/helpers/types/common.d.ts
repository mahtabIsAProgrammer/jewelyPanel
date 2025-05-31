interface ICustomTitle {
  title?: string;
  setting?: {
    color?: string;
    iconColor?: string;
  };
}
interface ICustomLabel {
  label: string;
  color?: string;
  required?: boolean;
  size?: TStandardSize;
}

type TBreadcrumbsType = "list" | "add" | "edit" | "view" | "detail" | "none";

interface IBreadcrumbsItems {
  name: string;
  link: string;
  localNavigate?: boolean;
  type: TBreadcrumbsType;
}

interface IHeaderCell<T = TAny> {
  id: keyof T;
  label: string;
  align?: "left" | "right" | "center";
  ComponentRow?: FC<{ row: T }>;
}
