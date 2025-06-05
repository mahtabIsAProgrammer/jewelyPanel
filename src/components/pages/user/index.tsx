import { useState, type FC } from "react";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { editIcon } from "../../others/SvgComponents";
import { PageProvider } from "../../advance/PageProvider";
import { useUserSearch } from "../../../services/hooks/users";
import { CustomImageBox } from "../../controllers/CustomImage";
import { handleImageUrl } from "../../../helpers/utils/handlers";
import { COLOR_SECEONDRY } from "../../../helpers/constants/colors";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";

const List: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  // const [open, setOpen] = useState<boolean>(false);
  const { data: userSearch, isLoading } = useUserSearch({ search });

  // const { mutate: deleteUser } = useDeleteUser();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      onSearch={setSearch}
      headerCells={[
        {
          id: "imageUrl",
          label: "image",
          align: "center",
          ComponentRow: ({ row }: TAny) => {
            return (
              <CustomImageBox
                sx={{ width: "60px", height: "60px", objectFit: "cover" }}
                src={handleImageUrl(row.imageUrl, true)}
              />
            );
          },
        },
        { id: "firstName", label: "first Name" },
        { id: "lastName", label: "last Name" },
        { id: "email", label: "Email" },
        {
          id: "id",
          label: "actions",
          ComponentRow: ({ row }: TAny) => {
            return (
              <>
                <Grid sx={ACTIONS_TABLE_STYLE}>
                  <Box
                    component="div"
                    className="btn"
                    onClick={() => navigate(`edit/${row.id}`)}
                  >
                    {editIcon(COLOR_SECEONDRY)}
                  </Box>
                  {/* <Box
                    component="div"
                    className="btn"
                    onClick={() => setOpen(true)}
                  >
                    {deleteIcon(COLOR_RED)}
                  </Box> */}
                </Grid>
                {/* <DeleteDialog
                  title={"Delete User"}
                  open={open}
                  onClose={() => setOpen(false)}
                  onSubmit={() => {
                    deleteUser(row.id);
                    setOpen(false);
                    successAlert({ title: "Successfully Deleted!" });
                  }}
                /> */}
              </>
            );
          },
        },
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
