import { useState, type FC } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  useDeleteProduct,
  useProductSearch,
} from "../../../services/hooks/products";
import { DeleteDialog } from "../../common/DeleteDialog";
import { PageProvider } from "../../advance/PageProvider";
import { successAlert } from "../../../helpers/utils/messege";
import { CustomImageBox } from "../../controllers/CustomImage";
import { handleImageUrl } from "../../../helpers/utils/handlers";
import { deleteIcon, editIcon } from "../../others/SvgComponents";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { COLOR_RED, COLOR_SECEONDRY } from "../../../helpers/constants/colors";

const List: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const { data: productSearch, isLoading } = useProductSearch();

  const { mutate: deleteProduct } = useDeleteProduct();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
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
        { id: "price", label: "price" },
        { id: "brand", label: "brand" },
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
                    deleteProduct(row.id);
                    setOpen(false);
                    successAlert({ title: "Successfully Deleted!" });
                  }}
                />
              </>
            );
          },
        },
      ]}
      data={productSearch}
      title={"products"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "products", link: "", type: "list" },
      ]}
      insertButton="Add Product"
    />
  );
};

export default List;
