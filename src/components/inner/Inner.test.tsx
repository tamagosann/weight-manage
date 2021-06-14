import React from "react";
import { render } from "@testing-library/react";
import Inner from './Inner'

test("Header test", () => {
  const component = render(<Inner />);
});
