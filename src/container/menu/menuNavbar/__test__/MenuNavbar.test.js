import { getByText, render } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import VariableContext from "../../../../../context/VariableContext"
import MenuNavbar from "../MenuNavbar"
import "@testing-library/jest-dom"


describe("testing menu navbar",()=>{

    it("testing if cart available",()=>{
        const contextValue = { user: {cartLen: 3}};
        const { queryByText } = render(
            <BrowserRouter>
               <VariableContext.Provider value={contextValue}>
                   <MenuNavbar cart={"cart"} cartLen={3}/>
               </VariableContext.Provider>
            </BrowserRouter>
        )
        expect(queryByText(/Cart/i)).not.toBeInTheDocument();
    })

    it("testing if cart not available",()=>{
        const contextValue = { user: null };
        const { getByText } = render(
            <BrowserRouter>
               <VariableContext.Provider value={contextValue}>
                   <MenuNavbar cartLen={3}/>
               </VariableContext.Provider>
            </BrowserRouter>
        )
        expect(getByText(/Cart/i)).toBeInTheDocument();
        expect(getByText(/Food/i)).toBeInTheDocument();
        expect(getByText(/Help/i)).toBeInTheDocument();
    })

})
