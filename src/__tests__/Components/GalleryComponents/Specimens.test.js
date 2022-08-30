import React from "react";
import ReactDOM from "react-dom";
import { SpecimensView } from "../../../Components/GalleryComponents/SpecimensView";
import anthroData from "../../../Data/anthroData.json";
import { filteredOutArray } from "../../../HelperFunctions/TestingHelperFunctions";

describe("SpecimensView Component", () => {
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => {
    ReactDOM.render(component, container);
  };

  it("renders a list of IndividualSpecimen Components at correct length", () => {
    let species = "habilis";
    let expectedLength = filteredOutArray(anthroData, species, species).length;
    props = {
      species,
    };
    render(<SpecimensView {...props} />);
    expect(document.querySelectorAll(".individualSpecimen")).toHaveLength(
      expectedLength
    );
  });
});
