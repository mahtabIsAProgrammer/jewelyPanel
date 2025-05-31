import { type FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useUserSearch } from "../../../services/hooks/users";

const List: FC = () => {
  const { data: userSearch, isLoading } = useUserSearch();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        { id: "imageUrl", label: "image" },
        { id: "fullName", label: "Full Name" },
        { id: "email", label: "Email" },
        { id: "gender", label: "gender" },
      ]}
      data={userSearch}
      title={"Users"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "", type: "list" },
      ]}
      insertButton="Add User"
    />
  );
};

export default List;
