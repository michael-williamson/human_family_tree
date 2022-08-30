import { fireEvent } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import { MenuContainer } from "../../../Components/ReusableComponents/MenuContainer";

describe("MenuContainer", () => {
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => {
    ReactDOM.render(component, container);
  };

  it("renders properly", () => {
    const sourceArr = ["item1", "item2", "item3"];
    props = {
      clickHandler: (item) => () => item,
      sourceArr: sourceArr,
    };
    render(<MenuContainer {...props} key={"for testing"} />);
    expect(container).toBeDefined();
  });

  it("renders buttons from sourceArr prop", () => {
    const sourceArr = ["item1", "item2", "item3"];
    props = {
      clickHandler: (item) => () => item,
      sourceArr: sourceArr,
    };
    render(<MenuContainer {...props} />);
    const menuButtonContainer = container.querySelector("#menuButtonContainer");

    expect(menuButtonContainer.children).toHaveLength(3);
  });

  it("returns the item value passed to the clickHandler", () => {
    const sourceArr = ["item1", "item2", "item3"];
    props = {
      clickHandler: (item) => (e) =>
        (e.target.textContent = `${item} has been clicked`),
      sourceArr: sourceArr,
    };
    render(<MenuContainer {...props} />);
    const firstButtonChild = container.querySelector("#menuButtonContainer")
      .childNodes[0];
    fireEvent.click(firstButtonChild);
    expect(firstButtonChild.textContent).toMatch("item1 has been clicked");
  });
});
