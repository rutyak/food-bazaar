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
import { ItemsType } from "@/types/menu";

interface MenuOptionType {
  category: string;
  items: ItemsType[];
}
const MenuOptions = ({ category, items }: MenuOptionType) => {
  function onEdit() {
    console.log("menu onEdit clicked");
  }

  function onDelete() {
    console.log("menu onDelete clicked");
  }

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
            {items?.map((item: ItemsType) => (
              <MenuCard
                key={item?._id}
                {...item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default MenuOptions;
