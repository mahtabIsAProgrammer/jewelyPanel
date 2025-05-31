import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useBlogSearch } from "../../../services/hooks/blogs";

const List: FC = () => {
  const { data: blogSearch, isLoading } = useBlogSearch();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        { id: "thumbnail", label: "image" },
        { id: "title", label: "title" },
        { id: "authorName", label: "authorName" },
      ]}
      data={blogSearch}
      title={"blogs"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "blogs", link: "", type: "list" },
      ]}
      insertButton="Add Blog"
    />
  );
};

export default List;
