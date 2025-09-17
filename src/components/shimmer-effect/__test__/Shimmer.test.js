import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Shimmer from "../Shimmer";

it("testing shimmer component",()=>{
    const style = {
        width: "200px"
    }
    const {getByTestId} = render(
        <Shimmer newLoad={"newLoad"} menuShimmerStyle={false}/>
    )

   expect(getByTestId(/shimmer-container/)).toBeInTheDocument();

})