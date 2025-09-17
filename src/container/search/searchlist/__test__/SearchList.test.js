import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchList from "../SearchList";
import { CardData } from "../../../__mocks__/CardData";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

it("testing searchlist component", () => {
  const { getByText } = render(
    <BrowserRouter>
      <ChakraProvider>
        <SearchList resultList={[CardData]} />
      </ChakraProvider>
    </BrowserRouter>
  );

  expect(getByText(/Chinese Wok/)).toBeInTheDocument();
});

it("testing searchlist component", () => {
  const { getByText } = render(
    <BrowserRouter>
      <ChakraProvider>
        <SearchList resultList={[]} />
      </ChakraProvider>
    </BrowserRouter>
  );

  expect(getByText(/Not found/)).toBeInTheDocument();
});