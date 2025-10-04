import FormInput from "@/components/formInput/FormInput";
import { DataType } from "@/types/admin";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface MenuItemFormType {
  data: DataType[];
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
}

interface ItemType {
  label: string;
  id: keyof DataType;
}

function MenuItemForm({ data, setData }: MenuItemFormType) {
  function handleRemoveMenuItem(index: number) {
    const filteredItems = data.filter((_, i) => i !== index);
    setData(filteredItems);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) {
    const { id, value, files } = e.target as HTMLInputElement;
    setData((prev: DataType[]) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [id]: files && files.length > 0 ? files[0] : value }
          : item
      )
    );
  }

  const fields: ItemType[] = [
    { label: "Restaurant ID", id: "restaurantId" },
    { label: "Name", id: "name" },
    { label: "Description", id: "description" },
    { label: "Price", id: "price" },
    { label: "Image", id: "image" },
    { label: "Category", id: "category" },
    { label: "Rating", id: "rating" },
  ];

  return (
    <>
      {data?.map((menuItem: DataType, idx: number) => {
        return (
          <VStack
            mb={4}
            align="stretch"
            key={idx}
            borderWidth="1px"
            p={4}
            rounded="md"
          >
            {data?.length > 1 && (
              <Button
                colorScheme="red"
                size="sm"
                mb={2}
                w={"100px"}
                onClick={() => handleRemoveMenuItem(idx)}
              >
                Remove
              </Button>
            )}

            {fields?.map((item: ItemType) => (
              <FormInput
                key={item.id}
                label={item.label}
                id={item.id}
                value={menuItem[item.id] as any}
                handleChange={handleChange}
              />
            ))}

            <FormControl>
              <FormLabel>Is Vegetarian?</FormLabel>
              <Select
                id="isVeg"
                value={String(menuItem.isVeg)}
                onChange={(e) => handleChange(e, idx)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </FormControl>
          </VStack>
        );
      })}
    </>
  );
}

export default MenuItemForm;
