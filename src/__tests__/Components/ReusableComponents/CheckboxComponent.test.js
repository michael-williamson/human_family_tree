import React from "react";
import ReactDOM from "react-dom";
import { CheckboxComponent } from "../../../Components/ReusableComponents/CheckboxComponent";

describe("CheckboxComponent", () => {
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => {
    ReactDOM.render(component, container);
  };

  it("renders properly", () => {
    props = {
      handleChange: () => (label) => () => label,
    };
    render(<CheckboxComponent {...props} key={"for testing"} />);
    expect(container).toBeDefined();
  });

  it("renders the sibling elements", () => {
    let siblingElements = [<div key="div1"></div>, <div key="div2"></div>];
    props = {
      handleChange: () => (label) => () => label,
      siblingElements: siblingElements,
    };
    render(<CheckboxComponent {...props} />);
    expect(container.querySelectorAll("div")).toHaveLength(3);
  });
});
