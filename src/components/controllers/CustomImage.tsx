import {
  Box,
  Grid,
  Avatar,
  Skeleton,
  type Theme,
  type SxProps,
  type BoxProps,
  type AvatarTypeMap,
} from "@mui/material";
import { assign, isString } from "lodash";
import {
  memo,
  useRef,
  useCallback,
  type ReactNode,
  type SyntheticEvent,
  type ReactEventHandler,
} from "react";
import type { OverrideProps } from "@mui/material/OverridableComponent";

import {
  FONT_SMALL_TEXT,
  FONT_WEIGHT_BLOD,
} from "../../helpers/constants/fonts";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../helpers/constants/colors";

import emptyImage from "../../assets/images/empty-image.webp";
import emptyImageUser from "../../assets/images/empty-image-user.webp";

type ICustomImages = Omit<
  OverrideProps<AvatarTypeMap<object, "div">, React.ElementType>,
  "src"
> & {
  hasBorder?: boolean;
  defaultImage?: string;
  src?: ReactNode | string;
  variant?: "circular" | "rounded" | "square" | undefined;
  onLoad?: ReactEventHandler<HTMLDivElement> | undefined;
  sx?: SxProps<Theme>;
};
interface ICustomImageBox extends BoxProps {
  sx?: SxProps<Theme>;
  onClick?: (e: TAny) => void;
  src?: string;
  alt?: string;
  hasBorder?: boolean;
  withOutPreview?: boolean;
  variant?: "circular" | "rounded" | "square" | undefined;
}

export const CustomImageBox = memo<ICustomImageBox>(
  ({
    sx,
    alt,
    onClick,
    variant,
    hasBorder,
    className,
    withOutPreview,
    ...props
  }) => {
    const ref = useRef(null);

    const handleImageLoad = useCallback(() => {
      if (ref.current) (ref.current as TAny).classList.add("non-opacity");
    }, []);

    return (
      <Box
        className="wrapper-custom-image-box"
        sx={{ position: "relative", height: "100%", width: "100%" }}
      >
        <Box
          alt={alt}
          component="img"
          {...{
            ...props,
            sx: assign(customImageBoxSX(hasBorder || false, variant), sx ?? {}),
          }}
          onClick={(e: SyntheticEvent<HTMLImageElement, Event>) => {
            const srcImage = (e.target as unknown as { src: string }).src;
            onClick && onClick(e);
            if (!srcImage.includes("assets") && !withOutPreview)
              window.open(srcImage, "__blank");
          }}
          onLoad={handleImageLoad}
          onError={(e: SyntheticEvent<HTMLImageElement, Event>) => (
            (e.currentTarget.src = emptyImage), handleImageLoad()
          )}
          className={"image-box " + className}
        />
        <Box
          component="div"
          className={"skeleton-custom-image " + className}
          sx={customImageBoxSX(hasBorder || false, variant)}
          ref={ref}
        >
          <Skeleton
            variant={variant == "circular" ? "circular" : "rounded"}
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
    );
  }
);

export const CustomAvatar = ({
  src,
  onLoad,
  className,
  hasBorder,
  defaultImage,
  ...props
}: ICustomImages) => {
  const { variant } = props;
  return (
    <Grid sx={customAvatarSX(hasBorder, src)} className="image-avatar">
      {isString(src) ? (
        <Avatar
          variant={variant}
          onLoad={onLoad}
          {...{
            ...props,
            className: className + " custom-avatar",
          }}
          src={src}
        >
          <Box
            className="default-image-avatar"
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              cursor: "default",
            }}
            src={defaultImage ?? emptyImageUser}
          />
        </Avatar>
      ) : (
        <CustomIcon src={src} />
      )}
    </Grid>
  );
};

interface ICustomIcon extends BoxProps {
  src?: ReactNode | string;
}

export const CustomIcon = ({ src, ...props }: ICustomIcon) => {
  return (
    <>
      {isString(src) ? (
        <Box
          className="custom-icon-input custom-icon-svg-string"
          component="img"
          src={src}
          {...{
            ...props,
          }}
        />
      ) : (
        <Box
          className="custom-icon-input custom-icon"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          {...{
            ...props,
          }}
        >
          {src}
        </Box>
      )}
    </>
  );
};

const customAvatarSX = (
  hasBorder?: boolean,
  src?: string | ReactNode
): SxProps<Theme> => ({
  "& .custom-avatar": {
    background: "unset !important", //!
    border: hasBorder ? `4px solid #EBF2FF` : "unset",
  },
  "& .profile-avatar": {
    cursor: "pointer !important",
  },
  "& .profile-box": {
    display: "flex",
    cursor: "pointer",
    color: COLOR_WHITE,
    alignItems: "center",
    justifyContent: "center",
    background: COLOR_PRIMARY,
    borderRadius: "50%",
  },
  "& .custom-icon": {
    borderRadius: "50%",
    background: "unset !important",
    border: hasBorder && !isString(src) ? `4px solid $EBF2FF` : "unset",
  },
  "& .username-text": {
    fontWeight: FONT_WEIGHT_BLOD,
    fontSize: FONT_SMALL_TEXT,
  },
});

const customImageBoxSX = (
  hasBorder: ICustomImageBox["hasBorder"],
  variant: ICustomImageBox["variant"]
): SxProps<Theme> => ({
  "&.image-box.non-opacity,&.skeleton-custom-image.non-opacity": {
    opacity: "0 !important",
  },
  "&.image-box,&.skeleton-custom-image": {
    opacity: 1,
    transition: "0.2s all ",
    border: hasBorder ? `4px solid #EBF2FF` : "unset",
    borderRadius:
      variant == "circular" ? "50%" : variant == "rounded" ? "8px" : undefined,
  },
  "&.skeleton-custom-image": {
    top: 0,
    left: 0,
    position: "absolute",
  },
  "&.image-box": {
    zIndex: 11,
    position: "relative !important",
  },
});
