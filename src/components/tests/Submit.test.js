import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Submit from '../Submit';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<Submit />, div);
  unmountComponentAtNode(div);
});