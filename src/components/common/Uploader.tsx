import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";

import {
  COLOR_BORDER,
  COLOR_RED,
  COLOR_WHITE,
} from "../../helpers/constants/colors";
import { CustomLabel } from "../controllers/CustomLabel";
import { API_URL } from "../../helpers/constants/static";
import { errorAlert } from "../../helpers/utils/messege";
import { SPACE_LG } from "../../helpers/constants/spaces";
import { handleImageUrl } from "../../helpers/utils/handlers";
import { ErrorMessage } from "../controllers/CustomTextfield";
import { cameraIcon, deleteIcon } from "../others/SvgComponents";
import { CustomAvatar, CustomImageBox } from "../controllers/CustomImage";

export interface IUploader {
  customLabel: string;
  required?: boolean;
  errorMessage?: IErrorMessage;
  onChange?: (file: File | null) => void;
  value?: File | null;
  type: "file" | "profile";
  model: "users" | "blogs" | "products" | "categories";
}

export const Uploader = memo<IUploader>(
  ({ customLabel, required, errorMessage, onChange, value, type }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
      if (value instanceof File || (value as TAny) instanceof Blob) {
        const objectUrl = URL.createObjectURL(value as TAny);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
      }

      if (typeof value === "string") {
        setPreview(handleImageUrl(value));
      }
    }, [value]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);

      const formData = new FormData();
      formData.append("imageUrl", file);

      try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const uploadedUrl = response.data.imageUrl;
        onChange?.(uploadedUrl);
      } catch (error) {
        console.error("Image upload failed", error);
        errorAlert({ title: "Upload failed 😢. Please try again." });
        onChange?.(null);
      }
    };
    const handleReset = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setPreview("");
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
              <Box
                component="div"
                onClick={handleReset}
                className="reset-button"
              >
                {deleteIcon(COLOR_WHITE)}
              </Box>
            ) : (
              ""
            )}
            {type == "file" ? (
              <CustomImageBox className="image" src={preview} />
            ) : (
              <CustomAvatar src={preview} alt="Profile" className="image" />
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
  }
);

const UploaderSX = (type: IUploader["type"]): SxProps<Theme> => ({
  minWidth: "300px",
  display: "flex",
  height: "fit-content",
  flexDirection: "column",
  "& .uploader-container": {
    display: "flex",
    minHeight: "262px",
    height: "fit-content",
    flexDirection: "column",
    rowGap: SPACE_LG,
    padding: SPACE_LG,
    borderRadius: "12px",
    border: "1px solid" + COLOR_BORDER,
    alignItems: "center",
    "& .image-container": {
      position: "relative",
      width: 120,
      height: 120,
      borderRadius: "50%",
      "& .image-avatar": {
        width: "120px",
        height: "120px",
      },
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
        borderRadius: type == "profile" ? "50%" : "8px",
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
