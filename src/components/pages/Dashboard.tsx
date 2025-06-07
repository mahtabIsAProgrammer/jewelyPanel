import type { FC } from "react";

import { HeaderPage } from "../common/HeaderPage";

export const Dashboard: FC = () => {
  return (
    <>
      <HeaderPage title="dashboard" breadcrumbData={[]} justHelmet />
      Dashboard
    </>
  );
};
