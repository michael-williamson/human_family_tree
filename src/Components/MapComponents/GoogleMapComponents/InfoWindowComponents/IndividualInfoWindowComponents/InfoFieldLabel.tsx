import { Box } from "@mui/system";
import { ReactChildrenProp } from "../../../../../Types/GlobalTypes";

interface InfoFieldLabelType extends ReactChildrenProp {
  styles: any;
}

export const InfoFieldLabel = ({ styles, children }: InfoFieldLabelType) => {
  return <Box sx={styles}>{children}</Box>;
};
