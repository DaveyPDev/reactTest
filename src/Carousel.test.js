import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel to ensure that the second image is displayed
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // move back to the first image using the left arrow
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides left arrow on first image and right arrow on last image", function() {
  const { queryByTestId } = render(<Carousel />);
  const leftArrow = queryByTestId("left-arrow");
  const rightArrow = queryByTestId("right-arrow");

  // Expect left arrow to be missing on the first image
  expect(leftArrow).not.toBeInTheDocument();

  // Move to the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Expect right arrow to be missing on the last image
  expect(rightArrow).not.toBeInTheDocument();
});
