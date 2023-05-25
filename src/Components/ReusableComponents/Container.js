import { Box } from "@mui/material";

export const Container = ({ containerStyles, children }) => {
  return <Box sx={containerStyles}>{children}</Box>;
};
