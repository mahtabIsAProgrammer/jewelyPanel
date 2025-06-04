import { useState, type FC } from "react";
import { PageProvider } from "../../advance/PageProvider";
import {
  useCategoriesSearch,
  useDeleteCategory,
} from "../../../services/hooks/categories";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { COLOR_SECEONDRY, COLOR_RED } from "../../../helpers/constants/colors";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { successAlert } from "../../../helpers/utils/messege";
import { DeleteDialog } from "../../common/DeleteDialog";
import { editIcon, deleteIcon } from "../../others/SvgComponents";

const List: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const { data: categorySearch, isLoading } = useCategoriesSearch();

  const { mutate: deleteCategory } = useDeleteCategory();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        { id: "name", label: "name" },
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
                  title={"Delete Category"}
                  open={open}
                  onClose={() => setOpen(false)}
                  onSubmit={() => {
                    deleteCategory(row.id);
                    setOpen(false);
                    successAlert({ title: "Successfully Deleted!" });
                  }}
                />
              </>
            );
          },
        },
      ]}
      data={categorySearch}
      title={"categories"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "categories", link: "", type: "list" },
      ]}
      insertButton="Add Category"
    />
  );
};

export default List;
