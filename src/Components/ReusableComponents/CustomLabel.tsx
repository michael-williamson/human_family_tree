import { Box } from "@mui/material";

interface CustomLabelType {
  labelText: string;
  labelStyle?: object;
  // eslint-disable-next-line no-empty-pattern
  labelCreator?({}: object): string;
  addOn?: string | object;
}

export const CustomLabel = ({
  labelText,

  labelStyle = {},
  labelCreator = (props: object) => "label",
  addOn,
}: CustomLabelType) => {
  console.log("custom label rendered with:", labelText);
  return <Box sx={labelStyle}>{labelText}</Box>;
};
