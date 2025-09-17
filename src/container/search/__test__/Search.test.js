import { getByTestId, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "../Search";
import { ChakraProvider } from "@chakra-ui/react";
import { CardData } from "../../../__mocks__/CardData";
import VariableContext from "../../../../context/VariableContext";
import userEvent from "@testing-library/user-event";
import useFilter from "../../../utils/useFilter";



describe("testing search component", () => {
    
  it("testing search component", async () => {
    const contextValue = { setLocation: jest.fn() };
    const setFilteredCard = jest.fn();
    const setSearch = jest.fn();

    const { getByPlaceholderText } = render(
      <VariableContext.Provider value={contextValue}>
        <ChakraProvider>
          <Search
            setFilteredCard={setFilteredCard}
            setSearch={setSearch}
            search={""}
            allCard={[CardData]}
          />
        </ChakraProvider>
      </VariableContext.Provider>
    );

    const input = getByPlaceholderText(/Search your food.../);
    userEvent.type(input, "P");

    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith("P");
    });
  });

  it("testing detect location", () => {
    const contextValue = { setLocation: jest.fn() };
    const { getByTestId, getByText } = render(
      <VariableContext.Provider value={contextValue}>
        <ChakraProvider>
          <Search
            setFilteredCard={jest.fn()}
            setSearch={jest.fn()}
            search={""}
            allCard={[CardData]}
          />
        </ChakraProvider>
      </VariableContext.Provider>
    );

    const accordian = getByTestId(/accordian/);

    userEvent.click(accordian);

    expect(getByText(/Detect your location/)).toBeInTheDocument();
  });
});
