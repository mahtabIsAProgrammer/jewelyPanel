import type { FC } from "react";
import { CustomDialog } from "../controllers/CustomDialog";
import { Grid } from "@mui/material";
import { CustomButton } from "../controllers/CustomButton";

interface IDeleteDialog {
  title: string;
  open: boolean;
  onClose: TEmptyFunctionVoid;
  onSubmit: TEmptyFunctionVoid;
}

export const DeleteDialog: FC<IDeleteDialog> = ({
  title,
  open,
  onClose,
  onSubmit,
}) => {
  return (
    <CustomDialog
      title={title}
      dialogContent={<Grid>Are you sure to Delete this Item?</Grid>}
      onClose={onClose}
      open={open}
      dialogAction={
        <Grid>
          <CustomButton text={"Cancel"} onClick={onClose} />
          <CustomButton text={"Submit"} onClick={onSubmit} />
        </Grid>
      }
    />
  );
};
