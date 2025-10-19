import { DataType } from "@/types/admin";
import {
  Button,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import FormInput from "@/components/formInput/FormInput";

interface RestaurantFormType {
  data: DataType;
  setData: React.Dispatch<React.SetStateAction<DataType>>;
  onEditSubmit: () => void;
  handleChangeFactory: (
    setData: React.Dispatch<React.SetStateAction<DataType>>
  ) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  loading: boolean;
}

interface ItemType {
  label: string;
  id: keyof DataType;
}

function RestaurantForm({
  data,
  setData,
  onEditSubmit,
  handleChangeFactory,
  loading,
}: RestaurantFormType) {
  const handleChange = handleChangeFactory(setData);

  const fields: ItemType[] = [
    { label: "Name", id: "name" },
    { label: "Description", id: "description" },
    { label: "Image", id: "image" },
    { label: "Location", id: "location" },
    { label: "Rating", id: "rating" },
    { label: "Categories (comma separated)", id: "categories" },
  ];

  return (
    <VStack spacing={4} align="stretch">
      {fields.map((item: ItemType) => (
        <FormInput
          key={item.id}
          label={item.label}
          id={item.id}
          value={data[item.id] as any}
          handleChange={handleChange}
        />
      ))}
      <Button colorScheme="blue" onClick={onEditSubmit}>
        {loading ? "Saving..." : "Save Restaurant"}
      </Button>
    </VStack>
  );
}

export default RestaurantForm;
