import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";

const index: FC = () => {
  return (
    <PageProvider
      isLoading={false}
      buttonLink="add"
      headerCells={[]}
      data={[]}
      title={"categories"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "categories", link: "", type: "list" },
      ]}
      insertButton="Add Category"
    />
  );
};

export default index;
