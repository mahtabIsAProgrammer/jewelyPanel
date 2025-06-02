import { useState, type FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useDeleteUser, useUserSearch } from "../../../services/hooks/users";
import { CustomImageBox } from "../../controllers/CustomImage";
import { Box, Grid } from "@mui/material";
import { deleteIcon, editIcon } from "../../others/SvgComponents";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { COLOR_RED, COLOR_SECEONDRY } from "../../../helpers/constants/colors";
import { useNavigate } from "react-router-dom";
import { DeleteDialog } from "../../common/DeleteDialog";

const List: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { data: userSearch, isLoading } = useUserSearch();

  const { data: deleteUser } = useDeleteUser();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        {
          id: "imageUrl",
          label: "image",
          ComponentRow: ({ row: { imageUrl } }) => (
            <CustomImageBox src={imageUrl} />
          ),
        },
        { id: "fullName", label: "Full Name" },
        { id: "email", label: "Email" },
        { id: "gender", label: "gender" },
        {
          id: "id",
          label: "actions",
          ComponentRow: ({ row }) => (
            <>
              <Grid sx={ACTIONS_TABLE_STYLE}>
                <Box
                  component="div"
                  className="btn"
                  onClick={() => navigate(`edit/${row}`)}
                >
                  {editIcon(COLOR_SECEONDRY)}
                </Box>
                <Box
                  component="div"
                  className="btn"
                  onClick={() => setOpen(true)}
                >
                  {deleteIcon(COLOR_RED)}
                </Box>
              </Grid>
              <DeleteDialog
                title={"Delete User"}
                open={open}
                onClose={() => setOpen(false)}
                onSubmit={() => setOpen(false)}
              />
            </>
          ),
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
