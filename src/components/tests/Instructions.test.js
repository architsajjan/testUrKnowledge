import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import Instructions from '../Instructions';

it("runs without crash", () => {
  const div = document.createElement("div");
  render(<Instructions history={{}} match={{params:{fullName:"",email:"",contact:""}}}/>, div);
  unmountComponentAtNode(div);
});