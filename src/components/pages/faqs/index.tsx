import { useState, type FC } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { DeleteDialog } from "../../common/DeleteDialog";
import { PageProvider } from "../../advance/PageProvider";
import { successAlert } from "../../../helpers/utils/messege";
import { editIcon, deleteIcon } from "../../others/SvgComponents";
import { useDeleteFaq, useFaqSearch } from "../../../services/hooks/faq";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { COLOR_SECEONDRY, COLOR_RED } from "../../../helpers/constants/colors";

const List: FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { data: faqSearch, isLoading } = useFaqSearch({ search });

  const { mutate: deleteFaq } = useDeleteFaq();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      onSearch={setSearch}
      headerCells={[
        { id: "title", label: "title" },
        { id: "description", label: "description" },
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
                    deleteFaq(row.id);
                    setOpen(false);
                    successAlert({ title: "Successfully Deleted!" });
                  }}
                />
              </>
            );
          },
        },
      ]}
      data={faqSearch}
      title={"Faq"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "Faq", link: "", type: "list" },
      ]}
      insertButton="Add Faq"
    />
  );
};

export default List;
