import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomAccordion from "../CustomAccordion";
import { ChakraProvider } from "@chakra-ui/react";
import { categoryData } from "../../../__mocks__/Category";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import {store} from "../../../store";

it("testing custome accordian component", () => {
  const { getByText } = render(
    <Provider store={store}>
      <ChakraProvider>
        <CustomAccordion
          title={categoryData.title}
          itemCards={categoryData.itemCards}
        />
      </ChakraProvider>
    </Provider>
  );

  expect(getByText(/In Schezwan Sauce/)).toBeInTheDocument();
});
