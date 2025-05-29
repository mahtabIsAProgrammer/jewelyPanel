import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
const index: FC = () => {
  return (
    <PageProvider
      isLoading={false}
      buttonLink="add"
      headerCells={[]}
      data={[]}
      title={"Faq"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "Faq", link: "", type: "list" },
      ]}
      insertButton="Add Faq"
    />
  );
};

export default index;
