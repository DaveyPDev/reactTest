import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

test('renders Card component without errors', () => {
  render(<Card title="Test Title" content="Test Content" />);
});

it("matches snapshot", function() {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });