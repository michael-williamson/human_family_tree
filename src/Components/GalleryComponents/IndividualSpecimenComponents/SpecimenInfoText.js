import React from "react";
import { TextComponent } from "../../ReusableComponents/TextComponent";

export const SpecimenInfoText = ({ text = "info", styles = {} }) => {
  return <TextComponent styles={styles}>{text}</TextComponent>;
};
