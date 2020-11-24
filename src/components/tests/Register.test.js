import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Register from '../Register';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<BrowserRouter><Register history={{}} /></BrowserRouter>, div);
  unmountComponentAtNode(div);
});