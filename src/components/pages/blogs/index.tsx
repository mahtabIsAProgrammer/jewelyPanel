import { useState, type FC } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { DeleteDialog } from "../../common/DeleteDialog";
import { PageProvider } from "../../advance/PageProvider";
import { useUserSearch } from "../../../services/hooks/users";
import { successAlert } from "../../../helpers/utils/messege";
import { CustomImageBox } from "../../controllers/CustomImage";
import { handleImageUrl } from "../../../helpers/utils/handlers";
import { editIcon, deleteIcon } from "../../others/SvgComponents";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { useBlogSearch, useDeleteBlog } from "../../../services/hooks/blogs";
import { COLOR_SECEONDRY, COLOR_RED } from "../../../helpers/constants/colors";

const List: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const { data: blogSearch, isLoading } = useBlogSearch({ search });

  const { mutate: blogDelete } = useDeleteBlog();

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
                sx={{ width: "60px", height: "60px" }}
                src={handleImageUrl(row?.imageUrl)}
              />
            );
          },
        },
        { id: "title", label: "title" },
        {
          id: "authorId",
          label: "author",
          ComponentRow: ({ row }: TAny) => {
            const { data: userSearch } = useUserSearch();

            const { firstName, lastName } =
              userSearch?.find((item: TAny) => item?.id == row?.authorId) ?? {};

            return firstName + " " + lastName;
          },
        },
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
                  onSubmit={() => {
                    blogDelete(row.id);
                    setOpen(false);
                    successAlert({ title: "Successfully Deleted!" });
                  }}
                />
              </>
            );
          },
        },
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
