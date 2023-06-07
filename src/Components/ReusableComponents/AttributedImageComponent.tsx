import { CardMedia } from "@mui/material";
import { ImageAttributionComponent } from "./ImageAttributionComponent";

interface AttributedImageComponentTypes {
  src: any;
  author: string;
  license: string;
  imageStyles: any;
  labelStyles: any;
  linkStyles: any;
}

export const AttributedImageComponent = ({
  src,
  author,
  license,
  imageStyles,
  labelStyles,
  linkStyles,
}: AttributedImageComponentTypes) => {
  return (
    <>
      <CardMedia
        component="img"
        // some JSON files have larger / smaller images in separate indexes
        src={src}
        sx={imageStyles}
      />
      <ImageAttributionComponent
        author={author}
        license={license}
        labelStyles={labelStyles}
        linkStyles={linkStyles}
      />
    </>
  );
};
