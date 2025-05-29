import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
const index: FC = () => {
  return (
    <PageProvider
      isLoading={false}
      buttonLink="add"
      headerCells={[]}
      data={[]}
      title={"comments"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "comments", link: "", type: "list" },
      ]}
      insertButton="Add Comments"
    />
  );
};

export default index;
