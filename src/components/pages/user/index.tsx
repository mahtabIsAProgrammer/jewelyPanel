import { type FC } from "react";
import { PageProvider } from "../../advance/PageProvider";

const index: FC = () => {
  return (
    <PageProvider
      isLoading={false}
      buttonLink="add"
      headerCells={[
        { id: "imageUrl", label: "image" },
        { id: "firstName", label: "First Name" },
        { id: "lastName", label: "Last Name" },
        { id: "email", label: "Email" },
      ]}
      data={[
        {
          id: 1,
          firstName: "Alice",
          email: "alice@example.com",
          role: "Admin",
        },
        { id: 2, firstName: "Bob", email: "bob@example.com", role: "User" },
        {
          id: 3,
          firstName: "Charlie",
          email: "charlie@example.com",
          role: "Moderator",
        },
      ]}
      title={"Users"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "users", link: "", type: "list" },
      ]}
      insertButton="Add User"
    />
  );
};

export default index;
