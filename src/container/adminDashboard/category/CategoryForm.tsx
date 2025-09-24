import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

function CategoryForm({
  data,
  setData,
  onSubmit,
  handleChangeFactory,
  loading,
}: any) {
  const handleChange = handleChangeFactory(setData);
  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input id="name" value={data.name} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Image</FormLabel>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          id="description"
          value={data.description}
          onChange={handleChange}
        />
      </FormControl>
      <Button colorScheme="blue" onClick={onSubmit}>
        {loading ? "Saving..." : "Save Category"}
      </Button>
    </VStack>
  );
}

export default CategoryForm;
