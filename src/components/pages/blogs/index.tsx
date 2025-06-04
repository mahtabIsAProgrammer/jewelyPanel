import { useState, type FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import { useBlogSearch, useDeleteBlog } from "../../../services/hooks/blogs";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLOR_SECEONDRY, COLOR_RED } from "../../../helpers/constants/colors";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { successAlert } from "../../../helpers/utils/messege";
import { DeleteDialog } from "../../common/DeleteDialog";
import { editIcon, deleteIcon } from "../../others/SvgComponents";
import { CustomImageBox } from "../../controllers/CustomImage";

const List: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const { data: blogSearch, isLoading } = useBlogSearch();

  const { mutate: blogDelete } = useDeleteBlog();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        {
          id: "thumbnail",
          label: "image",
          ComponentRow: () => {
            return (
              <CustomImageBox
                sx={{ width: "60px", height: "60px" }}
                src={"photo_2025-05-27_16-25-57.jpg"}
              />
            );
          },
        },
        { id: "title", label: "title" },
        { id: "authorName", label: "authorName" },
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
