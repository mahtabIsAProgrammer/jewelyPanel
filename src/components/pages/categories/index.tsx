import { useState, type FC } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  useCategoriesSearch,
  useDeleteCategory,
} from "../../../services/hooks/categories";
import { DeleteDialog } from "../../common/DeleteDialog";
import { PageProvider } from "../../advance/PageProvider";
import { successAlert } from "../../../helpers/utils/messege";
import { CustomImageBox } from "../../controllers/CustomImage";
import { handleImageUrl } from "../../../helpers/utils/handlers";
import { editIcon, deleteIcon } from "../../others/SvgComponents";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { COLOR_SECEONDRY, COLOR_RED } from "../../../helpers/constants/colors";

const List: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");

  const { data: categorySearch, isLoading } = useCategoriesSearch({ search });

  const { mutate: deleteCategory } = useDeleteCategory();

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
