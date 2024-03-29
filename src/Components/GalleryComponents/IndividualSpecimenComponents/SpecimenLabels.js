import React from "react";
import { TextComponent } from "../../ReusableComponents/TextComponent";

export const SpecimenLabels = (props) => {
  const { label = "label", styles = {} } = props;
  return <TextComponent styles={styles}>{label}</TextComponent>;
};
