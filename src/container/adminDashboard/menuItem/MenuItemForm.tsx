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

function MenuItemForm({ data, setData }: any) {
  function handleRemoveMenuItem(index: number) {
    const filteredItems = data.filter((_: any, i: number) => i !== index);
    setData(filteredItems);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    index: number
  ) {
    const { id, value, files } = e.target as HTMLInputElement;
    setData((prev: any[]) =>
      prev.map((item, i) =>
        i === index
          ? { ...item, [id]: files && files.length > 0 ? files[0] : value }
          : item
      )
    );
  }

  return (
    <>
      {data?.map((menuItem: any, idx: any) => {
        return (
          <VStack
            mb={4}
            align="stretch"
            key={idx}
            borderWidth="1px"
            p={4}
            rounded="md"
          >
            {data.length > 1 && (
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
            <FormControl isRequired>
              <FormLabel>Restaurant ID</FormLabel>
              <Input
                id="restaurantId"
                value={menuItem.restaurantId || ""}
                onChange={(e) => handleChange(e, idx)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                value={menuItem.name || ""}
                onChange={(e) => handleChange(e, idx)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea
                id="description"
                value={menuItem.description || ""}
                onChange={(e) => handleChange(e, idx)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                id="price"
                value={menuItem.price || ""}
                onChange={(e) => handleChange(e, idx)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => handleChange(e, idx)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Input
                id="category"
                value={menuItem.category || ""}
                onChange={(e) => handleChange(e, idx)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Ratings</FormLabel>
              <Input
                id="rating"
                value={data.rating}
                onChange={(e) => handleChange(e, idx)}
              />
            </FormControl>

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
