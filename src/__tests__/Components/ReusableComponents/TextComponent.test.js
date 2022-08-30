import React from "react";
import ReactDOM from "react-dom";
import { TextComponent } from "../../../Components/ReusableComponents/TextComponent";

describe("TextComponent", () => {
  let container;
  let props;

  beforeEach(() => {
    container = document.createElement("div");
  });

  const render = (component) => {
    ReactDOM.render(component, container);
  };

  it("renders correct text", () => {
    let text = "Text Test";
    props = {
      text,
    };
    render(<TextComponent {...props} />);
    expect(container.textContent).toEqual(text);
  });
});
