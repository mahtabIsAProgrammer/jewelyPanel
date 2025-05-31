import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useFaqSearch } from "../../../services/hooks/faq";
const List: FC = () => {
  const { data: faqSearch, isLoading } = useFaqSearch();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        { id: "title", label: "title" },
        { id: "description", label: "description" },
      ]}
      data={faqSearch}
      title={"Faq"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "Faq", link: "", type: "list" },
      ]}
      insertButton="Add Faq"
    />
  );
};

export default List;
