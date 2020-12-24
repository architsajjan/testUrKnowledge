import React from "react";
import renderer from "react-test-renderer";

import { Verify } from '../Test';

test("returns true if array and string have same values", () => {
  //arrange
  let arr =["1","2"];
  let str ="1,2";

  //act
  const res = Verify(arr,str);

  //assert
  expect(res).toBeTruthy();
});


test("returns false if array and string dont have same values", () => {
    //arrange
    let arr =["1","2"];
    let str ="1";
  
    //act
    const res = Verify(arr,str);
  
    //assert
    expect(!res).toBeTruthy();
  });