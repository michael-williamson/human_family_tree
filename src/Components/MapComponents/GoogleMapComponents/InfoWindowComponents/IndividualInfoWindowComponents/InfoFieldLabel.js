import React from "react";
import { TextComponent } from "../../../../ReusableComponents/TextComponent";

export const InfoFieldLabel = (props) => {
  const { text, styles } = props;
  return <TextComponent text={`${text}:`} styles={styles} />;
};
