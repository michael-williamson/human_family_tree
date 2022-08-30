import React from "react";
import ReactDOM from "react-dom";
import { CheckBoxList } from "../../../../Components/MapComponents/CheckBoxComponents/CheckBoxList";

describe("CheckBoxList Component", () => {
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => {
    ReactDOM.render(component, container);
  };

  it("renders a list of CheckBoxComponents", () => {
    let arr = ["item1", "item2", "item3"];
    let state = {
      item1: true,
      item2: true,
      item3: true,
    };
    props = {
      arr,
      state,
      checkboxComponentProps: {
        handleChange: () => (label) => () => label,
      },
    };
    render(<CheckBoxList {...props} />);
    expect(container.querySelector("input").type).toEqual("checkbox");
  });

  it("renders a list of checked CheckBoxComponents", () => {
    let arr = ["item1", "item2", "item3"];
    let state = {
      item1: true,
      item2: true,
      item3: true,
    };
    props = {
      arr,
      state,
      checkboxComponentProps: {
        handleChange: () => (label) => () => label,
      },
    };
    render(<CheckBoxList {...props} />);
    expect(container.querySelector("input").checked).toEqual(true);
  });
});
