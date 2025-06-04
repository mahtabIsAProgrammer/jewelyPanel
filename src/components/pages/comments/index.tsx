import { useState, type FC } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { PageProvider } from "../../advance/PageProvider";
import {
  useCommentSearch,
  useDeleteComment,
} from "../../../services/hooks/comments";
import { DeleteDialog } from "../../common/DeleteDialog";
import { successAlert } from "../../../helpers/utils/messege";
import { editIcon, deleteIcon } from "../../others/SvgComponents";
import { ACTIONS_TABLE_STYLE } from "../../../helpers/constants/material";
import { COLOR_SECEONDRY, COLOR_RED } from "../../../helpers/constants/colors";

const List: FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const { data: commentsSearch, isLoading } = useCommentSearch();

  const { mutate: deleteComment } = useDeleteComment();

  return (
    <PageProvider
      isLoading={isLoading}
      buttonLink="add"
      headerCells={[
        { id: "title", label: "title" },
        { id: "userId", label: "userId" },
        { id: "comment", label: "comment" },
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
                    deleteComment(row.id);
                    setOpen(false);
                    successAlert({ title: "Successfully Deleted!" });
                  }}
                />
              </>
            );
          },
        },
      ]}
      data={commentsSearch}
      title={"comments"}
      breadcrumbs={[
        { name: "dashboard", link: "/", type: "none" },
        { name: "comments", link: "", type: "list" },
      ]}
      insertButton="Add Comments"
    />
  );
};

export default List;
