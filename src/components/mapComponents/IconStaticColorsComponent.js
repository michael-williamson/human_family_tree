import { imageFiles } from "../../data/listArrays";

export const IconStaticColorsComponent = (props) => {
  const imageFilesObj = imageFiles;
  const style = {
    imgDiv: {},
    img: {
      width: 20,
      height: 20,
    },
    imgWhite: {
      width: 20,
      height: 20,
      borderRadius: "50%",
      background: "#0000006b",
    },
  };
  return (
    <div style={style.imgDiv} className="imgDiv">
      <img
        alt="human species"
        style={props.props === "heidelbergensis" ? style.imgWhite : style.img}
        src={imageFilesObj[props.props]}
      />
    </div>
  );
};
