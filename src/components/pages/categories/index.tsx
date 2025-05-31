import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useCategoriesSearch } from "../../../services/hooks/categories";

const List: FC = () => {
  const { data: categoriesSearch, isLoading } = useCategoriesSearch();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[{ id: "name", label: "name" }]}
      data={categoriesSearch}
      title={"categories"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "categories", link: "", type: "list" },
      ]}
      insertButton="Add Category"
    />
  );
};

export default List;
