import { store } from "../../../store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import MenuNavbar from "../../../components/navbar/menuNavbar/MenuNavbar";
import VariableContext from "../../../../context/VariableContext";

it("testing cart component", () => {
  const contextValue = { user: { cartLen: 3 } };
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider>
          <VariableContext.Provider value={contextValue}>
            <Cart />
            <MenuNavbar cart={"cart"} cartLen={3} />
          </VariableContext.Provider>
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  );

  expect(getByText(/Your Cart/i)).toBeInTheDocument();
});
