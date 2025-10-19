import FormInput from "@/components/formInput/FormInput";
import { DataType } from "@/types/admin";
import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React from "react";

interface MenuItemFormType {
  editMode?: boolean;
  data: DataType[];
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  loading?: boolean;
  onEditSumit?: () => Promise<void>;
  handleAddMore?: () => void;
  handleSubmit?: any;
}

interface ItemType {
  label: string;
  id: keyof DataType;
}

function MenuItemForm({
  editMode,
  data,
  setData,
  loading,
  onEditSumit,
  handleAddMore,
  handleSubmit
}: MenuItemFormType) {
  function handleRemoveMenuItem(index: number) {
    const filteredItems = data?.filter((_, i) => i !== index);
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
            borderWidth={editMode ? "" : "1px"}
            p={editMode ? 0 : 4}
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
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, idx)
                }
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

      {data?.length > 0 && !editMode && (
        <>
          <Stack spacing={4} mt={4}>
            <Button colorScheme="blue" onClick={handleAddMore}>
              Add More
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => handleSubmit("menuItem", data)}
            >
              {loading ? "Saving all menu items..." : "Save All Menu Items"}
            </Button>
          </Stack>
        </>
      )}

      {editMode && (
        <Button
          w={"100%"}
          colorScheme="blue"
          onClick={onEditSumit}
        >
          {loading ? "Saving menu item..." : "Save menu item"}
        </Button>
      )}
    </>
  );
}

export default MenuItemForm;
