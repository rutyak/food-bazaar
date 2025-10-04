import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import React from "react";

interface FormInputType {
  label: string;
  id: string;
  idx?: number;
  value: string | number | undefined;
  handleChange: any;
}

function FormInput({ label, id, value, handleChange }: FormInputType) {
  switch (label) {
    case "Image":
      return (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <Input id={id} type="file" accept="image/*" onChange={handleChange} />
        </FormControl>
      );

    case "Description":
      return (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <Textarea id={id} value={value as string} onChange={handleChange} />
        </FormControl>
      );

    default:
      return (
        <FormControl isRequired>
          <FormLabel>{label}</FormLabel>
          <Input id={id} value={value} onChange={handleChange} />
        </FormControl>
      );
  }
}

export default FormInput;
