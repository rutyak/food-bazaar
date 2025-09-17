import { render } from "@testing-library/react";
import CartItem from "../CartItem";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { ChakraProvider } from "@chakra-ui/react";

it("testing cartitem component",()=>{
    const item = {
        id: "122900140",
        imageId:"FOOD_CATALOG/IMAGES/CMS/2024/5/9/de4dd96e-f952-4cda-b6e9-2c7e76117fb8_b8cf7f4f-8938-43bc-9afd-e264e436ebbf.jpg",
        name:"Aloo Dum - Light Meal",
        price: 17900,
        quantity: 1
    }

    const {getByText} = render(
          <Provider store={store}>
              <ChakraProvider>
                  <CartItem item={item} />
              </ChakraProvider>
          </Provider>
    )

    expect(getByText(/Aloo Dum - Light Meal/i)).toBeInTheDocument();
    expect(getByText(/Quantity/i)).toBeInTheDocument();
})