import * as React from 'react';
import {mount} from "enzyme";
import {App} from "./mineSweeper";

it('should compile', () => {
  expect(mount(<App />).text()).toEqual('hello world');
});