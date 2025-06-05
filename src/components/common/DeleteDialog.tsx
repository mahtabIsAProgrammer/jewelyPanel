import { memo } from "react";
import { CustomDialog } from "../controllers/CustomDialog";
import { Grid, Typography } from "@mui/material";
import { CustomButton } from "../controllers/CustomButton";
import { SPACE_MD } from "../../helpers/constants/spaces";

interface IDeleteDialog {
  title: string;
  open: boolean;
  onClose: TEmptyFunctionVoid;
  onSubmit: TEmptyFunctionVoid;
}

export const DeleteDialog = memo<IDeleteDialog>(
  ({ title, open, onClose, onSubmit }) => {
    return (
      <CustomDialog
        title={title}
        dialogContent={
          <Typography>Are you sure to Delete this Item?</Typography>
        }
        onClose={onClose}
        open={open}
        dialogAction={
          <Grid sx={{ display: "flex", gap: SPACE_MD }}>
            <CustomButton text={"Cancel"} onClick={onClose} />
            <CustomButton text={"Submit"} onClick={onSubmit} />
          </Grid>
        }
      />
    );
  }
);
