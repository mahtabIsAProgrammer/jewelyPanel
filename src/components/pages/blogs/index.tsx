import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";

const index: FC = () => {
  return (
    <PageProvider
      isLoading={false}
      buttonLink="add"
      headerCells={[]}
      data={[]}
      title={"blogs"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "blogs", link: "", type: "list" },
      ]}
      insertButton="Add Blog"
    />
  );
};

export default index;
