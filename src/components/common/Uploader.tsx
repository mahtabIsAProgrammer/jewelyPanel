import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";
import { useEffect, useRef, useState, type FC } from "react";
import { CustomLabel } from "../controllers/CustomLabel";
import { cameraIcon, deleteIcon } from "../others/SvgComponents";
import { ErrorMessage } from "../controllers/CustomTextfield";
import { SPACE_LG } from "../../helpers/constants/spaces";
import { COLOR_RED, COLOR_WHITE } from "../../helpers/constants/colors";
import { CustomAvatar, CustomImageBox } from "../controllers/CustomImage";

export interface IUploader {
  customLabel: string;
  required?: boolean;
  errorMessage?: IErrorMessage;
  onChange?: (file: File | null) => void;
  value?: File | null;
  type: "file" | "profile";
}

export const Uploader: FC<IUploader> = ({
  customLabel,
  required,
  errorMessage,
  onChange,
  value,
  type,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (
      value &&
      typeof value === "object" &&
      "type" in value &&
      "size" in value
    ) {
      const url = URL.createObjectURL(value);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreview("");
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    onChange?.(file || null);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
  };

  return (
    <Grid sx={UploaderSX(type)}>
      <CustomLabel customLabel={customLabel} required={required} />
      <Grid className="uploader-container">
        <Box
          className="image-container"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <Box component="div" onClick={handleReset} className="reset-button">
              {deleteIcon(COLOR_WHITE)}
            </Box>
          ) : (
            ""
          )}
          {type == "file" ? (
            <CustomImageBox className="image" src={preview} />
          ) : type == "profile" ? (
            <CustomAvatar src={preview} alt="Profile" className="image" />
          ) : (
            ""
          )}

          <Box className="hover-overlay">{cameraIcon()}</Box>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          {preview ? "Image Uploaded!" : "Please upload your image"}
        </Typography>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={handleFileChange}
        />
      </Grid>
      {errorMessage && (
        <ErrorMessage
          text={errorMessage?.text || ""}
          type={errorMessage?.type || "error"}
          disabled={false}
        />
      )}
    </Grid>
  );
};

const UploaderSX = (type: IUploader["type"]): SxProps<Theme> => ({
  minWidth: "300px",
  display: "flex",
  height: "fit-content",
  flexDirection: "column",
  "& .uploader-container": {
    display: "flex",
    height: "fit-content",
    flexDirection: "column",
    rowGap: SPACE_LG,
    padding: SPACE_LG,
    borderRadius: "12px",
    border: "1px solid #c4c4c4",
    alignItems: "center",
    "& .image-container": {
      position: "relative",
      width: 120,
      height: 120,
      borderRadius: "50%",
      // overflow: "hidden",
      cursor: "pointer",
      "&:hover .hover-overlay": {
        opacity: 1,
      },
      "& .reset-button": {
        width: "30px",
        height: "30px",
        backgroundColor: COLOR_RED,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 1111,
        top: "2px",
        left: "4px",
      },
      "& .image": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
      "& .hover-overlay": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: type == "profile" ? "50%" : "",
        bgcolor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0,
        transition: "opacity 0.3s ease",
      },
    },
  },
});
