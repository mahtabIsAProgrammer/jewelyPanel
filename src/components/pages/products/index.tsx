import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useProductSearch } from "../../../services/hooks/products";
const List: FC = () => {
  const { data: productSearch, isLoading } = useProductSearch();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        { id: "image", label: "image" },
        { id: "name", label: "name" },
        { id: "price", label: "price" },
        { id: "brand", label: "brand" },
      ]}
      data={productSearch}
      title={"products"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "products", link: "", type: "list" },
      ]}
      insertButton="Add Product"
    />
  );
};

export default List;
