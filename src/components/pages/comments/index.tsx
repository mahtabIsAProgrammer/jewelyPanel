import type { FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useCommentSearch } from "../../../services/hooks/comments";
const List: FC = () => {
  const { data: commentsSearch, isLoading } = useCommentSearch();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        { id: "title", label: "title" },
        { id: "userId", label: "userId" },
        { id: "comment", label: "comment" },
      ]}
      data={commentsSearch}
      title={"comments"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "comments", link: "", type: "list" },
      ]}
      insertButton="Add Comments"
    />
  );
};

export default List;
