import {
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

interface FormInputType {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  idx?: number;
  value?: string | number | undefined;
  handleChange: any;
}

function FormInput({
  id,
  label,
  value,
  type,
  placeholder,
  handleChange,
}: FormInputType) {
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
          <Textarea id={id} value={value} onChange={handleChange} />
        </FormControl>
      );

    case "Password":
    case "Email":
    case "Confirm Password":
      return (
        <FormControl isRequired>
          <FormLabel>{label}</FormLabel>
          <Input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            bg="gray.800"
            borderColor="gray.600"
            _hover={{ borderColor: "gray.500" }}
            _focus={{
              borderColor: "orange.500",
              boxShadow: "0 0 0 1px orange.500",
            }}
          />
        </FormControl>
      );

    case "Role":
      return (
        <FormControl isRequired>
          <FormLabel htmlFor="role">Role</FormLabel>
          <Select
            id="role"
            w="100%"
            value={value}
            onChange={handleChange}
            color="black"
            bg="white"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </Select>
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
