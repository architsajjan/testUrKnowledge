import React from "react";
import renderer from "react-test-renderer";

import Submit from '../Submit';

it("renders correctly", () => {
  const tree = renderer.create(<Submit />).toJSON();
  expect(tree).toMatchSnapshot();
});