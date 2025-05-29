import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
const index: FC = () => {
  return (
    <PageProvider
      isLoading={false}
      buttonLink="add"
      headerCells={[]}
      data={[]}
      title={"products"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "products", link: "", type: "list" },
      ]}
      insertButton="Add Product"
    />
  );
};

export default index;
