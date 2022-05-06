import React from "react";
import { TextComponent } from "../../ReusableComponents/TextComponent";

export const SpecimenInfoText = (props) => {
  const { text = "info", styles = {} } = props;
  return <TextComponent text={text} styles={styles} />;
};
