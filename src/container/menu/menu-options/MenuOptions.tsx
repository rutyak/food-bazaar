import {
  AccordionIcon,
  AccordionItem,
  AccordionButton,
  Accordion,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import MenuCard from "../menu-card/MenuCard";
import "./MenuOptions.scss";
import CustomAccordion from "@/components/accordian/CustomAccordion";

const MenuOptions = ({ category, items }: any) => {
  console.log("item in menuOption: ", items);

  return (
    <>
      <Accordion allowMultiple bg="white" className="acco-items">
        <AccordionItem borderTopWidth="0px">
          <h2>
            <AccordionButton
              _expanded={{ bg: "tomato", color: "white" }}
              borderRadius="10px"
            >
              <Box as="span" flex="1" textAlign="left">
                {category} {items?.length > 0 ? `(${items?.length})` : ""}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            {items?.map((item: any) => (
              <MenuCard key={item?._id} {...item} />
            ))}
            {/* {item.categories?.length > 0 &&
                item?.categories?.map((cat: any, index: number) => {
                  return (
                    <CustomAccordion
                      key={`${cat?.id || "custom-accordion"}-${index}`}
                      {...cat}
                    />
                  );
                })} */}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default MenuOptions;
