import type { FC } from "react";

import { HeaderPage } from "../common/HeaderPage";
import Typography from "@mui/material/Typography";

export const Dashboard: FC = () => {
  return (
    <>
      <HeaderPage title="dashboard" breadcrumbData={[]} justHelmet />
      <Typography variant="h4">Dashboard</Typography>
    </>
  );
};
