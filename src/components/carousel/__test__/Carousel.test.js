import { getByTestId, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Carousel from "../Carousel";
import { ChakraProvider } from "@chakra-ui/core";
import { BrowserRouter } from "react-router-dom";
import Card from "../../card/Card";
import userEvent from "@testing-library/user-event";

const mockSuggestions = [
  { info: { id: 1, name: "Restaurant 1", description: "Description 1" } },
  { info: { id: 2, name: "Restaurant 2", description: "Description 2" } },
];

it("testing carousel component", () => {
  const { getByText } = render(
    <BrowserRouter>
      <ChakraProvider>
        <Carousel
          suggestions={mockSuggestions}
          title={"What's on your mind?"}
        />
      </ChakraProvider>
    </BrowserRouter>
  );

  expect(getByText("What's on your mind?")).toBeInTheDocument();
  expect(getByText("Restaurant 1")).toBeInTheDocument();
});

// it("scrolls left and right when buttons are clicked", () => {
//   const { getByTestId } = render(
//     <BrowserRouter>
//       <ChakraProvider>
//         <Carousel suggestions={mockSuggestions} title="Test Carousel" />

//       </ChakraProvider>
//     </BrowserRouter>
//   );

//   const rightButton = getByTestId('right-btn');
//   const leftButton = getByTestId('left-btn');
//   const carousel = getByTestId('carousel');

//   const carouselElement = carousel.firstChild;

//   // Mock scrollBy function
//   carouselElement.scrollBy = jest.fn();

//   // Click the right button
//   userEvent.click(rightButton);
//   expect(carouselElement.scrollBy).toHaveBeenCalledWith({ left: 900, behavior: 'smooth' });

//   // Click the left button
//   userEvent.click(leftButton);
//   expect(carouselElement.scrollBy).toHaveBeenCalledWith({ left: -900, behavior: 'smooth' });
// });
