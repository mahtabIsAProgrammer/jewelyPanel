import { Box, Grid, Typography, type SxProps, type Theme } from "@mui/material";
import { useRef, useState, type FC } from "react";
import { CustomLabel } from "../controllers/CustomLabel";
import { cameraIcon } from "../others/SvgComponents";
import { ErrorMessage } from "../controllers/CustomTextfield";

export interface IProfileUploader {
  customLabel: string;
  required?: boolean;
  errorMessage?: IErrorMessage;
}

export const ProfileUploader: FC<IProfileUploader> = ({
  customLabel,
  required,
  errorMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <Grid sx={profileUploaderSX}>
      <CustomLabel customLabel={customLabel} required={required} />
      <Grid className="uploader-container">
        <Box
          className="image-container"
          onClick={() => fileInputRef.current?.click()}
        >
          <Box
            component="img"
            src={
              imageUrl ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png" // No profile image
            }
            alt="Profile"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <Box
            className="hover-overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.4)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {cameraIcon()}
          </Box>
        </Box>

        <Typography variant="body2" color="text.secondary" textAlign="center">
          Please upload your image
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

const profileUploaderSX: SxProps<Theme> = {
  width: "300px",
  p: 2,
  borderRadius: 3,
  border: "1px solid #ccc",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  boxShadow: 1,
  backgroundColor: "#fff",
  "& .uploader-container": {
    "& .image-container": {
      position: "relative",
      width: 120,
      height: 120,
      borderRadius: "50%",
      overflow: "hidden",
      cursor: "pointer",
      "&:hover .hover-overlay": {
        opacity: 1,
      },
    },
  },
};
