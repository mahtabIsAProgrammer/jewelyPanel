import { type FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useUserSearch } from "../../../services/hooks/users";
import { CustomImageBox } from "../../controllers/CustomImage";
import { Box, Grid } from "@mui/material";
import { editIcon } from "../../others/SvgComponents";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { COLOR_SECEONDRY } from "../../../helpers/constants/colors";
import { useNavigate } from "react-router-dom";

const List: FC = () => {
  const navigate = useNavigate();
  // const [open, setOpen] = useState<boolean>(false);
  const { data: userSearch, isLoading } = useUserSearch();

  // const { mutate: deleteUser } = useDeleteUser();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        {
          id: "imageUrl",
          label: "image",
          align: "center",
          ComponentRow: () => {
            return (
              <CustomImageBox
                sx={{ width: "60px", height: "60px" }}
                src={"photo_2025-05-27_16-25-57.jpg"}
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
