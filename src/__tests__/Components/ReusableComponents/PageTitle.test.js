import React from "react";
import ReactDOM from "react-dom";
import { PageTitle } from "../../../Components/ReusableComponents/PageTitle";
import { cavemanIcon } from "../../../Media/PageTitle_Navigation_Icons";

describe("PageTitleComponent", () => {
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => {
    ReactDOM.render(component, container);
  };

  it("renders text", () => {
    let text = "Testing Component";
    props = {
      text,
    };
    render(<PageTitle {...props} />);
    expect(container.textContent).toEqual(text);
  });

  it("renders img element with media file and alt text", () => {
    let imageSrc = cavemanIcon;
    let imageAltText = "caveman icon";
    props = {
      imageSrc,
      imageAltText,
    };
    render(<PageTitle {...props} />);
    expect(container.querySelector("img").src).toContain(imageSrc);
    expect(container.querySelector("img").alt).toContain(imageAltText);
  });
});
